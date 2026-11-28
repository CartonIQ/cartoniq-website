import { GLYPHS } from "../data/content.js";

// Colours for the pixel glyphs carried over from the original site.
const PIX = { w: "#eee9df", p: "#a39d90", s: "#4b4944", b: "#2a2a2d", g: "#e4311f", n: "#151517", d: "#0b0b0c" };

export function Pixel({ name, className = "" }) {
  const art = GLYPHS[name];
  const w = Math.max(...art.map((r) => r.length));
  const rects = [];
  art.forEach((row, y) =>
    [...row.padEnd(w, ".")].forEach((c, x) => {
      if (PIX[c]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.03" height="1.03" fill={PIX[c]} />);
    })
  );
  return (
    <svg className={`pixel ${className}`} viewBox={`0 0 ${w} ${art.length}`} shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      {rects}
    </svg>
  );
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// A small symmetric mark generated from a repository name. Decorative only.
export function Identicon({ name, className = "" }) {
  let h = hash(name);
  const cells = [];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 3; x++) {
      h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
      if (h % 100 < 52) {
        cells.push([x, y]);
        if (x < 2) cells.push([4 - x, y]);
      }
    }
  }
  const accent = hash(name + "x") % 4 === 0;
  return (
    <svg className={`identicon ${className}`} viewBox="0 0 5 5" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      {cells.map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="1.02" height="1.02" fill={accent && x === 2 ? "#e4311f" : "currentColor"} />)}
    </svg>
  );
}

// Illustration of the phone coming apart, used when WebGL is unavailable.
export function PhoneFallback() {
  const layer = (x, y, fill, stroke, extra) => (
    <g transform={`translate(${x} ${y}) skewY(-12)`}>
      <rect width="120" height="250" rx="22" fill={fill} stroke={stroke} strokeWidth="2" />
      {extra}
    </g>
  );
  return (
    <svg className="box-fallback" viewBox="0 0 400 400" role="img" aria-label="Illustration of an Android phone taken apart into layers">
      <ellipse cx="200" cy="360" rx="150" ry="20" fill="rgba(228,49,31,.12)" />
      {layer(70, 78, "#101012", "#3a3b3f", <rect x="14" y="12" width="92" height="30" rx="8" fill="#3a3b3f" />)}
      {layer(112, 82, "#7c828c", "#9aa0aa", <rect x="22" y="150" width="76" height="60" rx="10" fill="#c8210f" opacity=".8" />)}
      {layer(154, 86, "#1a1d22", "#c9a24a", <rect x="38" y="40" width="44" height="44" fill="#c9a24a" />)}
      {layer(196, 90, "#3a3b3f", "#8a8d93", <rect x="12" y="12" width="96" height="226" rx="14" fill="#050506" />)}
      {layer(238, 94, "#0b0b0c", "#e4311f", (
        <g fill="none" stroke="#e4311f" strokeWidth="3">
          <circle cx="60" cy="150" r="14" /><circle cx="60" cy="150" r="32" opacity=".7" /><circle cx="60" cy="150" r="52" opacity=".4" />
        </g>
      ))}
    </svg>
  );
}
