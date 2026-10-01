// Pure helpers for reading/writing the content tree by dotted path, e.g. "home.faq.items.2.answer".
// No server-only imports: safe to use in the browser (CMS editor) and on the server (agent).

export const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
export const isText = (v) => isPlainObject(v) && 'en' in v && 'ar' in v && Object.keys(v).length === 2;
export const isImage = (v) => isPlainObject(v) && typeof v.url === 'string' && 'alt' in v;

const FORBIDDEN = new Set(['__proto__', 'prototype', 'constructor']);

export function parsePath(path) {
  if (typeof path !== 'string' || !path.trim()) throw new Error('Path is empty');
  const parts = path.split('.').map((p) => p.trim());
  for (const p of parts) {
    if (!p || FORBIDDEN.has(p) || !/^[A-Za-z0-9_-]+$/.test(p)) throw new Error(`Invalid path segment "${p}" in "${path}"`);
  }
  return parts;
}

export function getAt(tree, path) {
  let node = tree;
  for (const p of parsePath(path)) {
    if (node == null) return undefined;
    node = Array.isArray(node) ? node[Number(p)] : node[p];
  }
  return node;
}

/** Returns a new tree with `value` at `path`. Intermediate containers must already exist. */
export function setAt(tree, path, value) {
  const parts = parsePath(path);
  const root = structuredClone(tree);
  let node = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = Array.isArray(node) ? Number(parts[i]) : parts[i];
    if (node[key] == null || typeof node[key] !== 'object') throw new Error(`Path "${path}" does not exist`);
    node = node[key];
  }
  const last = parts[parts.length - 1];
  if (Array.isArray(node)) {
    const idx = Number(last);
    if (!Number.isInteger(idx) || idx < 0 || idx > node.length) throw new Error(`Index ${last} out of range in "${path}"`);
    node[idx] = value;
  } else {
    node[last] = value;
  }
  return root;
}

/** Deep merge: objects merge key-by-key; arrays and scalars from `override` replace `base`. */
export function deepMerge(base, override) {
  if (override === undefined) return structuredClone(base);
  if (Array.isArray(base) && Array.isArray(override)) {
    // Fill missing fields of each stored list item from the default item shape.
    const template = base[0];
    return override.map((item) => (isPlainObject(template) && isPlainObject(item) ? deepMerge(template, item) : item));
  }
  if (isPlainObject(base) && isPlainObject(override)) {
    const out = {};
    for (const key of new Set([...Object.keys(base), ...Object.keys(override)])) {
      if (FORBIDDEN.has(key)) continue;
      out[key] = key in override ? deepMerge(base[key], override[key]) : structuredClone(base[key]);
    }
    return out;
  }
  return structuredClone(override);
}

/** Every image slot in the tree: [{ path, url, alt }]. */
export function listImageSlots(tree, prefix = '') {
  const out = [];
  const walk = (node, path) => {
    if (isImage(node)) {
      out.push({ path, url: node.url, alt: node.alt?.en || '' });
      return;
    }
    if (Array.isArray(node)) node.forEach((v, i) => walk(v, path ? `${path}.${i}` : String(i)));
    else if (isPlainObject(node)) Object.entries(node).forEach(([k, v]) => walk(v, path ? `${path}.${k}` : k));
  };
  walk(tree, prefix);
  return out;
}

/**
 * Compact English-only view of the tree for the AI agent's context window.
 * Arabic is omitted (the agent fetches it with get_content when needed) to save tokens.
 */
export function outlineForPrompt(tree, maxLen = 220) {
  const lines = [];
  const clip = (s) => (s.length > maxLen ? `${s.slice(0, maxLen)}…` : s);
  const walk = (node, path) => {
    if (isText(node)) lines.push(`${path} = ${JSON.stringify(clip(String(node.en ?? '')))}`);
    else if (isImage(node)) lines.push(`${path} = [image ${node.url.startsWith('/') ? node.url : shortUrl(node.url)}${node.alt?.en ? ` "${clip(node.alt.en)}"` : ''}]`);
    else if (Array.isArray(node)) {
      lines.push(`${path} = [list of ${node.length}]`);
      node.forEach((v, i) => walk(v, `${path}.${i}`));
    } else if (isPlainObject(node)) Object.entries(node).forEach(([k, v]) => walk(v, path ? `${path}.${k}` : k));
    else lines.push(`${path} = ${JSON.stringify(node)} (plain value, same in both languages)`);
  };
  walk(tree, '');
  return lines.join('\n');
}

function shortUrl(url) {
  try {
    const u = new URL(url);
    return `${u.host}${u.pathname}`.slice(0, 90);
  } catch {
    return url.slice(0, 90);
  }
}

/** Pick the visitor's language from a { en, ar } value, falling back to English. */
export function pick(value, locale) {
  if (value == null) return '';
  if (typeof value !== 'object') return String(value);
  return value[locale] || value.en || '';
}
