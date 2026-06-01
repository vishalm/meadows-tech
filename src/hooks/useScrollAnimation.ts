import { useEffect } from 'react';

// Toggles a `.visible` class on every `.fade-up` element as it scrolls
// into view. Mirrors the original artifact's IntersectionObserver.
export function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
