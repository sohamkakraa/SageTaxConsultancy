import 'server-only';
import { toFile } from 'openai';
import { openai, TEXT_MODEL, IMAGE_MODEL, IMAGE_QUALITY } from './openai';
import { DEFAULT_CONTENT, SECTION_GUIDE, recommendedImageSize } from './defaults';
import { getAt, isImage, isPlainObject, isText, listImageSlots, outlineForPrompt } from './tree';
import {
  getSiteContentFresh, updateContentPaths, getService, listServicesAdmin, updateService, createService,
  listBlogPostsAdmin, getBlogPost, saveBlogPost, listRevisions, undoRevision,
  SERVICE_EDITABLE_FIELDS, BLOG_EDITABLE_FIELDS,
} from './store';
import { getMedia, listMedia, saveMedia, downloadMedia, toPng, updateMediaInfo } from './media';
import { addMemory, removeMemory, loadMemoryContext, messageAsText } from './memory';

const MAX_STEPS = 14;

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------
const str = (description) => ({ type: 'string', description });
const nstr = (description) => ({ type: ['string', 'null'], description });
const fn = (name, description, properties) => ({
  type: 'function',
  name,
  description,
  strict: true,
  parameters: { type: 'object', properties, required: Object.keys(properties), additionalProperties: false },
});

