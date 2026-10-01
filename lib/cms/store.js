import 'server-only';
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { DEFAULT_CONTENT } from './defaults';
import { deepMerge, getAt, setAt, isText, isImage, isPlainObject } from './tree';

const CONTENT_KEY = 'site';
export const CMS_TAG = 'cms';

const hasDb = () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

async function readStoredContent() {
  if (!hasDb()) return null;
  const { data, error } = await supabaseAdmin.from('cms_content').select('data').eq('key', CONTENT_KEY).maybeSingle();
  if (error) {
    console.error('cms_content read failed:', error.message);
    return null;
  }
  return data?.data ?? null;
}

/** Merged content tree for rendering (cached; invalidated on every CMS write). */
export const getSiteContent = unstable_cache(
  async () => deepMerge(DEFAULT_CONTENT, (await readStoredContent()) || {}),
  ['cms-site-content-v1'],
  { tags: [CMS_TAG], revalidate: 3600 }
);

/** Uncached merged tree (for the CMS itself, which must always see the latest). */
export async function getSiteContentFresh() {
  return deepMerge(DEFAULT_CONTENT, (await readStoredContent()) || {});
}

/** Lightweight service list used by header/footer menus (cached). */
export const getServiceMenu = unstable_cache(
  async () => {
    if (!hasDb()) return [];
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('slug, category, name_en, name_ar, sort_order')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (error) {
      console.error('services menu read failed:', error.message);
      return [];
    }
    return data || [];
  },
  ['cms-service-menu-v1'],
  { tags: [CMS_TAG], revalidate: 3600 }
);

export function revalidateSite() {
  revalidateTag(CMS_TAG);
  revalidatePath('/', 'layout');
}

async function recordRevision(rev) {
  const { data, error } = await supabaseAdmin
    .from('cms_revisions')
    .insert({
      target_type: rev.targetType,
      target_id: rev.targetId,
      path: rev.path ?? null,
      before: rev.before ?? null,
      after: rev.after ?? null,
      summary: rev.summary?.slice(0, 500) || null,
      source: rev.source || 'editor',
      conversation_id: rev.conversationId || null,
      actor: rev.actor || null,
    })
    .select('id')
    .single();
  if (error) throw new Error(`Could not record history: ${error.message}`);
  return data.id;
}

async function saveTree(tree) {
  const { error } = await supabaseAdmin
    .from('cms_content')
    .upsert({ key: CONTENT_KEY, data: tree, updated_at: new Date().toISOString() });
  if (error) throw new Error(`Could not save content: ${error.message}`);
}

const URLISH = /(url|href|link|linkedin|instagram)$/i;

