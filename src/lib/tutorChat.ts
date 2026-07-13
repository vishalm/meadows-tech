// Shared "Meadow" tutor chat logic used by both the embedded AI Tutor section
// and the floating chat widget. Keeps the persona, the API call, and the
// server -> on-device fallback chain in one place (DRY).

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

// Mirrors the persona in api/chat.ts so the on-device fallback answers the
// same way as the deployed Claude tutor.
export const TUTOR_SYSTEM_PROMPT =
  "You are Meadow, an encouraging and friendly AI tutor for school students (grades K-12). Give clear, step-by-step explanations, use simple analogies, and stay warm and never condescending. Keep responses concise (2-4 short paragraphs), show each step for math, and end with an encouraging note or a follow-up question. If asked something outside school subjects, gently redirect to academic topics.";

async function callServer(history: ChatMessage[]): Promise<string> {
  const resp = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: history }),
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const data = (await resp.json()) as { reply?: string };
  return data.reply ?? '';
}

// Prefers the deployed Claude endpoint; if it is unreachable (local dev, no API
// key), falls back to Chrome's on-device built-in AI via `askOnDevice`. Returns
// an empty string when neither is available so callers can show a friendly
// message.
export async function getTutorReply(
  history: ChatMessage[],
  askOnDevice: (question: string) => Promise<string>,
): Promise<string> {
  try {
    const reply = await callServer(history);
    if (reply) return reply;
  } catch {
    // server unavailable; try on-device next
  }
  try {
    const last = history[history.length - 1]?.content ?? '';
    const reply = await askOnDevice(last);
    if (reply) return reply;
  } catch {
    // on-device AI unavailable
  }
  return '';
}
