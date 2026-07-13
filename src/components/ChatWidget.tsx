// Floating "Meadow" chat bubble, bottom-left. Gives a quick learning-chat
// experience anywhere on the page. Shares the tutor logic with the AI Tutor
// section (server -> Chrome on-device fallback) via lib/tutorChat.
import { useEffect, useRef, useState } from 'react';
import { chatWidget } from '../content';
import { useChromeAI } from '../hooks/useChromeAI';
import { getTutorReply, TUTOR_SYSTEM_PROMPT, type ChatMessage } from '../lib/tutorChat';
import { ChatIcon, CloseIcon, SendIcon } from './icons';

export function ChatWidget() {
  const { ask } = useChromeAI(TUTOR_SYSTEM_PROMPT);
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
    const text = raw.trim();
    if (!text || busy) return;
    setInput('');
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
          <div>
            <strong>{chatWidget.title}</strong>
            <small>{chatWidget.subtitle}</small>
          </div>
        </div>

        <div className="cw-messages" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={`${m.role}-${i}`} className={`cw-msg ${m.role === 'user' ? 'user' : 'bot'}`}>
              {m.content}
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
