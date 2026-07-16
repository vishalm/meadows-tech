// Subject detection for the dynamic, chat-driven site theme. As a student
// chats with Meadow, we sniff the topic (math / science / arts / english) and
// recolor the whole site to match, so the experience feels alive and playful
// for K-12 learners. Pure, side-effect-free logic so it is easy to reason about
// and test; the React provider in ../theme/SubjectTheme applies the result.

export type Subject = 'default' | 'math' | 'science' | 'arts' | 'english';

export interface SubjectMeta {
  /** Stable id, also used as the `data-subject` attribute value. */
  id: Subject;
  /** Short human label, e.g. "Science". */
  short: string;
  /** Badge label shown in chat headers, e.g. "Science mode". */
  label: string;
  /** One-line, kid-friendly description of the vibe. */
  blurb: string;
}

export const SUBJECT_META: Record<Subject, SubjectMeta> = {
  default: {
    id: 'default',
    short: 'Meadows',
    label: 'Explorer mode',
    blurb: 'Ask about anything you are learning.',
  },
  math: {
    id: 'math',
    short: 'Math',
    label: 'Math mode',
    blurb: 'Numbers, patterns, and problem solving.',
  },
  science: {
    id: 'science',
    short: 'Science',
    label: 'Science mode',
    blurb: 'Experiments, nature, and how things work.',
  },
  arts: {
    id: 'arts',
    short: 'Arts',
    label: 'Arts mode',
    blurb: 'Colors, music, and creative ideas.',
  },
  english: {
    id: 'english',
    short: 'English',
    label: 'English mode',
    blurb: 'Reading, writing, and storytelling.',
  },
};

export const SUBJECTS: Subject[] = ['default', 'math', 'science', 'arts', 'english'];

// Whole-word keyword banks per subject. Kept broad enough to catch how kids
// actually phrase questions, without overlapping across subjects.
const KEYWORDS: Record<Exclude<Subject, 'default'>, string[]> = {
  math: [
    'math', 'maths', 'mathematics', 'algebra', 'geometry', 'calculus', 'arithmetic',
    'fraction', 'fractions', 'equation', 'equations', 'multiply', 'multiplication',
    'divide', 'division', 'add', 'addition', 'subtract', 'subtraction', 'sum',
    'number', 'numbers', 'trigonometry', 'percentage', 'percent', 'decimal',
    'decimals', 'integer', 'integers', 'angle', 'angles', 'triangle', 'square',
    'polygon', 'probability', 'statistics', 'graph', 'exponent', 'ratio',
  ],
  science: [
    'science', 'biology', 'chemistry', 'physics', 'photosynthesis', 'atom', 'atoms',
    'molecule', 'molecules', 'cell', 'cells', 'gravity', 'planet', 'planets',
    'ecosystem', 'evolution', 'energy', 'force', 'forces', 'experiment', 'chemical',
    'reaction', 'organism', 'electron', 'proton', 'neutron', 'volcano', 'weather',
    'climate', 'dna', 'genetics', 'element', 'elements', 'magnet', 'magnetism',
    'ecology', 'species', 'bacteria', 'oxygen', 'carbon',
  ],
  arts: [
    'art', 'arts', 'drawing', 'draw', 'paint', 'painting', 'music', 'dance',
    'dancing', 'color', 'colors', 'colour', 'colours', 'sculpture', 'design',
    'creative', 'craft', 'crafts', 'instrument', 'melody', 'rhythm', 'canvas',
    'sketch', 'theatre', 'theater', 'drama', 'photography', 'song', 'singing',
    'guitar', 'piano', 'palette', 'crayon', 'doodle',
  ],
  english: [
    'english', 'grammar', 'writing', 'write', 'essay', 'essays', 'literature',
    'poetry', 'poem', 'poems', 'noun', 'nouns', 'verb', 'verbs', 'adjective',
    'adjectives', 'adverb', 'adverbs', 'sentence', 'sentences', 'paragraph',
    'spelling', 'spell', 'vocabulary', 'reading', 'read', 'comprehension', 'story',
    'stories', 'narrative', 'punctuation', 'syllable', 'metaphor', 'simile',
    'pronoun', 'apostrophe', 'synonym', 'antonym',
  ],
};

// Precompile one global, word-boundary regex per subject for fast counting.
const PATTERNS = Object.entries(KEYWORDS).map(([subject, words]) => ({
  subject: subject as Exclude<Subject, 'default'>,
  re: new RegExp(`\\b(?:${words.join('|')})\\b`, 'gi'),
}));

/**
 * Classify text into a subject by counting keyword hits. The subject with the
 * most matches wins. If nothing matches, the theme is "sticky": the current
 * subject is kept so a follow-up like "why?" does not snap back to default.
 *
 * @param text     the user's message
 * @param current  the subject currently applied (kept on a tie / no match)
 */
export function classifySubject(text: string, current: Subject = 'default'): Subject {
  let best: Subject = current;
  let bestScore = 0;
  for (const { subject, re } of PATTERNS) {
    const matches = text.match(re);
    const score = matches ? matches.length : 0;
    if (score > bestScore) {
      bestScore = score;
      best = subject;
    }
  }
  return bestScore > 0 ? best : current;
}
