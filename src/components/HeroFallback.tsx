// Static SVG fallback for the 3D hero scene. Renders instantly so the LCP
// is fast, and shows for users on small screens or with reduced-motion.
export function HeroFallback() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      <svg viewBox="0 0 560 540" xmlns="http://www.w3.org/2000/svg" role="presentation">
        <defs>
          <radialGradient id="hf-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#2a9d8f" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#1a6b6b" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1a6b6b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hf-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a6b6b" />
            <stop offset="100%" stopColor="#2a9d8f" />
          </linearGradient>
          <linearGradient id="hf-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8cc7a" />
            <stop offset="100%" stopColor="#c9a84c" />
          </linearGradient>
        </defs>

        {/* glow */}
        <circle cx="280" cy="270" r="240" fill="url(#hf-glow)" />

        {/* orbit rings */}
        <ellipse
          cx="280"
          cy="270"
          rx="200"
          ry="80"
          fill="none"
          stroke="rgba(26,107,107,0.18)"
          strokeWidth="1"
        />
        <ellipse
          cx="280"
          cy="270"
          rx="180"
          ry="180"
          fill="none"
          stroke="rgba(201,168,76,0.18)"
          strokeWidth="1"
          transform="rotate(20 280 270)"
        />

        {/* core wireframe icosahedron, drawn as overlapping polygons */}
        <g className="hf-core" transform="translate(280 270)">
          <polygon
            points="0,-100 95,-31 59,81 -59,81 -95,-31"
            fill="url(#hf-core)"
            opacity="0.95"
          />
          <polygon
            points="0,-100 95,-31 59,81 -59,81 -95,-31"
            fill="none"
            stroke="rgba(245,242,236,0.4)"
            strokeWidth="1"
          />
          <polygon
            points="0,100 -60,30 60,30"
            fill="rgba(13,15,20,0.18)"
          />
          <line x1="0" y1="-100" x2="0" y2="100" stroke="rgba(245,242,236,0.25)" />
          <line x1="-95" y1="-31" x2="95" y2="-31" stroke="rgba(245,242,236,0.25)" />
        </g>

        {/* satellite shapes */}
        <g className="hf-shape hf-shape-1">
          <circle cx="455" cy="180" r="28" fill="url(#hf-gold)" />
          <circle cx="455" cy="180" r="14" fill="rgba(13,15,20,0.18)" />
        </g>

        <g className="hf-shape hf-shape-2">
          <polygon
            points="90,200 130,180 130,220"
            fill="#2a9d8f"
            opacity="0.92"
          />
        </g>

        <g className="hf-shape hf-shape-3">
          <rect
            x="420"
            y="380"
            width="44"
            height="44"
            rx="6"
            fill="#1a6b6b"
            transform="rotate(20 442 402)"
          />
        </g>

        <g className="hf-shape hf-shape-4">
          <polygon
            points="120,420 150,400 180,420 165,450 135,450"
            fill="#c9a84c"
          />
        </g>

        {/* scattered particles */}
        <g className="hf-particles" fill="#1a6b6b">
          <circle cx="80" cy="100" r="2" opacity="0.5" />
          <circle cx="500" cy="90" r="2.5" opacity="0.6" />
          <circle cx="60" cy="320" r="1.8" opacity="0.45" />
          <circle cx="510" cy="300" r="2.2" opacity="0.55" />
          <circle cx="200" cy="60" r="1.6" opacity="0.4" />
          <circle cx="360" cy="60" r="2" opacity="0.5" />
          <circle cx="250" cy="490" r="1.8" opacity="0.5" />
          <circle cx="380" cy="490" r="2.2" opacity="0.55" />
        </g>
      </svg>
    </div>
  );
}
