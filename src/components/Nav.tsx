import { useEffect, useState } from 'react';
import { brand, nav } from '../content';
import { ArrowRightIcon, CloseIcon, MenuIcon } from './icons';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);
  const goto = (id: string) => {
    scrollToId(id);
    close();
  };

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <a
          href="#top"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            close();
          }}
        >
          <span className="spark spin" aria-hidden="true" />
          {brand.name} <span>{brand.suffix}</span>
        </a>
        <ul className="nav-links">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  goto(l.href.replace('#', ''));
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => goto('ai-tutor')}>
          {nav.ctaLabel}
          <ArrowRightIcon size={14} />
        </button>
        <button
          type="button"
          className="nav-burger"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="mobile-menu-header">
          <span className="nav-logo">
            <span className="spark spin" aria-hidden="true" />
            {brand.name} <span>{brand.suffix}</span>
          </span>
          <button
            type="button"
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={close}
          >
            <CloseIcon />
          </button>
        </div>
        <ul className="mobile-menu-links">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  goto(l.href.replace('#', ''));
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="btn-primary mobile-menu-cta" onClick={() => goto('ai-tutor')}>
          {nav.ctaLabel}
          <ArrowRightIcon size={14} />
        </button>
      </div>
    </>
  );
}
