// Thin wrapper around Chrome's built-in Prompt API (window.LanguageModel).
// All API calls are wrapped in try/catch so the FAQ can transparently fall
// back to pre-baked answers when the browser does not ship a model.

import { useEffect, useRef, useState } from 'react';

export type Availability =
  | 'unknown'
  | 'unavailable'
  | 'downloadable'
  | 'downloading'
  | 'available';

interface LMSession {
  prompt: (input: string) => Promise<string>;
  destroy?: () => void;
}

interface LMStatic {
  availability: () => Promise<string>;
  create: (opts?: {
    initialPrompts?: Array<{
      role: 'system' | 'user' | 'assistant';
      content: string;
    }>;
  }) => Promise<LMSession>;
}

declare global {
  interface Window {
    LanguageModel?: LMStatic;
  }
}

const SYSTEM_PROMPT =
  "You are the FAQ assistant for Meadows Tech, an AI-powered learning platform for K-12 students. Answer questions briefly (2-3 sentences) about the platform, AI tutor, courses, pricing, privacy, and how it works. Tone: friendly, clear, no jargon, no marketing fluff. If unsure, say so warmly and suggest contacting support.";

function normalize(raw: string): Availability {
  const v = raw.toLowerCase();
  if (v === 'available' || v === 'readily') return 'available';
  if (v === 'downloadable' || v === 'after-download') return 'downloadable';
  if (v === 'downloading') return 'downloading';
  return 'unavailable';
}

export function useChromeAI() {
  const [availability, setAvailability] = useState<Availability>('unknown');
  const sessionRef = useRef<LMSession | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (typeof window === 'undefined' || !window.LanguageModel) {
          if (!cancelled) setAvailability('unavailable');
          return;
        }
        const raw = await window.LanguageModel.availability();
        if (!cancelled) setAvailability(normalize(raw));
      } catch {
        if (!cancelled) setAvailability('unavailable');
      }
    })();
    return () => {
      cancelled = true;
      try {
        sessionRef.current?.destroy?.();
      } catch {
        // session may already be gone
      }
      sessionRef.current = null;
    };
  }, []);

  const ask = async (question: string): Promise<string> => {
    if (!window.LanguageModel) {
      throw new Error('Chrome built-in AI is not available in this browser.');
    }
    try {
      if (!sessionRef.current) {
        sessionRef.current = await window.LanguageModel.create({
          initialPrompts: [{ role: 'system', content: SYSTEM_PROMPT }],
        });
      }
      const result = await sessionRef.current.prompt(question);
      return (result ?? '').trim();
    } catch (err) {
      sessionRef.current = null;
      throw err instanceof Error ? err : new Error('Chrome AI request failed.');
    }
  };

  return { availability, ask };
}
