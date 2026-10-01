import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { runAgentTurn } from '@/lib/cms/agent';
import { getMedia } from '@/lib/cms/media';
import { addMessage, createConversation, getConversation, refreshConversationSummary } from '@/lib/cms/memory';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// One turn at a time per conversation (protects against double-submits).
const busy = new Set();

/** Revalidate the public pages in a separate request (see /api/cms/publish). */
async function publishSite(request) {
  try {
    await fetch(new URL('/api/cms/publish', request.url), {
      method: 'POST',
      headers: { cookie: request.headers.get('cookie') || '', origin: new URL(request.url).origin, host: request.headers.get('host') || '' },
      cache: 'no-store',
    });
  } catch (e) {
    console.error('Publish after chat failed:', e.message);
  }
}

export async function POST(request) {
  const { admin, response } = await requireAdmin(request);
  if (response) return response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid request');
  }
  const text = String(body?.text || '').trim().slice(0, 8000);
  const attachmentIds = Array.isArray(body?.attachments) ? body.attachments.slice(0, 8) : [];
  if (!text && !attachmentIds.length) return jsonError('Type a message or attach an image.');

  let conversation = body?.conversationId ? await getConversation(String(body.conversationId)) : null;
  if (body?.conversationId && !conversation) return jsonError('Conversation not found', 404);
  if (!conversation) conversation = await createConversation(admin.email);
  if (busy.has(conversation.id)) return jsonError('Still working on your previous message…', 409);

  let attachments;
  try {
    attachments = await Promise.all(attachmentIds.map(async (id) => {
      const m = await getMedia(String(id));
      return { media_id: m.id, url: m.url };
    }));
  } catch (e) {
    return jsonError(e.message);
  }

  const userMessage = await addMessage(conversation.id, { role: 'user', content: text, attachments });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (ev) => {
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(ev)}\n`));
        } catch {
          /* client went away */
        }
      };
      busy.add(conversation.id);
      let changed = false;
      send({ type: 'start', conversationId: conversation.id, userMessage });
      try {
        const result = await runAgentTurn({ conversation, admin, userMessage, emit: send });
        changed = result.actions.some((a) => a.kind === 'change');
        if (changed) await publishSite(request);
        const saved = await addMessage(conversation.id, {
          role: 'assistant',
          content: result.text || (result.actions.length ? 'Done.' : ''),
          actions: result.actions,
        });
        send({ type: 'done', message: saved });
      } catch (e) {
        console.error('CMS chat error:', e);
        const msg = /OPENAI_API_KEY/.test(e.message)
          ? 'The AI assistant is not configured yet (missing OpenAI key).'
          : `Sorry, something went wrong: ${e.message}`;
        const saved = await addMessage(conversation.id, { role: 'assistant', content: msg }).catch(() => null);
        send({ type: 'error', error: msg, message: saved });
      } finally {
        busy.delete(conversation.id);
        if (!changed) await publishSite(request); // partial changes before an error still go live
        // Keep the long-term memory compact and current (runs after the UI already has the answer).
        await refreshConversationSummary(conversation.id).catch(() => {});
        send({ type: 'summary-updated' });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
    },
  });
}
