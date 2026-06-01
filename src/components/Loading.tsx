import { useEffect, useState } from 'react';
import { brand } from '../content';

export function Loading() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`loading-overlay${hide ? ' hide' : ''}`} aria-hidden={hide}>
      <div className="loading-logo">
        {brand.name} <span>{brand.suffix}</span>
      </div>
    </div>
  );
}
