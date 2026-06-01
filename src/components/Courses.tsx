import { courses } from '../content';
import { ClockIcon, StarIcon, UsersIcon } from './icons';

export function Courses() {
  return (
    <section className="section courses-section" id="courses">
      <div className="section-tag">{courses.tag}</div>
      <h2 className="section-title fade-up">{courses.title}</h2>
      <p className="section-sub fade-up">{courses.sub}</p>
      <div className="courses-grid">
        {courses.items.map((c, i) => (
          <div
            key={c.title}
            className="course-card fade-up"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="course-img">
              <img src={c.img} alt={c.alt} loading="lazy" />
            </div>
            <div className="course-body">
              <span className="course-tag">{c.tag}</span>
              <div className="course-title">{c.title}</div>
              <p className="course-desc">{c.desc}</p>
              <div className="course-meta">
                <span>
                  <ClockIcon />
                  {c.hours}
                </span>
                <span>
                  <StarIcon />
                  {c.rating}
                </span>
                <span>
                  <UsersIcon />
                  {c.students}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
