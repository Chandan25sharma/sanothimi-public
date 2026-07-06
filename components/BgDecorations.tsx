'use client';

/* ─── Reusable Nepal-inspired SVG background decorations ─────────────── */

const SPOKES = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);

/** 12-spoke geometric mandala — inspired by Newar medallion woodwork */
export function Mandala({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(200,200)" stroke="currentColor" strokeWidth="0.65" fill="none">
        {/* 6 concentric rings */}
        {[180, 148, 116, 84, 52, 20].map((r) => <circle key={r} r={r} />)}
        {/* 12 radial spokes */}
        {SPOKES.map((a) => (
          <line key={`sp-${a}`} y1={-182} y2={182} transform={`rotate(${a})`} />
        ))}
        {/* Diamond ornaments on ring r=116 */}
        {SPOKES.map((a) => (
          <g key={`dm-${a}`} transform={`rotate(${a})`}>
            <rect x="-4" y="-120" width="8" height="8" stroke="none"
              fill="currentColor" fillOpacity="0.55"
              transform="rotate(45,0,-116)" />
          </g>
        ))}
        {/* Dot ornaments on ring r=148 */}
        {SPOKES.map((a) => (
          <g key={`dt-${a}`} transform={`rotate(${a})`}>
            <circle cy="-148" r="2.8" fill="currentColor" fillOpacity="0.45" stroke="none" />
          </g>
        ))}
        {/* 6 inner petals (lotus) */}
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <g key={`pt-${a}`} transform={`rotate(${a})`}>
            <ellipse cy="-34" rx="7" ry="20" fill="currentColor" fillOpacity="0.18" stroke="none" />
          </g>
        ))}
        {/* Centre dot */}
        <circle r="5" fill="currentColor" fillOpacity="0.35" stroke="none" />
      </g>
    </svg>
  );
}

/** Himalayan ridge silhouette — roughly Everest region peaks */
export function Himalaya({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 160" fill="none" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M0,160 L0,135 L50,100 L90,118 L130,80 L170,98 L210,55 L250,78 L285,35 L320,62 L355,18 L390,48 L420,28 L455,55 L490,38 L525,65 L565,45 L605,72 L645,55 L685,85 L730,65 L780,95 L830,75 L885,108 L940,88 L995,118 L1050,100 L1110,128 L1160,112 L1200,135 L1200,160 Z"
      />
    </svg>
  );
}

/** Stylised 12-ray sun — adapted from the sun symbol on Nepal's flag */
export function NepalSun({ className }: { className?: string }) {
  const rays = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(100,100)" stroke="currentColor" fill="none">
        {/* Outer glow ring */}
        <circle r="92" strokeWidth="0.6" />
        <circle r="78" strokeWidth="0.6" />
        {/* 12 rays from centre outward */}
        {rays.map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <line y1={-50} y2={-90} strokeWidth="1.2" />
            <polygon points="0,-94 3,-84 -3,-84" fill="currentColor" fillOpacity="0.7" stroke="none" />
          </g>
        ))}
        {/* Inner sun disc */}
        <circle r="48" strokeWidth="0.8" />
        <circle r="28" fill="currentColor" fillOpacity="0.12" stroke="none" />
        {/* Diamond accents between rays at r=78 */}
        {rays.map((a) => (
          <g key={`d-${a}`} transform={`rotate(${a})`}>
            <rect x="-2.5" y="-81" width="5" height="5" fill="currentColor" fillOpacity="0.5"
              stroke="none" transform="rotate(45,0,-78)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Crescent moon with 8-pointed star — from Nepal's flag, stylised */
export function NepalMoon({ className }: { className?: string }) {
  const starPts = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(100,100)" stroke="currentColor" fill="none">
        {/* Outer rings */}
        <circle r="90" strokeWidth="0.6" />
        <circle r="70" strokeWidth="0.5" />
        {/* Crescent shape */}
        <path
          strokeWidth="1.2"
          d="M -30,-55 A 65,65 0 1,0 -30,55 A 45,45 0 1,1 -30,-55 Z"
          fill="currentColor" fillOpacity="0.1"
        />
        {/* 8-point star above crescent */}
        <g transform="translate(22,-20)">
          {starPts.map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <line y1={-6} y2={-18} strokeWidth="1.2" />
            </g>
          ))}
          <circle r="6" fill="currentColor" fillOpacity="0.3" stroke="none" />
          <circle r="3" fill="currentColor" fillOpacity="0.6" stroke="none" />
        </g>
      </g>
    </svg>
  );
}

