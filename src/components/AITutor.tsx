import { useEffect, useRef, useState } from 'react';
import { aiTutor } from '../content';
import { useChromeAI } from '../hooks/useChromeAI';
import { checkInput } from '../lib/guardrails';
import { getTutorReply, TUTOR_SYSTEM_PROMPT, type ChatMessage } from '../lib/tutorChat';
import { useSubjectTheme } from '../theme/SubjectTheme';
import { AiFeatureIcon, QuickPromptIcon, RobotIcon, SendIcon } from './icons';
import { Markdown } from './Markdown';

export function AITutor() {
  const { ask } = useChromeAI(TUTOR_SYSTEM_PROMPT);
  const { subject, meta, applyFromText } = useSubjectTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [hidePrompts, setHidePrompts] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy]);

  const send = async (raw: string) => {
    if (busy) return;
    // Guardrail: reject empty, oversized, rapid-fire, manipulative, or abusive
    // input before it reaches the tutor. Blocked input is never echoed back.
    const check = checkInput(raw);
    if (!check.ok) {
      setInput('');
      setHidePrompts(true);
      setMessages((prev) => [...prev, { role: 'assistant', content: check.reason }]);
      return;
    }
    const text = check.text;
    setInput('');
    setHidePrompts(true);
    // Recolor the whole site to match the topic being asked about.
    applyFromText(text);
    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setBusy(true);
    try {
      const reply = await getTutorReply(next, ask);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply || aiTutor.errorMessage }]);
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send(input);
  };

  return (
    <section className="section ai-section" id="ai-tutor">
      <div className="ai-container">
        <div>
          <div className="section-tag">{aiTutor.tag}</div>
          <h2 className="section-title fade-up">{aiTutor.title}</h2>
          <p className="section-sub fade-up">{aiTutor.sub}</p>
          <ul className="ai-features">
            {aiTutor.features.map((f, i) => (
              <li key={f.title} className="fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="ai-feat-icon">
                  <AiFeatureIcon name={f.icon} />
                </div>
                <div className="ai-feat-text">
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up" style={{ transitionDelay: '0.15s' }}>
          <div className="ai-chat-box">
            <div className="chat-header">
              <div className="chat-avatar">
                <RobotIcon size={18} />
              </div>
              <div className="chat-header-text">
                <strong>{aiTutor.tutorName}</strong>
                <small>{subject === 'default' ? aiTutor.tutorPoweredBy : meta.label}</small>
              </div>
              {subject !== 'default' && (
                <span className="chat-subject-pill" title={meta.blurb}>
                  <span className="cw-subject-dot" aria-hidden="true" />
                  {meta.short}
                </span>
              )}
              <div className="online-dot" aria-hidden />
            </div>
            <div className="chat-messages" ref={scrollRef}>
              <div className="msg ai">
                <div className="msg-name">{aiTutor.tutorName}</div>
                <div className="msg-bubble">
                  <Markdown>{aiTutor.greeting}</Markdown>
                </div>
              </div>
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role === 'user' ? 'user' : 'ai'}`}>
                  <div className="msg-name">{m.role === 'user' ? 'You' : aiTutor.tutorName}</div>
                  <div className="msg-bubble">
                    {m.role === 'user' ? m.content : <Markdown>{m.content}</Markdown>}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="msg ai">
                  <div className="msg-name">{aiTutor.tutorName}</div>
                  <div className="msg-bubble">
                    <div className="typing" aria-label="Tutor is typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!hidePrompts && (
              <div className="quick-prompts">
                {aiTutor.quickPrompts.map((qp) => (
                  <button key={qp.label} className="qp-btn" onClick={() => send(qp.prompt)}>
                    <QuickPromptIcon name={qp.icon} />
                    {qp.label}
                  </button>
                ))}
              </div>
            )}
            <div className="chat-input-row">
              <input
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder={aiTutor.inputPlaceholder}
                aria-label="Message"
              />
              <button
                className="send-btn"
                onClick={() => send(input)}
                disabled={busy || !input.trim()}
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