const TOOLS = [
  fn('get_content', 'Read the full current value (English AND Arabic) at a content path, e.g. "home.hero" or "home.faq.items.2". Use before rewriting text so you keep the Arabic accurate.', {
    path: str('Dotted content path from the SITE CONTENT outline.'),
  }),
  fn('update_content', 'Change one or more text fields or plain values on the website. Bilingual fields need both "en" and "ar" whenever the meaning changes. Plain values (phone, email, URLs, counter numbers) use "value".', {
    changes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          path: str('Path of a text field or plain value, e.g. "home.hero.title" or "site.contact.phone".'),
          en: nstr('New English text, or null to keep the current English.'),
          ar: nstr('New Arabic text (Modern Standard Arabic), or null to keep the current Arabic.'),
          value: nstr('New plain value for language-neutral fields; null for bilingual fields.'),
        },
        required: ['path', 'en', 'ar', 'value'],
        additionalProperties: false,
      },
    },
    summary: str('Short plain-English description of the change for the history log, e.g. "Changed home headline".'),
  }),
  fn('edit_list', 'Add, remove or reorder an item in a list (FAQ items, testimonials, team members, counters, values, features, cards...).', {
    path: str('Path of the list itself, e.g. "home.faq.items".'),
    action: { type: 'string', enum: ['add', 'remove', 'move'] },
    index: { type: ['integer', 'null'], description: 'add: position to insert at (null = end). remove/move: index of the item.' },
    to_index: { type: ['integer', 'null'], description: 'move only: new position. Otherwise null.' },
    item_json: nstr('add only: the new item as a JSON object with the same fields as the existing items (bilingual fields as {"en","ar"}). Image fields can be omitted and set afterwards with set_image.'),
    summary: str('Short description for the history log.'),
  }),
  fn('set_image', 'Place an image from the media library on the website.', {
    target: str('Where to put it: an image path from IMAGE SLOTS (e.g. "home.hero.image"), "service:<slug>" for a service page banner, or "blog:<post id>" for a blog post picture.'),
    media_id: str('media_id of an uploaded or generated image.'),
    alt_en: str('Short English description of the image for accessibility/SEO.'),
    alt_ar: str('Arabic translation of alt_en.'),
    summary: str('Short description for the history log.'),
  }),
  fn('generate_image', 'Create a brand-new image with AI. It is saved to the media library; it does NOT appear on the site until you call set_image.', {
    prompt: str('Detailed visual description. Follow the IMAGE STYLE rules.'),
    size: { type: 'string', enum: ['1536x1024', '1024x1024', '1024x1536'], description: 'Use the recommended size of the target slot (landscape 1536x1024 for banners/cards, square for portraits).' },
    purpose: str('What it is for, e.g. "home hero background".'),
  }),
  fn('edit_image', 'Edit or combine existing images (uploaded by the user or previously generated) with AI, e.g. remove background, change colours, put a person in an office setting, extend to landscape. Produces a NEW image in the library.', {
    media_ids: { type: 'array', items: { type: 'string' }, description: 'One or more source media_ids (first one is the main image).' },
    prompt: str('Exactly what to change. Say what must stay the same (e.g. "keep the person\'s face and expression identical").'),
    size: { type: 'string', enum: ['1536x1024', '1024x1024', '1024x1536', 'auto'] },
  }),
  fn('describe_image', 'Save a description and alt text for an image in the media library (do this for user uploads so you can find them later).', {
    media_id: str('media_id'),
    description: str('What the image shows, in one sentence.'),
    alt_en: str('English alt text.'),
    alt_ar: str('Arabic alt text.'),
  }),
  fn('get_service', 'Read every field of one service page (from the services list).', { slug: str('Service slug') }),
  fn('update_service', `Change fields of a service page. Allowed fields: ${SERVICE_EDITABLE_FIELDS.join(', ')}. features = [{title_en,title_ar,description_en,description_ar}], flow_steps = [{step,title_en,title_ar,description_en,description_ar}], documents = [{name_en,name_ar}], faqs = [{question_en,question_ar,answer_en,answer_ar}]. Set is_active=false to hide a service (ask first).`, {
    slug: str('Service slug'),
    fields_json: str('JSON object of fields to change. Lists replace the whole list, so read the service first and send the complete list.'),
    summary: str('Short description for the history log.'),
  }),
  fn('create_service', 'Create a new service page (ask the user to confirm the name and category first).', {
    fields_json: str('JSON object with slug (lowercase-hyphenated), category ("tax" | "accounting" | "corporate"), name_en, name_ar, description_en, description_ar, and optionally long_description_en/ar, features, flow_steps, documents, faqs, sort_order.'),
    summary: str('Short description for the history log.'),
  }),
  fn('list_blog_posts', 'List the blog/insight posts written by the firm (not the automatic news feed).', {}),
  fn('get_blog_post', 'Read one blog post in full.', { id: str('Post id') }),
  fn('save_blog_post', `Create (id = null) or update a blog post. Fields: ${BLOG_EDITABLE_FIELDS.join(', ')}. content_en/content_ar are plain text with blank lines between paragraphs. New posts start unpublished unless is_published is true — ask the user before publishing.`, {
    id: nstr('Existing post id, or null to create a new post.'),
    fields_json: str('JSON object of fields.'),
    summary: str('Short description for the history log.'),
  }),
  fn('undo_change', 'Undo a previous change by its change number (see RECENT CHANGES).', { revision_id: { type: 'integer' } }),
  fn('remember', 'Save a lasting preference or fact the owner wants you to always keep in mind (e.g. "Prefers a formal tone", "Never show prices"). Not for one-off edits.', { fact: str('The fact, one sentence.') }),
  fn('forget', 'Delete a saved memory fact by id.', { memory_id: { type: 'integer' } }),
];

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------
function pageForPath(target) {
  if (target.startsWith('service:')) return `/services/${target.slice(8)}`;
  if (target.startsWith('blog:')) return '/blog';
  if (target.startsWith('home.') || target.startsWith('site')) return '/';
  if (target.startsWith('team') || target.startsWith('aboutPage')) return '/about';
  if (target.startsWith('servicesPage')) return '/services';
  if (target.startsWith('contactPage')) return '/contact';
  if (target.startsWith('blogPage')) return '/blog';
  return '/';
}

