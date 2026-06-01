// Chooses between the lightweight static fallback and the lazy-loaded
// 3D scene. Picks based on viewport width and prefers-reduced-motion so
// the hero never penalises LCP on small screens or low-power devices.
import { Suspense, lazy, useEffect, useState } from 'react';
import { HeroFallback } from './HeroFallback';

const Hero3D = lazy(() => import('./Hero3D'));

function shouldRender3D(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.innerWidth < 900) return false;
  return true;
}

export function HeroVisual() {
  const [render3D, setRender3D] = useState(false);

  useEffect(() => {
    const decide = () => setRender3D(shouldRender3D());
    decide();
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMq.addEventListener('change', decide);
    window.addEventListener('resize', decide);
    return () => {
      motionMq.removeEventListener('change', decide);
      window.removeEventListener('resize', decide);
    };
  }, []);

  if (!render3D) return <HeroFallback />;
  return (
    <Suspense fallback={<HeroFallback />}>
      <Hero3D />
    </Suspense>
  );
}
