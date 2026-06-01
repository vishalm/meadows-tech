// Vercel serverless function that proxies tutor chat requests to the
// Anthropic Messages API. Keeps the API key on the server.

const SYSTEM_PROMPT = `You are Meadow, an encouraging and friendly AI tutor for school students (grades K-12). Your job is to help students understand academic subjects clearly and build their confidence.

Guidelines:
- Give clear, step-by-step explanations appropriate for students
- Be warm, encouraging, and never condescending
- Use simple analogies and real-world examples when helpful
- For math problems, show each step clearly
- Keep responses concise but complete (2-4 paragraphs max)
- If asked something outside school subjects, gently redirect to academic topics
- Always end with an encouraging note or a follow-up question to deepen understanding`;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error:
        'ANTHROPIC_API_KEY is not set. Add it under Vercel project Settings, Environment Variables.',
    });
  }

  let messages: ChatMessage[] = [];
  try {
    const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as
      | { messages?: ChatMessage[] }
      | undefined;
    messages = body?.messages ?? [];
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' });
  }

  const sanitized = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-20);

  try {
    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: sanitized,
      }),
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();
      return res.status(502).json({ error: 'Upstream error', detail: text.slice(0, 500) });
    }

    const data = (await apiRes.json()) as { content?: Array<{ text?: string }> };
    const reply = data.content?.[0]?.text ?? '';
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Request failed', detail: (err as Error).message });
  }
}