async function buildInstructions(conversation) {
  const [content, services, posts, media, revisions, mem] = await Promise.all([
    getSiteContentFresh(),
    listServicesAdmin(),
    listBlogPostsAdmin().catch(() => []),
    listMedia(25),
    listRevisions(15),
    loadMemoryContext(conversation),
  ]);

  const slots = listImageSlots(content)
    .map((s) => `${s.path} (recommended ${recommendedImageSize(s.path)})${s.alt ? ` — currently: ${s.alt}` : ''}`)
    .join('\n');

  const serviceLines = services
    .map((s) => `${s.slug} [${s.category}${s.is_active ? '' : ', HIDDEN'}] ${s.name_en} — ${String(s.description_en || '').slice(0, 110)}${s.image_url ? ' (has custom banner image)' : ''}`)
    .join('\n');

  const postLines = posts.length
    ? posts.map((p) => `${p.id} | ${p.slug} | ${p.title_en} | ${p.is_published ? 'published' : 'draft'}`).join('\n')
    : '(none yet)';

  const mediaLines = media.length
    ? media.map((m) => `${m.id} | ${m.source} | ${m.width}x${m.height} | ${(m.description || m.alt_en || m.original_name || m.prompt || '').slice(0, 120)} | ${new Date(m.created_at).toISOString().slice(0, 10)}`).join('\n')
    : '(empty)';

  const revLines = revisions.length
    ? revisions.map((r) => `#${r.id} ${new Date(r.created_at).toISOString().slice(0, 16).replace('T', ' ')} ${r.summary || r.path}${r.reverted_at ? ' (UNDONE)' : ''}`).join('\n')
    : '(no changes yet)';

  const factLines = mem.facts.length ? mem.facts.map((f) => `[${f.id}] ${f.fact}`).join('\n') : '(none)';
  const prevLines = mem.previous.length
    ? mem.previous.map((c) => `- ${new Date(c.updated_at).toISOString().slice(0, 10)} "${c.title}": ${c.summary}`).join('\n')
    : '(this is the first conversation)';

  const guide = SECTION_GUIDE.map((g) => `- ${g.path}: ${g.label}. ${g.where}`).join('\n');

  return `You are the website assistant for Sage Global Advisory (sageglobaladvisory.com). You edit the company website on behalf of the owner by talking with him. He is NOT technical: never mention JSON, paths, code, databases or "fields" unless he asks. Talk like a helpful, efficient colleague.

TODAY: ${new Date().toISOString().slice(0, 10)}

ABOUT THE BUSINESS
Sage Global Advisory is a Dubai-based tax and business advisory firm (formerly "Sage Advisory"/"Sage Tax Consultancy"). It helps UAE companies, SMEs, start-ups and investors with: VAT registration/filing/audits, UAE Corporate Tax (9% above AED 375,000; Free Zone 0% on qualifying income), Excise Tax, accounting & bookkeeping (IFRS), internal/external/statutory/VAT/corporate-tax/forensic audits, company registration and business setup, trademark registration, business bank accounts, PRO/government services, Golden Visa, and company restructuring. Leadership: Jay Kakra (Managing Partner) and Aashna Malkhani (Partner). The website is bilingual: English and Arabic (right-to-left). Brand: sage green (#586a39 / #8A9A5B), deep navy, warm gold (#ddb44e); calm, premium, trustworthy.

HOW TO WORK
1. Understand what he wants. If the request is clear, just do it — don't ask for permission for normal edits. Ask ONE short question only when it is genuinely ambiguous (e.g. which of several places he means) or before something drastic: deleting items, hiding/creating a service, publishing a blog post, or replacing many things at once.
2. Every text change must be made in BOTH English and Arabic. Write natural, professional Modern Standard Arabic (not a word-for-word translation). If he writes in Arabic, still update both languages. Use get_content first when you need the current Arabic.
3. Never invent facts: client names, testimonials, numbers, credentials, licences, awards, prices, legal claims. If he asks for content that needs facts you don't have, ask him or write it without the unverifiable claim. For tax information, only state well-established UAE rules and keep it general; flag anything you are unsure about.
4. The Privacy Policy, Terms and Cookie Policy wording is legal text managed by the developer — you can't change it. You CAN update the company legal details used inside them (site.legal.*: company name, trade licence number, licensing authority, registered address, privacy email).
5. Keep his preferences in mind (MEMORY below). When he states a lasting preference, save it with remember.
6. After making changes, reply in 1-4 short sentences: what you changed and where he can see it (the preview on the right refreshes automatically). Mention that he can say "undo" if he doesn't like it. Reply in the language he wrote in.
7. If a tool returns an error, fix the problem and retry once; if it still fails, explain simply.

IMAGES
- When he uploads an image, you can see it. Save a description for it with describe_image. If he says where it should go, place it with set_image. If he doesn't say, choose the obvious spot from IMAGE SLOTS (e.g. a headshot of Jay → his team photo; an office photo → about page story image) and tell him where you put it. If several places are equally likely, ask.
- If he asks to change his uploaded photo (remove background, better lighting, professional backdrop, different crop/format), use edit_image with that media_id, then set_image with the NEW media_id.
- For new images use generate_image, then set_image. Use the slot's recommended size.
- IMAGE STYLE for generated images: photorealistic, high-end corporate photography, natural soft light, refined and uncluttered, subtle sage-green/navy/gold accents where natural, UAE/Dubai context when relevant (modern offices, skyline, business districts). No text, letters, logos or watermarks in the image. Do not depict real, identifiable people (never fake a photo of the actual team — for team photos ask him to upload real ones). People shown should look like professionals in business attire appropriate to the UAE.
- Generated images are not live until set_image is called.

WEBSITE SECTIONS (where things appear)
${guide}

SITE CONTENT (English shown; every text field also has Arabic — use get_content to read it)
${outlineForPrompt(content)}

IMAGE SLOTS
${slots}
Also: "service:<slug>" sets a service page banner; "blog:<post id>" sets a blog post picture.

SERVICES (separate pages at /services/<slug>; edit with get_service / update_service)
${serviceLines}

BLOG POSTS (firm's own insights)
${postLines}

MEDIA LIBRARY (most recent 25: media_id | source | size | description | date)
${mediaLines}

RECENT CHANGES (change number, time UTC, what)
${revLines}

MEMORY — lasting preferences/facts (id + fact)
${factLines}

PREVIOUS CONVERSATIONS (summaries)
${prevLines}
${mem.currentSummary ? `\nEARLIER IN THIS CONVERSATION (summary of older messages)\n${mem.currentSummary}\n` : ''}`;
}

