import 'server-only';
import sharp from 'sharp';
import { randomUUID } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const MEDIA_BUCKET = 'cms-media';
export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const ALLOWED_FORMATS = new Set(['jpeg', 'png', 'webp', 'gif', 'avif', 'heif', 'tiff']);
const MAX_DIMENSION = 2400;

/**
 * Validates and normalises an image: decodes it (rejecting anything that is not a real raster image),
 * applies EXIF rotation, strips all metadata (GPS etc.), downsizes and re-encodes to WebP.
 */
export async function normaliseImage(input) {
  if (!input?.length) throw new Error('Empty file');
  if (input.length > MAX_UPLOAD_BYTES) throw new Error('Image is larger than 15 MB');
  let meta;
  try {
    meta = await sharp(input, { limitInputPixels: 80_000_000 }).metadata();
  } catch {
    throw new Error('That file is not a supported image (use JPG, PNG, WebP or GIF).');
  }
  if (!ALLOWED_FORMATS.has(meta.format)) throw new Error(`Unsupported image type: ${meta.format}`);
  const { data, info } = await sharp(input, { limitInputPixels: 80_000_000, animated: false })
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer({ resolveWithObject: true });
  return { buffer: data, width: info.width, height: info.height };
}

/** Converts a stored WebP into PNG for the OpenAI image-edit endpoint. */
export async function toPng(buffer) {
  return sharp(buffer).png().toBuffer();
}

export async function saveMedia({ buffer, source, prompt = null, parentIds = [], description = null, altEn = '', altAr = '', originalName = null, actor = null }) {
  const { buffer: webp, width, height } = await normaliseImage(buffer);
  const id = randomUUID();
  const now = new Date();
  const path = `${source}/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, '0')}/${id}.webp`;

  const { error: upErr } = await supabaseAdmin.storage.from(MEDIA_BUCKET).upload(path, webp, {
    contentType: 'image/webp',
    cacheControl: '31536000',
    upsert: false,
  });
  if (upErr) throw new Error(`Upload failed: ${upErr.message}`);

  const { data: pub } = supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  const row = {
    id,
    storage_path: path,
    url: pub.publicUrl,
    mime: 'image/webp',
    width,
    height,
    bytes: webp.length,
    source,
    prompt: prompt?.slice(0, 4000) || null,
    parent_ids: parentIds,
    description: description?.slice(0, 1000) || null,
    alt_en: altEn?.slice(0, 300) || '',
    alt_ar: altAr?.slice(0, 300) || '',
    original_name: originalName?.slice(0, 200) || null,
    created_by: actor,
  };
  const { error } = await supabaseAdmin.from('cms_media').insert(row);
  if (error) throw new Error(`Could not save image record: ${error.message}`);
  return row;
}

export async function getMedia(id) {
  if (!/^[0-9a-f-]{36}$/i.test(String(id))) throw new Error(`Unknown image id "${id}"`);
  const { data, error } = await supabaseAdmin.from('cms_media').select('*').eq('id', id).is('deleted_at', null).maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error(`Image ${id} not found in the media library`);
  return data;
}

export async function listMedia(limit = 60) {
  const { data, error } = await supabaseAdmin
    .from('cms_media')
    .select('id, url, width, height, source, description, alt_en, alt_ar, prompt, original_name, created_at')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function downloadMedia(row) {
  const { data, error } = await supabaseAdmin.storage.from(MEDIA_BUCKET).download(row.storage_path);
  if (error) throw new Error(`Could not read image: ${error.message}`);
  return Buffer.from(await data.arrayBuffer());
}

export async function updateMediaInfo(id, { description, altEn, altAr }) {
  const patch = {};
  if (description !== undefined) patch.description = String(description).slice(0, 1000);
  if (altEn !== undefined) patch.alt_en = String(altEn).slice(0, 300);
  if (altAr !== undefined) patch.alt_ar = String(altAr).slice(0, 300);
  const { error } = await supabaseAdmin.from('cms_media').update(patch).eq('id', id);
  if (error) throw new Error(error.message);
}

/** Soft delete (file kept so that undo / history never points at a missing image). */
export async function archiveMedia(id) {
  const { error } = await supabaseAdmin.from('cms_media').update({ deleted_at: new Date().toISOString() }).eq('id', id);
  if (error) throw new Error(error.message);
}
