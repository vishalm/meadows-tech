import { hero } from '../content';
import { HeroVisual } from './HeroVisual';
import { RobotIcon, SparkleIcon } from './icons';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-text fade-up">
        <div className="hero-tag">
          <SparkleIcon />
          {hero.tag}
        </div>
        <h1>
          {hero.titleStart} <em>{hero.titleEm}</em> {hero.titleEnd}
        </h1>
        <p className="hero-sub">{hero.sub}</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollToId('ai-tutor')}>
            {hero.ctaPrimary}
          </button>
          <button className="btn-secondary" onClick={() => scrollToId('courses')}>
            {hero.ctaSecondary}
          </button>
        </div>
      </div>
      <div className="hero-visual fade-up" style={{ transitionDelay: '0.15s' }}>
        <HeroVisual />
        <div className="hero-badge fade-up" style={{ transitionDelay: '0.3s' }}>
          <div className="badge-icon">
            <RobotIcon size={18} />
          </div>
          <div className="badge-text">
            <strong>{hero.badgeTitle}</strong>
            <small>{hero.badgeSub}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