// ---------------------------------------------------------------------------
// Tool execution
// ---------------------------------------------------------------------------
function parseJsonArg(raw, label) {
  try {
    const v = JSON.parse(raw);
    if (!isPlainObject(v)) throw new Error();
    return v;
  } catch {
    throw new Error(`${label} must be a JSON object`);
  }
}

/** Builds a new list item by filling the shape of an existing item with the provided values. */
function shapeItem(template, provided) {
  if (!isPlainObject(template)) return provided;
  const out = {};
  for (const [k, tv] of Object.entries(template)) {
    const pv = provided?.[k];
    if (isText(tv)) {
      if (pv == null) out[k] = { en: '', ar: '' };
      else if (typeof pv === 'string') throw new Error(`"${k}" needs both languages: {"en": "...", "ar": "..."}`);
      else out[k] = { en: String(pv.en ?? ''), ar: String(pv.ar ?? '') };
    } else if (isImage(tv)) {
      out[k] = isImage(pv) ? pv : structuredClone(tv);
    } else if (isPlainObject(tv)) {
      out[k] = shapeItem(tv, pv || {});
    } else {
      out[k] = pv == null ? tv : String(pv);
    }
  }
  return out;
}

async function runTool(name, args, ctx) {
  const meta = { source: 'chat', conversationId: ctx.conversation.id, actor: ctx.admin.email };

  switch (name) {
    case 'get_content': {
      const content = await getSiteContentFresh();
      const value = getAt(content, args.path);
      if (value === undefined) throw new Error(`Nothing at "${args.path}"`);
      return { value };
    }

    case 'update_content': {
      const content = await getSiteContentFresh();
      const updates = [];
      for (const ch of args.changes || []) {
        const current = getAt(content, ch.path);
        if (current === undefined) throw new Error(`"${ch.path}" does not exist`);
        if (isText(current)) {
          const en = ch.en ?? current.en;
          const ar = ch.ar ?? current.ar;
          if (ch.en != null && ch.en !== current.en && ch.ar == null && current.ar) {
            throw new Error(`You changed the English of "${ch.path}" but not the Arabic. Provide "ar" too.`);
          }
          updates.push({ path: ch.path, value: { en: String(en), ar: String(ar) } });
        } else if (typeof current === 'string') {
          if (ch.value == null) throw new Error(`"${ch.path}" is a plain value — use "value"`);
          updates.push({ path: ch.path, value: String(ch.value) });
        } else {
          throw new Error(`"${ch.path}" is a group or list, not a single field. Use a more specific path, edit_list, or set_image.`);
        }
      }
      if (!updates.length) throw new Error('No changes given');
      const ids = await updateContentPaths(updates, { ...meta, summary: args.summary });
      ctx.recordAction({ kind: 'change', label: args.summary, revision_ids: ids, page: pageForPath(updates[0].path) });
      return { ok: true, change_numbers: ids };
    }

    case 'edit_list': {
      const content = await getSiteContentFresh();
      const list = getAt(content, args.path);
      if (!Array.isArray(list)) throw new Error(`"${args.path}" is not a list`);
      const next = structuredClone(list);
      if (args.action === 'add') {
        const template = list[0] ?? getAt(DEFAULT_CONTENT, args.path)?.[0];
        const item = shapeItem(template, parseJsonArg(args.item_json, 'item_json'));
        const at = args.index == null ? next.length : Math.max(0, Math.min(next.length, args.index));
        next.splice(at, 0, item);
      } else if (args.action === 'remove') {
        if (args.index == null || !next[args.index]) throw new Error('index of an existing item is required');
        if (next.length <= 1) throw new Error('Cannot remove the last item of a list — edit it instead');
        next.splice(args.index, 1);
      } else if (args.action === 'move') {
        if (args.index == null || args.to_index == null || !next[args.index]) throw new Error('index and to_index are required');
        const [item] = next.splice(args.index, 1);
        next.splice(Math.max(0, Math.min(next.length, args.to_index)), 0, item);
      }
      const ids = await updateContentPaths([{ path: args.path, value: next }], { ...meta, summary: args.summary });
      ctx.recordAction({ kind: 'change', label: args.summary, revision_ids: ids, page: pageForPath(args.path) });
      return { ok: true, change_numbers: ids, list_length: next.length };
    }

    case 'set_image': {
      const media = await getMedia(args.media_id);
      const target = String(args.target);
      const alt = { en: args.alt_en || media.alt_en || '', ar: args.alt_ar || media.alt_ar || '' };
      let ids;
      if (target.startsWith('service:')) {
        const slug = target.slice(8);
        ids = [await updateService(slug, { image_url: media.url, image_alt_en: alt.en, image_alt_ar: alt.ar }, { ...meta, summary: args.summary })];
      } else if (target.startsWith('blog:')) {
        const { revisionId } = await saveBlogPost(target.slice(5), { featured_image: media.url }, { ...meta, summary: args.summary });
        ids = [revisionId];
      } else {
        const content = await getSiteContentFresh();
        const current = getAt(content, target);
        if (!isImage(current)) throw new Error(`"${target}" is not an image slot. Pick one from IMAGE SLOTS.`);
        ids = await updateContentPaths([{ path: target, value: { url: media.url, alt } }], { ...meta, summary: args.summary });
      }
      if (!media.alt_en && alt.en) await updateMediaInfo(media.id, { altEn: alt.en, altAr: alt.ar }).catch(() => {});
      ctx.recordAction({ kind: 'change', label: args.summary, revision_ids: ids, page: pageForPath(target) });
      return { ok: true, change_numbers: ids };
    }

    case 'generate_image': {
      ctx.emit({ type: 'status', text: 'Creating the image… (this can take up to a minute)' });
      const res = await openai().images.generate({
        model: IMAGE_MODEL,
        prompt: args.prompt,
        size: args.size,
        quality: IMAGE_QUALITY,
        output_format: 'webp',
      });
      const b64 = res.data?.[0]?.b64_json;
      if (!b64) throw new Error('The image service returned no image');
      const saved = await saveMedia({ buffer: Buffer.from(b64, 'base64'), source: 'generated', prompt: args.prompt, description: args.purpose, actor: ctx.admin.email });
      ctx.emit({ type: 'image', media_id: saved.id, url: saved.url });
      ctx.recordAction({ kind: 'image', media_id: saved.id, url: saved.url, label: `Created image: ${args.purpose}` });
      return { media_id: saved.id, width: saved.width, height: saved.height, note: 'Saved to the library. Call set_image to put it on the site.' };
    }

    case 'edit_image': {
      if (!args.media_ids?.length) throw new Error('media_ids is required');
      ctx.emit({ type: 'status', text: 'Editing the image… (this can take up to a minute)' });
      const rows = await Promise.all(args.media_ids.slice(0, 8).map((id) => getMedia(id)));
      const files = await Promise.all(
        rows.map(async (r, i) => toFile(await toPng(await downloadMedia(r)), `source-${i}.png`, { type: 'image/png' }))
      );
      const res = await openai().images.edit({
        model: IMAGE_MODEL,
        image: files,
        prompt: args.prompt,
        size: args.size,
        quality: IMAGE_QUALITY,
        output_format: 'webp',
      });
      const b64 = res.data?.[0]?.b64_json;
      if (!b64) throw new Error('The image service returned no image');
      const saved = await saveMedia({
        buffer: Buffer.from(b64, 'base64'),
        source: 'edited',
        prompt: args.prompt,
        parentIds: rows.map((r) => r.id),
        description: `Edited version of ${rows[0].description || rows[0].original_name || 'an image'}: ${args.prompt}`.slice(0, 900),
        actor: ctx.admin.email,
      });
      ctx.emit({ type: 'image', media_id: saved.id, url: saved.url });
      ctx.recordAction({ kind: 'image', media_id: saved.id, url: saved.url, label: 'Edited image' });
      return { media_id: saved.id, width: saved.width, height: saved.height, note: 'Saved to the library. Call set_image to put it on the site.' };
    }

    case 'describe_image': {
      await getMedia(args.media_id);
      await updateMediaInfo(args.media_id, { description: args.description, altEn: args.alt_en, altAr: args.alt_ar });
      return { ok: true };
    }

    case 'get_service': {
      const s = await getService(args.slug);
      if (!s) throw new Error(`No service "${args.slug}"`);
      return { service: s };
    }

    case 'update_service': {
      const id = await updateService(args.slug, parseJsonArg(args.fields_json, 'fields_json'), { ...meta, summary: args.summary });
      ctx.recordAction({ kind: 'change', label: args.summary, revision_ids: [id], page: `/services/${args.slug}` });
      return { ok: true, change_numbers: [id] };
    }

    case 'create_service': {
      const fields = parseJsonArg(args.fields_json, 'fields_json');
      const id = await createService(fields, { ...meta, summary: args.summary });
      ctx.recordAction({ kind: 'change', label: args.summary, revision_ids: [id], page: `/services/${fields.slug}` });
      return { ok: true, change_numbers: [id] };
    }

    case 'list_blog_posts':
      return { posts: await listBlogPostsAdmin() };

    case 'get_blog_post': {
      const p = await getBlogPost(args.id);
      if (!p) throw new Error('Post not found');
      return { post: p };
    }

    case 'save_blog_post': {
      const { id, revisionId } = await saveBlogPost(args.id || null, parseJsonArg(args.fields_json, 'fields_json'), { ...meta, summary: args.summary });
      ctx.recordAction({ kind: 'change', label: args.summary, revision_ids: [revisionId], page: '/blog' });
      return { ok: true, id, change_numbers: [revisionId] };
    }

    case 'undo_change': {
      const rev = await undoRevision(args.revision_id, meta);
      ctx.recordAction({ kind: 'change', label: `Undid change #${rev.id}`, revision_ids: [], page: rev.target_type === 'content' ? pageForPath(rev.path || '') : rev.target_type === 'service' ? `/services/${rev.target_id}` : '/blog' });
      return { ok: true };
    }

    case 'remember':
      return { ok: true, memory_id: await addMemory(args.fact) };

    case 'forget':
      await removeMemory(args.memory_id);
      return { ok: true };

    default:
      throw new Error(`Unknown tool ${name}`);
  }
}

