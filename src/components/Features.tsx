import { features } from '../content';
import { FeatureIcon } from './icons';

export function Features() {
  return (
    <section className="section" id="features">
      <div className="section-tag">{features.tag}</div>
      <h2 className="section-title fade-up">{features.title}</h2>
      <p className="section-sub fade-up">{features.sub}</p>
      <div className="features-grid">
        {features.items.map((f, i) => (
          <div
            key={f.title}
            className="feature-card fade-up"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="feat-icon">
              <FeatureIcon name={f.icon} />
            </div>
            <div className="feat-title">{f.title}</div>
            <p className="feat-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
