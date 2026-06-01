// SVG icon set. Per CLAUDE.md, no emoji or icon fonts are allowed,
// so every icon used in the site lives here as an inline SVG.
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const RobotIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M12 4v4" />
    <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
    <path d="M9 17h6" />
  </svg>
);

export const SparkleIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
  </svg>
);

export const ArrowRightIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const BrainIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M9.5 3a3 3 0 00-3 3v0a3 3 0 00-2 5.2v0a3 3 0 001 5.6 3 3 0 004 1.7V3z" />
    <path d="M14.5 3a3 3 0 013 3v0a3 3 0 012 5.2v0a3 3 0 01-1 5.6 3 3 0 01-4 1.7V3z" />
  </svg>
);

export const ChatIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M21 12a8 8 0 11-2.7-6L21 4l-1 4a8 8 0 011 4z" />
    <path d="M8 11h8M8 14h5" />
  </svg>
);

export const EditIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M14 3l7 7-11 11H3v-7z" />
    <path d="M14 3l7 7" />
  </svg>
);

export const ChartIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 4 4 5-7" />
  </svg>
);

export const TargetIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export const SearchIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const BoltIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M13 2L3 14h8l-1 8 10-12h-8z" />
  </svg>
);

export const GradCapIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M2 9l10-5 10 5-10 5z" />
    <path d="M6 11v5c0 1 3 2.5 6 2.5s6-1.5 6-2.5v-5" />
  </svg>
);

export const RefreshIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M21 12a9 9 0 11-3-6.7L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

export const ClockIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const StarIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path
      d="M12 3l2.7 5.6L21 9.5l-4.5 4.4 1.1 6.1L12 17.8 6.4 20l1.1-6.1L3 9.5l6.3-.9z"
      fill="currentColor"
    />
  </svg>
);

export const UsersIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="9" cy="9" r="3" />
    <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M15 14c3 0 6 1.5 6 4" />
  </svg>
);

export const LeafIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 20c0-9 7-15 16-15 0 9-6 16-15 16z" />
    <path d="M5 20c4-4 7-7 11-9" />
  </svg>
);

export const CompassIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M16 8l-2 6-6 2 2-6z" />
  </svg>
);

export const BookIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4z" />
    <path d="M20 4h-6a3 3 0 00-3 3v13a2 2 0 012-2h7z" />
  </svg>
);

export const PencilIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M14 3l7 7-12 12H2v-7z" />
    <path d="M14 3l7 7" />
  </svg>
);

export const SendIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4z" />
  </svg>
);

export const MenuIcon = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const ChevronDownIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const FEATURE_ICONS = {
  brain: BrainIcon,
  chat: ChatIcon,
  edit: EditIcon,
  chart: ChartIcon,
  target: TargetIcon,
  search: SearchIcon,
} as const;
export type FeatureIcon = keyof typeof FEATURE_ICONS;
export const FeatureIcon = ({ name, ...rest }: { name: FeatureIcon } & IconProps) => {
  const Cmp = FEATURE_ICONS[name];
  return <Cmp {...rest} />;
};

const AI_FEATURE_ICONS = {
  bolt: BoltIcon,
  grad: GradCapIcon,
  refresh: RefreshIcon,
} as const;
export type AiFeatureIcon = keyof typeof AI_FEATURE_ICONS;
export const AiFeatureIcon = ({ name, ...rest }: { name: AiFeatureIcon } & IconProps) => {
  const Cmp = AI_FEATURE_ICONS[name];
  return <Cmp {...rest} />;
};

const QUICK_PROMPT_ICONS = {
  leaf: LeafIcon,
  compass: CompassIcon,
  book: BookIcon,
  pencil: PencilIcon,
} as const;
export type QuickPromptIcon = keyof typeof QUICK_PROMPT_ICONS;
export const QuickPromptIcon = ({
  name,
  ...rest
}: { name: QuickPromptIcon } & IconProps) => {
  const Cmp = QUICK_PROMPT_ICONS[name];
  return <Cmp {...rest} />;
};