/** Animated network graph — echoes the logo's node-and-line motif across the hero */
export function NetworkGraph({ className }: { className?: string }) {
  const nodes = [
    // Left N-cluster (mirrors logo shape)
    { id: 1,  x: 72,   y: 80,  r: 12, c: '#0D47A1', dl: '0s'   },
    { id: 2,  x: 72,   y: 340, r: 10, c: '#0D47A1', dl: '0.8s' },
    { id: 3,  x: 192,  y: 205, r: 6,  c: '#0D47A1', dl: '1.4s' },
    { id: 4,  x: 310,  y: 80,  r: 11, c: '#D32F2F', dl: '0.4s' },
    { id: 5,  x: 310,  y: 340, r: 7,  c: '#D32F2F', dl: '1.1s' },
    // Mid-left
    { id: 6,  x: 475,  y: 130, r: 7,  c: '#0D47A1', dl: '0.6s' },
    { id: 7,  x: 555,  y: 390, r: 5,  c: '#0D47A1', dl: '1.7s' },
    { id: 8,  x: 625,  y: 65,  r: 5,  c: '#D32F2F', dl: '2s'   },
    // Mid
    { id: 9,  x: 780,  y: 210, r: 9,  c: '#0D47A1', dl: '0.3s' },
    { id: 10, x: 860,  y: 435, r: 5,  c: '#0D47A1', dl: '1.5s' },
    { id: 11, x: 940,  y: 110, r: 7,  c: '#D32F2F', dl: '0.9s' },
    // Right cluster
    { id: 12, x: 1100, y: 200, r: 8,  c: '#0D47A1', dl: '0.2s' },
    { id: 13, x: 1175, y: 430, r: 6,  c: '#D32F2F', dl: '1.3s' },
    { id: 14, x: 1315, y: 115, r: 5,  c: '#0D47A1', dl: '1.8s' },
    { id: 15, x: 1385, y: 315, r: 4,  c: '#0D47A1', dl: '0.7s' },
    // Scattered small
    { id: 16, x: 200,  y: 495, r: 4,  c: '#0D47A1', dl: '2.2s' },
    { id: 17, x: 665,  y: 510, r: 3,  c: '#0D47A1', dl: '1.6s' },
    { id: 18, x: 1010, y: 510, r: 4,  c: '#0D47A1', dl: '2.4s' },
    { id: 19, x: 395,  y: 35,  r: 4,  c: '#0D47A1', dl: '2.6s' },
    { id: 20, x: 1070, y: 38,  r: 3,  c: '#D32F2F', dl: '2.8s' },
  ];

  const edges: [number, number, boolean][] = [
    // N-shape in left cluster
    [1, 2, false], [1, 3, true],  [2, 3, true], [3, 4, false], [4, 5, false],
    // spread out from N
    [5, 7, true],  [4, 6, false], [6, 8, true],
    [7, 9, false], [8, 9, true],
    [9, 11, false], [9, 10, true],  [10, 13, false],
    [11, 12, false], [12, 13, true], [12, 14, false],
    [14, 15, true],  [13, 15, false],
    // ground level
    [2, 16, true], [16, 17, false], [17, 18, true], [18, 13, false],
    // upper connectors
    [1, 19, true], [19, 4, false], [11, 20, true], [20, 14, false],
    // cross links
    [6, 7, true], [10, 12, false],
  ];

  const nm = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      className={className}
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Edges */}
      {edges.map(([a, b, dashed], i) => {
        const na = nm[a], nb = nm[b];
        const dur = `${2.5 + (i % 4) * 0.5}s`;
        return (
          <line key={`e${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={na.c} strokeWidth="1" strokeOpacity="0.14"
            strokeDasharray={dashed ? '5 6' : undefined}>
            {dashed && (
              <animate attributeName="strokeDashoffset" values="0;-22" dur={dur} repeatCount="indefinite" />
            )}
          </line>
        );
      })}

      {/* Nodes */}
      {nodes.map((n) => (
        <g key={`n${n.id}`}>
          {/* Expanding glow ring */}
          <circle cx={n.x} cy={n.y} fill={n.c}>
            <animate attributeName="r" values={`${n.r};${n.r * 3.2}`} dur="3s" begin={n.dl} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.28;0" dur="3s" begin={n.dl} repeatCount="indefinite" />
          </circle>
          {/* Core pulsing dot */}
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} fillOpacity="0.28">
            <animate attributeName="r" values={`${n.r};${n.r * 1.18};${n.r}`} dur="3s" begin={n.dl} repeatCount="indefinite" />
            <animate attributeName="fillOpacity" values="0.28;0.45;0.28" dur="3s" begin={n.dl} repeatCount="indefinite" />
          </circle>
          {/* Bright inner dot */}
          <circle cx={n.x} cy={n.y} r={n.r * 0.38} fill={n.c} fillOpacity="0.65" />
        </g>
      ))}
    </svg>
  );
}

/** Geometric lattice — inspired by Newar torana (temple archway) carved patterns */
export function Lattice({ className, size = 40 }: { className?: string; size?: number }) {
  const s = size;
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="lattice" x="0" y="0" width={s} height={s} patternUnits="userSpaceOnUse">
          <rect width={s} height={s} fill="none" />
          {/* Outer square */}
          <rect x="2" y="2" width={s - 4} height={s - 4} fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Inner rotated square (diamond) */}
          <rect
            x={s / 2 - (s / 2 - 6) * 0.707}
            y={s / 2 - (s / 2 - 6) * 0.707}
            width={(s - 12) * 0.707 * 2}
            height={(s - 12) * 0.707 * 2}
            fill="none" stroke="currentColor" strokeWidth="0.5"
            transform={`rotate(45,${s / 2},${s / 2})`}
          />
          {/* Centre dot */}
          <circle cx={s / 2} cy={s / 2} r="1.2" fill="currentColor" fillOpacity="0.5" />
          {/* Corner dots */}
          <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.4" />
          <circle cx={s - 2} cy="2" r="1" fill="currentColor" fillOpacity="0.4" />
          <circle cx="2" cy={s - 2} r="1" fill="currentColor" fillOpacity="0.4" />
          <circle cx={s - 2} cy={s - 2} r="1" fill="currentColor" fillOpacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lattice)" />
    </svg>
  );
}
