// Floating "Meadow" chat bubble, bottom-right, with full chat controls
// (new chat + close) and a live subject-mode pill. Gives a quick learning-chat
// experience anywhere on the page. Shares the tutor logic with the AI Tutor
// section (server -> Chrome on-device fallback) via lib/tutorChat, the input
// guardrails via lib/guardrails, and the site theme via theme/SubjectTheme.
import { useEffect, useRef, useState } from 'react';
import { chatWidget } from '../content';
import { useChromeAI } from '../hooks/useChromeAI';
import { checkInput } from '../lib/guardrails';
import { getTutorReply, TUTOR_SYSTEM_PROMPT, type ChatMessage } from '../lib/tutorChat';
import { useSubjectTheme } from '../theme/SubjectTheme';
import { ChatIcon, CloseIcon, RefreshIcon, SendIcon } from './icons';
import { Markdown } from './Markdown';

export function ChatWidget() {
  const { ask } = useChromeAI(TUTOR_SYSTEM_PROMPT);
  const { subject, meta, applyFromText, reset } = useSubjectTheme();
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy, open]);

  // Escape closes the panel when it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const openPanel = () => {
    setOpen(true);
    if (!greeted) {
      setGreeted(true);
      setMessages([{ role: 'assistant', content: chatWidget.greeting }]);
    }
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const send = async (raw: string) => {
    if (busy) return;
    // Guardrail: reject empty, oversized, rapid-fire, manipulative, or abusive
    // input. Blocked input is not echoed; only Meadow's friendly reason shows.
    const check = checkInput(raw);
    if (!check.ok) {
      setInput('');
      setMessages((prev) => [...prev, { role: 'assistant', content: check.reason }]);
      return;
    }
    const text = check.text;
    setInput('');
    // Recolor the whole site to match the topic the student is asking about.
    applyFromText(text);
    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setBusy(true);
    try {
      const reply = await getTutorReply(next, ask);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply || chatWidget.errorMessage },
      ]);
    } finally {
      setBusy(false);
    }
  };

  // "New chat" control: wipe the transcript back to the greeting and drop the
  // site theme back to the default brand look.
  const clearChat = () => {
    if (busy) return;
    setMessages([{ role: 'assistant', content: chatWidget.greeting }]);
    setInput('');
    reset();
    setTimeout(() => inputRef.current?.focus(), 40);
  };

  return (
    <>
      <button
        type="button"
        className="cw-toggle"
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-label={open ? chatWidget.closeLabel : chatWidget.launchLabel}
        aria-expanded={open}
        aria-controls="cw-panel"
      >
        {open ? <CloseIcon size={26} /> : <ChatIcon size={26} />}
      </button>

      <div
        id="cw-panel"
        className={`cw-panel${open ? ' open' : ''}`}
        role="dialog"
        aria-label={chatWidget.title}
        aria-hidden={!open}
      >
        <div className="cw-head">
          <span className="spark spin" aria-hidden="true" />
          <div className="cw-head-text">
            <strong>{chatWidget.title}</strong>
            <small>{subject === 'default' ? chatWidget.subtitle : meta.label}</small>
          </div>
          {subject !== 'default' && (
            <span className="cw-subject-pill" title={meta.blurb}>
              <span className="cw-subject-dot" aria-hidden="true" />
              {meta.short}
            </span>
          )}
          <div className="cw-head-actions">
            <button
              type="button"
              className="cw-head-btn"
              onClick={clearChat}
              disabled={busy}
              aria-label={chatWidget.clearLabel}
              title={chatWidget.clearLabel}
            >
              <RefreshIcon size={18} />
            </button>
            <button
              type="button"
              className="cw-head-btn"
              onClick={() => setOpen(false)}
              aria-label={chatWidget.closeLabel}
              title={chatWidget.closeLabel}
            >
              <CloseIcon size={18} />
            </button>
          </div>
        </div>

        <div className="cw-messages" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={`${m.role}-${i}`} className={`cw-msg ${m.role === 'user' ? 'user' : 'bot'}`}>
              {m.role === 'user' ? m.content : <Markdown>{m.content}</Markdown>}
            </div>
          ))}
          {busy && (
            <div className="cw-msg bot cw-typing" aria-label="Meadow is typing">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        <div className="cw-input-row">
          <input
            ref={inputRef}
            className="cw-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send(input);
            }}
            placeholder={chatWidget.placeholder}
            aria-label="Message Meadow"
            disabled={busy}
          />
          <button
            type="button"
            className="cw-send"
            onClick={() => send(input)}
            disabled={busy || !input.trim()}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
}
