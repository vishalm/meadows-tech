// Chooses between the lightweight static fallback and the lazy-loaded
// 3D scene. Picks based on viewport width and prefers-reduced-motion so
// the hero never penalises LCP on small screens or low-power devices.
import { Component, Suspense, lazy, useEffect, useState, type ReactNode } from 'react';
import { HeroFallback } from './HeroFallback';

const Hero3D = lazy(() => import('./Hero3D'));

function shouldRender3D(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.innerWidth < 900) return false;
  return true;
}

// Guards the whole app against a 3D failure: if WebGL is unavailable or the
// scene throws while rendering, we quietly show the static SVG hero instead of
// letting the error unmount the React tree (which would blank the page).
class ThreeDBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
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
    <ThreeDBoundary fallback={<HeroFallback />}>
      <Suspense fallback={<HeroFallback />}>
        <Hero3D />
      </Suspense>
    </ThreeDBoundary>
  );
}
