import { useState } from 'react';
import { faq } from '../content';
import { useChromeAI, type Availability } from '../hooks/useChromeAI';
import { ArrowRightIcon, ChevronDownIcon, SparkleIcon } from './icons';

type AnswerState =
  | { status: 'pending' }
  | { status: 'ai'; text: string }
  | { status: 'fallback'; text: string }
  | { status: 'empty' };

function bannerFor(availability: Availability): string | null {
  switch (availability) {
    case 'unavailable':
      return faq.unavailableBanner;
    case 'downloadable':
      return faq.downloadableBanner;
    case 'downloading':
      return faq.downloadingBanner;
    default:
      return null;
  }
}

export function FAQ() {
  const { availability, ask } = useChromeAI();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});

  const [customQ, setCustomQ] = useState('');
  const [customAsking, setCustomAsking] = useState(false);
  const [customAnswer, setCustomAnswer] = useState<AnswerState | null>(null);

  const toggle = async (idx: number) => {
    if (openIdx === idx) {
      setOpenIdx(null);
      return;
    }
    setOpenIdx(idx);
    if (answers[idx] && answers[idx].status !== 'pending') return;

    setAnswers((prev) => ({ ...prev, [idx]: { status: 'pending' } }));

    try {
      if (availability !== 'available') {
        throw new Error('Chrome AI not available');
      }
      const text = await ask(faq.items[idx].q);
      if (!text) {
        setAnswers((prev) => ({
          ...prev,
          [idx]: { status: 'fallback', text: faq.items[idx].a },
        }));
      } else {
        setAnswers((prev) => ({ ...prev, [idx]: { status: 'ai', text } }));
      }
    } catch {
      setAnswers((prev) => ({
        ...prev,
        [idx]: { status: 'fallback', text: faq.items[idx].a },
      }));
    }
  };

  const askCustom = async () => {
    const q = customQ.trim();
    if (!q) return;
    setCustomAsking(true);
    setCustomAnswer({ status: 'pending' });
    try {
      if (availability !== 'available') {
        throw new Error('Chrome AI not available');
      }
      const text = await ask(q);
      if (!text) {
        setCustomAnswer({ status: 'empty' });
      } else {
        setCustomAnswer({ status: 'ai', text });
      }
    } catch {
      setCustomAnswer({ status: 'empty' });
    } finally {
      setCustomAsking(false);
    }
  };

  const banner = bannerFor(availability);

  return (
    <section className="section faq-section" id="faq">
      <div className="section-tag">{faq.tag}</div>
      <h2 className="section-title fade-up">{faq.title}</h2>
      <p className="section-sub fade-up">{faq.sub}</p>

      {banner && (
        <div
          className={`faq-banner${availability === 'unavailable' ? ' is-quiet' : ''} fade-up`}
          role="status"
        >
          {banner}
        </div>
      )}

      <ul className="faq-list">
        {faq.items.map((item, idx) => {
          const ans = answers[idx];
          const isOpen = openIdx === idx;
          return (
            <li key={item.q} className="faq-item fade-up">
              <button
                type="button"
                className="faq-q"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${idx}`}
              >
                <span>{item.q}</span>
                <span className={`faq-chevron${isOpen ? ' open' : ''}`} aria-hidden="true">
                  <ChevronDownIcon />
                </span>
              </button>
              {isOpen && (
                <div id={`faq-a-${idx}`} className="faq-a">
                  {(!ans || ans.status === 'pending') && (
                    <div className="faq-loading" aria-live="polite">
                      <span className="faq-spinner" aria-hidden="true" />
                      {faq.loadingAnswer}
                    </div>
                  )}
                  {ans?.status === 'ai' && (
                    <>
                      <p>{ans.text}</p>
                      <small className="faq-badge">
                        <SparkleIcon size={12} /> {faq.poweredBy}
                      </small>
                    </>
                  )}
                  {ans?.status === 'fallback' && (
                    <>
                      <p>{ans.text}</p>
                      <small className="faq-badge is-muted">{faq.fallbackUsed}</small>
                    </>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="faq-custom fade-up">
        <label htmlFor="faq-custom-input" className="faq-custom-label">
          {faq.customLabel}
        </label>
        <div className="faq-custom-row">
          <input
            id="faq-custom-input"
            className="faq-custom-input"
            value={customQ}
            onChange={(e) => setCustomQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') askCustom();
            }}
            placeholder={faq.customPlaceholder}
            disabled={customAsking}
          />
          <button
            type="button"
            className="btn-primary faq-custom-btn"
            onClick={askCustom}
            disabled={customAsking || !customQ.trim()}
          >
            {customAsking ? faq.loadingAnswer : faq.customCta}
            {!customAsking && <ArrowRightIcon size={14} />}
          </button>
        </div>
        {customAnswer && (
          <div
            className={`faq-custom-answer${customAnswer.status === 'empty' ? ' is-empty' : ''}`}
            aria-live="polite"
          >
            {customAnswer.status === 'pending' && (
              <div className="faq-loading">
                <span className="faq-spinner" aria-hidden="true" />
                {faq.loadingAnswer}
              </div>
            )}
            {customAnswer.status === 'ai' && (
              <>
                <p>{customAnswer.text}</p>
                <small className="faq-badge">
                  <SparkleIcon size={12} /> {faq.poweredBy}
                </small>
              </>
            )}
            {customAnswer.status === 'empty' && <p>{faq.emptyAnswer}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
