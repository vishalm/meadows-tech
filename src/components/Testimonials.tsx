import { testimonials } from '../content';
import { StarIcon } from './icons';

export function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="section-tag">{testimonials.tag}</div>
      <h2 className="section-title fade-up">{testimonials.title}</h2>
      <p className="section-sub fade-up">{testimonials.sub}</p>
      <div className="testimonials-grid">
        {testimonials.items.map((t, i) => (
          <div
            key={t.name}
            className="tcard fade-up"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, j) => (
                <StarIcon key={j} />
              ))}
            </div>
            <div className="tcard-quote">{t.quote}</div>
            <div className="tcard-author">
              <div className="tauthor-avatar">
                <img src={t.avatar} alt={t.avatarAlt} loading="lazy" />
              </div>
              <div>
                <div className="tauthor-name">{t.name}</div>
                <div className="tauthor-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