const STATUS_TEXT = {
  get_content: 'Reading the page…',
  update_content: 'Updating the website…',
  edit_list: 'Updating the list…',
  set_image: 'Placing the image…',
  generate_image: 'Creating the image…',
  edit_image: 'Editing the image…',
  describe_image: 'Looking at the image…',
  get_service: 'Reading the service page…',
  update_service: 'Updating the service page…',
  create_service: 'Creating the service page…',
  list_blog_posts: 'Checking blog posts…',
  get_blog_post: 'Reading the blog post…',
  save_blog_post: 'Saving the blog post…',
  undo_change: 'Undoing…',
  remember: 'Noting that down…',
  forget: 'Forgetting that…',
};

// ---------------------------------------------------------------------------
// Agent loop
// ---------------------------------------------------------------------------
/**
 * Runs one user turn. `emit` receives UI events:
 *   {type:'status',text} {type:'delta',text} {type:'image',media_id,url} {type:'action',action}
 * Returns { text, actions }.
 */
export async function runAgentTurn({ conversation, admin, userMessage, emit }) {
  const actions = [];
  const ctx = {
    conversation,
    admin,
    emit,
    recordAction: (a) => {
      actions.push(a);
      emit({ type: 'action', action: a });
    },
  };

  const instructions = await buildInstructions(conversation);
  const { recent } = await loadMemoryContext(conversation);

  // History: recent messages verbatim (text). Images are attached for the last two user messages
  // so the model can see what was just uploaded without re-sending the whole gallery each turn.
  const userIdx = recent.map((m, i) => (m.role === 'user' ? i : -1)).filter((i) => i >= 0);
  const withImages = new Set(userIdx.slice(-2));
  const input = recent.map((m, i) => {
    if (m.role === 'assistant') return { role: 'assistant', content: messageAsText(m) || '(no reply)' };
    const parts = [{ type: 'input_text', text: messageAsText(m) || '(image only)' }];
    if (withImages.has(i)) for (const a of m.attachments || []) parts.push({ type: 'input_image', image_url: a.url, detail: 'auto' });
    return { role: 'user', content: parts };
  });
  // Make sure the just-sent message is last (it was stored before this call).
  if (!recent.length || recent[recent.length - 1].id !== userMessage.id) {
    input.push({ role: 'user', content: [{ type: 'input_text', text: messageAsText(userMessage) }] });
  }

  let finalText = '';
  for (let step = 0; step < MAX_STEPS; step++) {
    const stream = await openai().responses.create({
      model: TEXT_MODEL,
      instructions,
      input,
      tools: TOOLS,
      parallel_tool_calls: true,
      stream: true,
    });

    let response = null;
    let stepText = '';
    for await (const ev of stream) {
      if (ev.type === 'response.output_text.delta') {
        stepText += ev.delta;
        emit({ type: 'delta', text: ev.delta });
      } else if (ev.type === 'response.completed') {
        response = ev.response;
      } else if (ev.type === 'response.failed' || ev.type === 'error') {
        throw new Error(ev.response?.error?.message || ev.message || 'The AI service failed');
      }
    }
    if (!response) throw new Error('The AI service ended unexpectedly');
    finalText += stepText;

    const calls = response.output.filter((o) => o.type === 'function_call');
    if (!calls.length) break;

    input.push(...response.output);
    for (const call of calls) {
      emit({ type: 'status', text: STATUS_TEXT[call.name] || 'Working…' });
      let output;
      try {
        const args = JSON.parse(call.arguments || '{}');
        output = await runTool(call.name, args, ctx);
      } catch (e) {
        output = { error: e.message };
      }
      input.push({ type: 'function_call_output', call_id: call.call_id, output: JSON.stringify(output).slice(0, 20000) });
    }
    if (finalText && !finalText.endsWith('\n')) {
      finalText += '\n\n';
      emit({ type: 'delta', text: '\n\n' });
    }
  }

  return { text: finalText.trim(), actions };
}