/** Ensures a new value has the same shape as the old one (text stays text, lists stay lists...). */
function assertCompatible(before, value, path) {
  const last = path.split('.').pop();
  if (isText(before)) {
    if (!isText(value) || typeof value.en !== 'string' || typeof value.ar !== 'string') throw new Error(`"${path}" needs English and Arabic text`);
    if (value.en.length > 10000 || value.ar.length > 10000) throw new Error(`"${path}" is too long`);
    return;
  }
  if (isImage(before)) {
    if (!isImage(value) || !isText(value.alt)) throw new Error(`"${path}" must be an image`);
    if (!/^(https:\/\/|\/assets\/)/.test(value.url)) throw new Error('Image address must be https or a site asset');
    return;
  }
  if (Array.isArray(before)) {
    if (!Array.isArray(value)) throw new Error(`"${path}" must be a list`);
    if (value.length > 60) throw new Error('Too many items');
    const template = before[0];
    if (template !== undefined) value.forEach((item, i) => assertCompatible(template, item, `${path}.${i}`));
    return;
  }
  if (isPlainObject(before)) {
    if (!isPlainObject(value)) throw new Error(`"${path}" must keep its structure`);
    for (const k of Object.keys(before)) if (k in value) assertCompatible(before[k], value[k], `${path}.${k}`);
    return;
  }
  if (typeof before === 'string') {
    if (typeof value !== 'string' || value.length > 2000) throw new Error(`"${path}" must be a short piece of text`);
    if (value && URLISH.test(last) && !/^https:\/\//.test(value)) throw new Error(`"${path}" must be a web address starting with https://`);
  }
}

/**
 * Apply a set of path updates to the content tree in one save.
 * changes: [{ path, value }]  (value replaces whatever is at path)
 * Returns the revision ids.
 */
export async function updateContentPaths(changes, meta = {}) {
  let tree = await getSiteContentFresh();
  const revs = [];
  for (const { path, value } of changes) {
    const before = getAt(tree, path);
    if (before === undefined) throw new Error(`"${path}" does not exist on the website`);
    assertCompatible(before, value, path);
    tree = setAt(tree, path, value);
    revs.push({ path, before, after: value });
  }
  await saveTree(tree);
  const ids = [];
  for (const r of revs) {
    ids.push(await recordRevision({ ...meta, targetType: 'content', targetId: CONTENT_KEY, ...r, summary: meta.summary || `Updated ${r.path}` }));
  }
  revalidateSite();
  return ids;
}

/** Service rows (table `services`). */
const SERVICE_FIELDS = [
  'name_en', 'name_ar', 'description_en', 'description_ar', 'long_description_en', 'long_description_ar',
  'features', 'flow_steps', 'documents', 'faqs', 'meta_title_en', 'meta_title_ar', 'meta_description_en',
  'meta_description_ar', 'image_url', 'image_alt_en', 'image_alt_ar', 'sort_order', 'is_active', 'category',
];
export const SERVICE_EDITABLE_FIELDS = SERVICE_FIELDS;

export async function getService(slug) {
  const { data, error } = await supabaseAdmin.from('services').select('*').eq('slug', slug).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function listServicesAdmin() {
  const { data, error } = await supabaseAdmin.from('services').select('*').order('sort_order');
  if (error) throw new Error(error.message);
  return data || [];
}

export async function updateService(slug, fields, meta = {}) {
  const current = await getService(slug);
  if (!current) throw new Error(`No service with slug "${slug}"`);
  const patch = {};
  for (const [k, v] of Object.entries(fields || {})) {
    if (!SERVICE_FIELDS.includes(k)) throw new Error(`Field "${k}" cannot be edited on services`);
    patch[k] = v;
  }
  if (patch.category && !['tax', 'accounting', 'corporate'].includes(patch.category)) throw new Error('category must be tax, accounting or corporate');
  if (patch.image_url && !/^https:\/\//.test(patch.image_url)) throw new Error('image_url must start with https://');
  if (!Object.keys(patch).length) throw new Error('Nothing to update');
  const before = Object.fromEntries(Object.keys(patch).map((k) => [k, current[k]]));
  const { error } = await supabaseAdmin.from('services').update({ ...patch, updated_at: new Date().toISOString() }).eq('slug', slug);
  if (error) throw new Error(error.message);
  const id = await recordRevision({ ...meta, targetType: 'service', targetId: slug, before, after: patch, summary: meta.summary || `Updated service ${slug}` });
  revalidateSite();
  return id;
}

export async function createService(row, meta = {}) {
  const slug = String(row.slug || '').toLowerCase();
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error('slug must be lowercase words joined by hyphens');
  if (!['tax', 'accounting', 'corporate'].includes(row.category)) throw new Error('category must be tax, accounting or corporate');
  for (const f of ['name_en', 'name_ar', 'description_en', 'description_ar']) if (!row[f]) throw new Error(`${f} is required`);
  const insert = { slug, category: row.category };
  for (const f of SERVICE_FIELDS) if (row[f] !== undefined) insert[f] = row[f];
  const { error } = await supabaseAdmin.from('services').insert(insert);
  if (error) throw new Error(error.message);
  const id = await recordRevision({ ...meta, targetType: 'service', targetId: slug, before: null, after: insert, summary: meta.summary || `Created service ${slug}` });
  revalidateSite();
  return id;
}

/** Blog posts (table `blog_posts`). */
const BLOG_FIELDS = [
  'slug', 'title_en', 'title_ar', 'excerpt_en', 'excerpt_ar', 'content_en', 'content_ar', 'category', 'tags',
  'featured_image', 'meta_title_en', 'meta_description_en', 'is_published', 'published_at',
];
export const BLOG_EDITABLE_FIELDS = BLOG_FIELDS;

export async function listBlogPostsAdmin() {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('id, slug, title_en, title_ar, is_published, published_at, featured_image, category, updated_at')
    .eq('is_auto_fetched', false)
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getBlogPost(id) {
  const { data, error } = await supabaseAdmin.from('blog_posts').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function saveBlogPost(id, fields, meta = {}) {
  const patch = {};
  for (const [k, v] of Object.entries(fields || {})) {
    if (!BLOG_FIELDS.includes(k)) throw new Error(`Field "${k}" cannot be edited on blog posts`);
    patch[k] = v;
  }
  if (patch.slug !== undefined) {
    patch.slug = String(patch.slug).toLowerCase();
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(patch.slug)) throw new Error('slug must be lowercase words joined by hyphens');
  }
  if (patch.featured_image && !/^https:\/\//.test(patch.featured_image)) throw new Error('featured_image must start with https://');
  if (patch.is_published === true && !patch.published_at) patch.published_at = new Date().toISOString();

  if (!id) {
    for (const f of ['slug', 'title_en', 'title_ar']) if (!patch[f]) throw new Error(`${f} is required for a new post`);
    const { data, error } = await supabaseAdmin.from('blog_posts').insert({ is_published: false, ...patch }).select('id').single();
    if (error) throw new Error(error.message);
    const revId = await recordRevision({ ...meta, targetType: 'blog', targetId: data.id, before: null, after: patch, summary: meta.summary || `Created blog post "${patch.title_en}"` });
    revalidateSite();
    return { id: data.id, revisionId: revId };
  }

  const current = await getBlogPost(id);
  if (!current) throw new Error('Blog post not found');
  if (current.is_published && patch.is_published === true) delete patch.published_at;
  const before = Object.fromEntries(Object.keys(patch).map((k) => [k, current[k]]));
  const { error } = await supabaseAdmin.from('blog_posts').update({ ...patch, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) throw new Error(error.message);
  const revId = await recordRevision({ ...meta, targetType: 'blog', targetId: id, before, after: patch, summary: meta.summary || `Updated blog post "${current.title_en}"` });
  revalidateSite();
  return { id, revisionId: revId };
}

/** History */
export async function listRevisions(limit = 50) {
  const { data, error } = await supabaseAdmin
    .from('cms_revisions')
    .select('id, target_type, target_id, path, summary, source, actor, created_at, reverted_at')
    .order('id', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function undoRevision(revisionId, meta = {}) {
  const { data: rev, error } = await supabaseAdmin.from('cms_revisions').select('*').eq('id', revisionId).maybeSingle();
  if (error) throw new Error(error.message);
  if (!rev) throw new Error(`Change #${revisionId} not found`);
  if (rev.reverted_at) throw new Error(`Change #${revisionId} was already undone`);

  const undoMeta = { ...meta, source: 'undo', summary: `Undid change #${rev.id}: ${rev.summary || ''}`.slice(0, 500) };
  if (rev.target_type === 'content') {
    await updateContentPaths([{ path: rev.path, value: rev.before }], undoMeta);
  } else if (rev.target_type === 'service') {
    if (rev.before === null) await updateService(rev.target_id, { is_active: false }, undoMeta);
    else await updateService(rev.target_id, rev.before, undoMeta);
  } else if (rev.target_type === 'blog') {
    if (rev.before === null) {
      const { error: delErr } = await supabaseAdmin.from('blog_posts').delete().eq('id', rev.target_id);
      if (delErr) throw new Error(delErr.message);
      await recordRevision({ ...undoMeta, targetType: 'blog', targetId: rev.target_id, before: rev.after, after: null });
      revalidateSite();
    } else {
      await saveBlogPost(rev.target_id, rev.before, undoMeta);
    }
  } else {
    throw new Error('This kind of change cannot be undone automatically');
  }
  await supabaseAdmin.from('cms_revisions').update({ reverted_at: new Date().toISOString() }).eq('id', rev.id);
  return rev;
}
