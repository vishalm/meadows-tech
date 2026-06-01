import { brand, nav } from '../content';
import { ArrowRightIcon } from './icons';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <a
        href="#top"
        className="nav-logo"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        {brand.name} <span>{brand.suffix}</span>
      </a>
      <ul className="nav-links">
        {nav.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.href.replace('#', ''));
              }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <button className="nav-cta" onClick={() => scrollToId('ai-tutor')}>
        {nav.ctaLabel}
        <ArrowRightIcon size={14} />
      </button>
    </nav>
  );
}
