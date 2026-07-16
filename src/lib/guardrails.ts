// Client-side guardrails shared by every chat surface (AI Tutor section and the
// floating ChatWidget). Meadow is a tutor for K-12 students, so this is the
// friendly first line of defense: it rejects empty, oversized, rapid-fire,
// manipulative (prompt-injection / jailbreak), or abusive input before it ever
// reaches the model. The server (api/chat.ts) enforces its own hard limits too;
// never rely on the client alone for security.

export const MAX_INPUT_LENGTH = 1000;

// Sliding-window rate limit shared across all surfaces so a user cannot bypass
// it by switching between the section chat and the floating widget.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12;

export type GuardResult = { ok: true; text: string } | { ok: false; reason: string };

// Patterns that try to override Meadow's instructions or extract the system
// prompt. Kept deliberately tight so ordinary homework phrasing ("pretend you
// have 3 apples", "a catalyst acts as a helper") does not trip them.
const INJECTION_PATTERNS: RegExp[] = [
  /\bignore\s+(?:all\s+|the\s+|any\s+)?(?:previous|prior|above|earlier)\s+(?:instructions?|prompts?|messages?|rules?)\b/i,
  /\bdisregard\s+(?:all\s+|the\s+|your\s+)?(?:previous|prior|above)\b/i,
  /\b(?:system|developer)\s+prompt\b/i,
  /\b(?:reveal|show|print|repeat|tell me)\s+(?:your|the)\s+(?:system\s+prompt|instructions?|prompt)\b/i,
  /\byou\s+are\s+now\s+(?:a|an|my)\b/i,
  /\bpretend\s+(?:to\s+be|you\s+are|that\s+you\s+are)\b/i,
  /\bact\s+as\s+(?:if\s+you\s+are|a\s+jailbroken|an?\s+unrestricted)\b/i,
  /\b(?:developer|god|dan)\s+mode\b/i,
  /\bjailbreak\b/i,
  /\bwithout\s+(?:any\s+)?(?:restrictions?|filters?|rules?|guidelines?)\b/i,
];

// A small, deliberately conservative abuse filter. This is not meant to be an
// exhaustive profanity dictionary; it catches the most common abusive terms so
// a young user gets a gentle redirect instead of the tutor engaging with them.
// Matched against normalized text (leetspeak folded, repeats collapsed).
const ABUSE_ROOTS = [
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'bastard',
  'dick',
  'cunt',
  'slut',
  'whore',
  'nigger',
  'faggot',
  'retard',
  'rape',
];

// Fold common leetspeak substitutions and collapse elongated characters so
// "f u u c k" / "sh1t" / "a$$hole" still match the roots above.
function normalizeForAbuse(text: string): string {
  return text
    .toLowerCase()
    .replace(/[0]/g, 'o')
    .replace(/[1!|]/g, 'i')
    .replace(/[3]/g, 'e')
    .replace(/[4@]/g, 'a')
    .replace(/[5$]/g, 's')
    .replace(/[7]/g, 't')
    .replace(/[^a-z]/g, '') // drop spaces/punctuation used to split slurs
    .replace(/(.)\1{2,}/g, '$1$1'); // collapse 3+ repeats to 2
}

function containsAbuse(text: string): boolean {
  const normalized = normalizeForAbuse(text);
  return ABUSE_ROOTS.some((root) => normalized.includes(root));
}

function isInjection(text: string): boolean {
  return INJECTION_PATTERNS.some((re) => re.test(text));
}

// Module-level ring of recent send timestamps, shared across surfaces.
const recentSends: number[] = [];

function underRateLimit(now: number): boolean {
  while (recentSends.length && now - recentSends[0] > RATE_WINDOW_MS) {
    recentSends.shift();
  }
  return recentSends.length < RATE_MAX;
}

/**
 * Validate a user message before it is sent to the tutor.
 *
 * On success returns the trimmed text to send. On failure returns a friendly,
 * kid-appropriate reason the caller should surface in the transcript. The
 * blocked input is never echoed back, so abusive text is not repeated on
 * screen.
 *
 * @param raw       the raw input string
 * @param recordSend when true (the default) a successful check records the
 *                   timestamp against the rate limit; pass false to only peek.
 */
export function checkInput(raw: string, recordSend = true): GuardResult {
  const text = raw.trim();

  if (!text) {
    return { ok: false, reason: 'Type a question and I will help you learn!' };
  }

  if (text.length > MAX_INPUT_LENGTH) {
    return {
      ok: false,
      reason: `That message is a bit long for me. Try keeping it under ${MAX_INPUT_LENGTH} characters and ask one thing at a time.`,
    };
  }

  const now = Date.now();
  if (!underRateLimit(now)) {
    return {
      ok: false,
      reason: 'Whoa, that is a lot of questions very fast! Give me a few seconds to catch up, then ask again.',
    };
  }

  if (isInjection(text)) {
    return {
      ok: false,
      reason: 'I am Meadow, your learning buddy, and I always stay in tutor mode. Ask me about a school subject and we will dig in together!',
    };
  }

  if (containsAbuse(text)) {
    return {
      ok: false,
      reason: 'Let us keep our chat kind and school-friendly. Ask me about math, science, reading, or anything you are learning!',
    };
  }

  if (recordSend) recentSends.push(now);
  return { ok: true, text };
}
