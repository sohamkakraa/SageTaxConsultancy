import 'server-only';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { openai, TEXT_MODEL } from './openai';

// How much conversation history the agent sees verbatim; older turns are represented by the summary.
export const RECENT_MESSAGES = 14;
const MAX_MESSAGE_CHARS = 4000;
const PREVIOUS_CONVERSATIONS = 6;

export async function createConversation(actor) {
  const { data, error } = await supabaseAdmin.from('cms_conversations').insert({ created_by: actor }).select('*').single();
  if (error) throw new Error(error.message);
  return data;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getConversation(id) {
  if (!UUID.test(String(id))) return null;
  const { data, error } = await supabaseAdmin.from('cms_conversations').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function listConversations(limit = 40) {
  const { data, error } = await supabaseAdmin
    .from('cms_conversations')
    .select('id, title, message_count, updated_at')
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function deleteConversation(id) {
  const { error } = await supabaseAdmin.from('cms_conversations').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function getMessages(conversationId, limit = 200) {
  const { data, error } = await supabaseAdmin
    .from('cms_messages')
    .select('id, role, content, attachments, actions, created_at')
    .eq('conversation_id', conversationId)
    .order('id', { ascending: true })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function addMessage(conversationId, { role, content, attachments = [], actions = [] }) {
  const { data, error } = await supabaseAdmin
    .from('cms_messages')
    .insert({ conversation_id: conversationId, role, content: content || '', attachments, actions })
    .select('id, role, content, attachments, actions, created_at')
    .single();
  if (error) throw new Error(error.message);
  const { count } = await supabaseAdmin.from('cms_messages').select('id', { count: 'exact', head: true }).eq('conversation_id', conversationId);
  await supabaseAdmin.from('cms_conversations').update({ message_count: count || 0, updated_at: new Date().toISOString() }).eq('id', conversationId);
  return data;
}

export async function listMemory() {
  const { data, error } = await supabaseAdmin.from('cms_memory').select('id, fact, created_at').order('id').limit(60);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function addMemory(fact) {
  const clean = String(fact || '').trim().slice(0, 400);
  if (!clean) throw new Error('Empty fact');
  const { data, error } = await supabaseAdmin.from('cms_memory').insert({ fact: clean }).select('id').single();
  if (error) throw new Error(error.message);
  return data.id;
}

export async function removeMemory(id) {
  const { error } = await supabaseAdmin.from('cms_memory').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

/** Text form of a stored message as the model should remember it (incl. what the agent did). */
export function messageAsText(m) {
  let text = (m.content || '').slice(0, MAX_MESSAGE_CHARS);
  if (m.attachments?.length) {
    text += `\n[User attached ${m.attachments.length} image(s): ${m.attachments.map((a) => `media_id=${a.media_id}`).join(', ')}]`;
  }
  if (m.actions?.length) {
    const acts = m.actions
      .map((a) => (a.kind === 'image' ? `created image media_id=${a.media_id}` : `${a.label}${a.revision_ids?.length ? ` (change #${a.revision_ids.join(', #')})` : ''}`))
      .join('; ');
    text += `\n[Actions taken: ${acts}]`;
  }
  return text;
}

/**
 * Everything the agent needs to remember about past work, kept small:
 *  - durable memory facts (preferences the user asked to keep)
 *  - short summaries of the most recent previous conversations
 *  - for this conversation: a rolling summary of older turns + the last RECENT_MESSAGES verbatim
 */
export async function loadMemoryContext(conversation) {
  const [facts, prevRes, messages] = await Promise.all([
    listMemory(),
    supabaseAdmin
      .from('cms_conversations')
      .select('id, title, summary, updated_at')
      .neq('id', conversation.id)
      .not('summary', 'is', null)
      .order('updated_at', { ascending: false })
      .limit(PREVIOUS_CONVERSATIONS),
    getMessages(conversation.id),
  ]);
  const recent = messages.slice(-RECENT_MESSAGES);
  const hasOlder = messages.length > recent.length;
  return {
    facts,
    previous: prevRes.data || [],
    currentSummary: hasOlder ? conversation.summary : null,
    recent,
  };
}

/**
 * Updates the conversation's title and rolling summary after a turn. The summary is what future
 * conversations (and later turns of this one) see instead of the full transcript.
 */
export async function refreshConversationSummary(conversationId) {
  const conv = await getConversation(conversationId);
  if (!conv) return;
  const messages = await getMessages(conversationId);
  const unsummarised = messages.slice(conv.summarized_count || 0);
  if (!unsummarised.length) return;

  const transcript = unsummarised.map((m) => `${m.role === 'user' ? 'USER' : 'ASSISTANT'}: ${messageAsText(m).slice(0, 1500)}`).join('\n\n');
  const prompt = [
    'You maintain a compact memory of a conversation between a website owner and the AI assistant that edits their website (Sage Global Advisory, a UAE tax advisory firm).',
    'Update the summary so it captures only what will matter later: what was changed on the website (and change numbers), images created or placed (media ids), decisions and preferences the owner expressed, and anything still pending or promised.',
    'Drop small talk and details that are no longer relevant. Maximum 150 words, plain sentences.',
    conv.summary ? `\nCURRENT SUMMARY:\n${conv.summary}` : '',
    `\nNEW MESSAGES:\n${transcript}`,
    '\nReturn JSON: {"title": "3-6 word title for the whole conversation", "summary": "updated summary"}',
  ].join('\n');

  try {
    const res = await openai().responses.create({
      model: TEXT_MODEL,
      input: prompt,
      text: { format: { type: 'json_object' } },
      max_output_tokens: 1200,
    });
    const parsed = JSON.parse(res.output_text || '{}');
    await supabaseAdmin
      .from('cms_conversations')
      .update({
        title: String(parsed.title || conv.title).slice(0, 80),
        summary: String(parsed.summary || conv.summary || '').slice(0, 2000),
        summarized_count: messages.length,
      })
      .eq('id', conversationId);
  } catch (e) {
    console.error('Conversation summary failed:', e.message);
  }
}
