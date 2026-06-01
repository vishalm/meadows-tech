import { stats } from '../content';

export function Stats() {
  return (
    <div className="stats">
      {stats.map((s, i) => (
        <div key={s.label} className="stat fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
          <div className="stat-num">{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
