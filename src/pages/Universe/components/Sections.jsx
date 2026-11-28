import { useState } from "react";
import { PRODUCTS, SITE, TECH } from "../data/content.js";
import { useReveal } from "../lib/hooks.js";

function Rv({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useReveal();
  return <Tag ref={ref} className={`rv ${className}`} style={{ "--d": `${delay}ms` }} {...rest}>{children}</Tag>;
}

/* ------------------------------ Universe / Philosophy ------------------------------ */
export function Philosophy() {
  return (
    <section className="neo-philosophy" id="philosophy" aria-labelledby="phil-title">
      <div className="neo-statue-wrap"><img src="/images/philosophy-statue.webp" alt="Cracked classical stone sculpture illuminated by crimson light" loading="lazy"/><span className="neo-orbit neo-orbit-one"/><span className="neo-orbit neo-orbit-two"/></div>
      <div className="neo-philosophy-copy">
        <p className="neo-kicker mono">Our philosophy <i/></p>
        <h2 id="phil-title">Less Noise.<br/><em>More Meaning.</em></h2>
        <p>Technology should solve real problems, respect privacy and work reliably.</p>
        <div className="neo-values"><span>♧ &nbsp;Offline-first</span><span>◇ &nbsp;Privacy First</span><span>ϟ &nbsp;Built to Last</span></div>
        <small className="neo-footnote">Built around practical tools, clear interfaces and thoughtful privacy.</small>
      </div>
      <aside className="neo-founder-quote"><span className="neo-quote-mark">“</span><p>CartonIQ is an independent digital studio, built by a solo developer with a big vision — to create powerful, beautiful and useful software for everyone.</p><div className="neo-signature">Mohd Arsh</div><small>Founder &amp; Developer</small></aside>
    </section>
  );
}

/* ------------------------------ Founder ------------------------------ */
export function Founder() {
  return (
    <section className="neo-founder-strip" id="founder" aria-labelledby="founder-title">
      <div className="neo-founder-heading"><p className="neo-kicker mono">The person behind the pixels</p><h2 id="founder-title">One device.<br/><em>A thousand ideas.</em></h2></div>
      <div className="neo-founder-story">
        <p>CartonIQ is built independently by Mohd Arsh in New Delhi, India. No PC, no team, no office—just an Android phone, Termux, and pure grit.</p>
        <p>Before transitioning to tech, I managed operations at <strong>Harsh Packaging</strong> (2020–2025), mastering the corrugated packaging industry. That hands-on business experience now fuels my approach to building practical, robust software.</p>
        <p>Today, I build premium, offline-first Android applications. Everything is crafted with curiosity, persistence, and a belief that useful technology should feel effortless.</p><a href="https://github.com/CartonIQ" target="_blank" rel="noopener noreferrer" className="neo-text-arrow">Explore the work on GitHub ↗</a></div>
    </section>
  );
}

/* ------------------------------ Products ------------------------------ */
function VideoFacade() {
  const [play, setPlay] = useState(false);
  return (
    <div className="neo-video-block">
      <div><p className="neo-kicker mono">A closer look / 003</p><h3>PDF Atelier,<br/>in motion.</h3><p>A short product demo. The video loads from YouTube only when you choose to play it.</p><a className="neo-text-arrow" href={`https://youtu.be/${SITE.videoId}`} target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a></div>
      <div className="neo-video-frame">{play ? <iframe src={`https://www.youtube-nocookie.com/embed/${SITE.videoId}?autoplay=1&rel=0`} title="PDF Atelier demo video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/> : <button className="neo-video-play" onClick={() => setPlay(true)} aria-label="Play PDF Atelier demo"><img src="/images/pdfatelier-card.svg" alt=""/><span>▶</span><small className="mono">PLAY PRODUCT FILM</small></button>}</div>
    </div>
  );
}

export function Products() {
  return (
    <section className="neo-products" id="products" aria-labelledby="prod-title">
      <div className="neo-products-intro"><p className="neo-kicker mono">Our apps <i/></p><h2 id="prod-title">Powerful Apps.<br/>Built with <em>Passion.</em></h2><p>A growing collection of innovative Android applications for a smarter, more private and productive life.</p><a href="#archive" className="neo-pill">View All Apps <b>↗</b></a></div>
      <div className="neo-product-cards">
        {PRODUCTS.map((p,i) => <article className={`neo-product-card neo-card-${p.id}`} key={p.id}>
          <div className="neo-card-art"><img src={p.id === "silentsignal" ? "/images/silentsignal-card.svg" : p.id === "stealthtext" ? "/images/stealthtext-card.svg" : "/images/pdfatelier-card.svg"} alt="" loading="lazy"/><span className="neo-card-no mono">0{i+1}</span><span className="neo-card-symbol" aria-hidden="true">{p.id === "silentsignal" ? "∿" : p.id === "stealthtext" ? "⌑" : "▤"}</span></div>
          <div className="neo-card-copy"><div className={`neo-status status-${p.status}`}><i/>{p.statusLabel}</div><h3>{p.name}</h3><p className="neo-card-line">{p.line}</p><p className="neo-card-desc">{p.purpose}</p><a className="neo-card-arrow" href={p.url || "#contact"} target={p.url ? "_blank" : undefined} rel={p.url ? "noopener noreferrer" : undefined} aria-label={`${p.url ? "Open" : "Ask about"} ${p.name}`}>↗</a></div>
        </article>)}
      </div>
      <VideoFacade />
    </section>
  );
}

/* ------------------------------ 07 Technology ------------------------------ */
export function Technology() {
  const [i, setI] = useState(0);
  const cur = TECH[i];
  return (
    <section className="sec sec-dark" id="technology" aria-labelledby="tech-title">
      <div className="wrap">
        <Rv as="header" className="sec-head">
          <p className="sec-tag mono">07 / Technology</p>
          <h2 id="tech-title" className="h2">Why this stack.</h2>
          <p className="lede">Not a wall of logos. Each tool is here for a reason, and this is the reason.</p>
        </Rv>
        <Rv className="tech">
          <div className="tech-list" role="group" aria-label="Technologies">
            {TECH.map((t, k) => (
              <button key={t.t} className="tech-btn" aria-pressed={i === k} aria-controls="tech-panel" onClick={() => setI(k)}>
                <span className="mono">{String(k + 1).padStart(2, "0")}</span>{t.t}
              </button>
            ))}
          </div>
          <div id="tech-panel" className="tech-panel" aria-live="polite">
            <h3 className="tech-title">{cur.t}</h3>
            <p>{cur.d}</p>
          </div>
        </Rv>
      </div>
    </section>
  );
}
