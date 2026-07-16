// Provides the chat-driven site theme. Holds the active subject, applies it as
// a `data-subject` attribute on <html> (CSS in index.css does the recoloring),
// and shows a brief, kid-friendly "mode switched" badge when it changes.
//
// Both chat surfaces call `applyFromText` on each user message; the whole page
// recolors in response. State lives here (not in a component) so the theme is
// shared across every surface and the rest of the site.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { classifySubject, SUBJECT_META, type Subject } from '../lib/subjectTheme';
import { SparkleIcon } from '../components/icons';

interface SubjectThemeValue {
  subject: Subject;
  meta: (typeof SUBJECT_META)[Subject];
  /** Classify text, apply the resulting theme, and return the resolved subject. */
  applyFromText: (text: string) => Subject;
  /** Reset back to the default brand theme (e.g. when a chat is cleared). */
  reset: () => void;
}

const SubjectThemeContext = createContext<SubjectThemeValue | null>(null);

export function SubjectThemeProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState<Subject>('default');
  // Mirror of `subject` for stable, non-stale reads inside callbacks.
  const subjectRef = useRef<Subject>('default');
  const [toast, setToast] = useState<Subject | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reflect the active subject onto <html> so the CSS variable overrides apply
  // site-wide. Default theme carries no attribute (the :root values stand).
  useEffect(() => {
    const el = document.documentElement;
    if (subject === 'default') {
      delete el.dataset.subject;
    } else {
      el.dataset.subject = subject;
    }
  }, [subject]);

  const setSubjectSafely = useCallback((next: Subject) => {
    if (next === subjectRef.current) return;
    subjectRef.current = next;
    setSubject(next);
    // Announce non-default switches with a short badge; going back to default
    // is silent (nothing to celebrate).
    if (next !== 'default') {
      setToast(next);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 2600);
    } else {
      setToast(null);
    }
  }, []);

  const applyFromText = useCallback(
    (text: string) => {
      const next = classifySubject(text, subjectRef.current);
      setSubjectSafely(next);
      return next;
    },
    [setSubjectSafely],
  );

  const reset = useCallback(() => setSubjectSafely('default'), [setSubjectSafely]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const value: SubjectThemeValue = {
    subject,
    meta: SUBJECT_META[subject],
    applyFromText,
    reset,
  };

  return (
    <SubjectThemeContext.Provider value={value}>
      {children}
      <div className="subject-toast-layer" aria-live="polite" aria-atomic="true">
        {toast && (
          <div className="subject-toast" key={toast} data-subject-toast={toast}>
            <SparkleIcon size={16} />
            <span>{SUBJECT_META[toast].label}</span>
            <small>{SUBJECT_META[toast].blurb}</small>
          </div>
        )}
      </div>
    </SubjectThemeContext.Provider>
  );
}

export function useSubjectTheme(): SubjectThemeValue {
  const ctx = useContext(SubjectThemeContext);
  if (!ctx) {
    throw new Error('useSubjectTheme must be used within a SubjectThemeProvider');
  }
  return ctx;
}
