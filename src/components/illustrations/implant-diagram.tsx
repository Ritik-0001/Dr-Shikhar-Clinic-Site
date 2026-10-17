/**
 * Cross-section of a dental implant: crown, abutment, titanium post, gum and jawbone.
 * A simple explainer graphic (not to scale) drawn as inline SVG, no image weight.
 */
export function ImplantDiagram({ className }: { className?: string }) {
  const label = { fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: 15, fontWeight: 700, fill: "#133b73" } as const;
  return (
    <svg viewBox="0 0 420 470" className={className} role="img" aria-label="Diagram of a dental implant showing the crown, abutment, titanium post, gum and jawbone">
      <defs>
        <linearGradient id="imp-crown" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d9e6f7" />
        </linearGradient>
        <linearGradient id="imp-post" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8aa2bd" />
          <stop offset="0.45" stopColor="#e4ecf5" />
          <stop offset="1" stopColor="#7d95b1" />
        </linearGradient>
        <linearGradient id="imp-bone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e9d6" />
          <stop offset="1" stopColor="#ecd8bb" />
        </linearGradient>
        <linearGradient id="imp-gum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4a9a6" />
          <stop offset="1" stopColor="#ec8f8f" />
        </linearGradient>
      </defs>

      {/* jawbone */}
      <path d="M26 298 H362 V430 a22 22 0 0 1 -22 22 H48 a22 22 0 0 1 -22 -22Z" fill="url(#imp-bone)" stroke="#dcc29b" strokeWidth="2" strokeLinejoin="round" />
      <g fill="#dcc29b" opacity="0.7">
        <circle cx="70" cy="340" r="3" /><circle cx="104" cy="380" r="2.5" /><circle cx="60" cy="410" r="3" />
        <circle cx="140" cy="426" r="2.5" /><circle cx="250" cy="344" r="3" /><circle cx="296" cy="392" r="2.5" />
        <circle cx="322" cy="336" r="3" /><circle cx="262" cy="428" r="3" /><circle cx="226" cy="384" r="2" />
      </g>

      {/* gum */}
      <path d="M26 300 V270 C70 252 124 256 160 266 V300Z" fill="url(#imp-gum)" />
      <path d="M200 266 C236 256 292 252 362 270 V300 H200Z" fill="url(#imp-gum)" />

      {/* titanium post */}
      <path d="M160 262 H200 L196 392 Q180 430 164 392Z" fill="url(#imp-post)" stroke="#6b829c" strokeWidth="2" strokeLinejoin="round" />
      <g stroke="#5f7893" strokeWidth="2.2" strokeLinecap="round">
        <path d="M161 288 L199 298" /><path d="M162 308 L198 318" /><path d="M162 328 L198 338" />
        <path d="M163 348 L197 358" /><path d="M164 368 L196 378" />
      </g>

      {/* abutment */}
      <path d="M168 224 H192 L198 262 H162Z" fill="#c3262f" stroke="#a31e27" strokeWidth="2" strokeLinejoin="round" />

      {/* crown */}
      <path
        d="M132 120 C132 92 154 76 180 86 C206 76 228 92 228 120 C228 160 222 198 214 214 C209 226 198 232 188 230 L172 230 C162 232 151 226 146 214 C138 198 132 160 132 120Z"
        fill="url(#imp-crown)"
        stroke="#7fa6dc"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M148 110 C144 132 146 156 152 178" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.9" />

      {/* labels */}
      <g strokeWidth="1.6" stroke="#133b73" fill="none" strokeLinecap="round">
        <path d="M230 128 H262" /><path d="M200 246 H262" /><path d="M198 330 H262" />
      </g>
      <g fill="#c3262f">
        <circle cx="230" cy="128" r="4" /><circle cx="200" cy="246" r="4" /><circle cx="198" cy="330" r="4" />
      </g>
      <text x="270" y="133" style={label}>Crown</text>
      <text x="270" y="251" style={label}>Abutment</text>
      <text x="270" y="335" style={label}>Titanium post</text>
      <text x="74" y="288" style={{ ...label, fill: "#7a2c2c" }}>Gum</text>
      <text x="213" y="440" style={{ ...label, fill: "#7a5a2c" }} textAnchor="middle">Jawbone</text>
    </svg>
  );
}
