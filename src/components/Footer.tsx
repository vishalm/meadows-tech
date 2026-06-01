import { brand, footer } from '../content';

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="nav-logo">
            {brand.name} <span style={{ color: 'var(--teal)' }}>{brand.suffix}</span>
          </span>
          <p>{footer.blurb}</p>
        </div>
        {footer.columns.map((col) => (
          <div className="footer-col" key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>{footer.copyright}</span>
        <span>{footer.legal}</span>
      </div>
    </footer>
  );
}
