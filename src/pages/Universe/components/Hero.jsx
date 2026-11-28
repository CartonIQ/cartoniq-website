import { SITE } from "../data/content.js";

export default function Hero() {
  return (
    <section className="neo-hero" id="top" aria-labelledby="hero-title">
      <img className="neo-hero-art" src="/images/hero-guardian.webp" alt="Black chrome cybernetic guardian with crimson illuminated details" fetchPriority="high" />
      <div className="neo-hero-shade" aria-hidden="true" />
      <div className="neo-hero-meta mono"><span>Independent digital studio</span><span>{SITE.city} &nbsp;·&nbsp; Est. 2026</span></div>
      <div className="neo-hero-copy">
        <p className="neo-kicker mono"><i /> CartonIQ Universe</p>
        <h1 id="hero-title">WE BUILD<br/>WHAT’S<br/><em>NEXT.</em></h1>
        <p className="neo-hero-sub">Independent thinking. Extraordinary software.<br className="desktop-only"/> Thoughtful technology.</p>
        <div className="neo-hero-actions">
          <a className="neo-pill neo-pill-hot" href="#products"><span className="neo-play">▶</span> Explore Our Universe <b>↗</b></a>
          <a className="neo-quiet-link" href="#founder">About CartonIQ <span>⊕</span></a>
        </div>
      </div>
      <div className="neo-coordinate mono">28.6139° N<br/>77.2090° E</div>
      <div className="neo-vertical mono">CARTONIQ / BEYOND THE ORDINARY</div>
      <a className="neo-scroll mono" href="#products"><span>↓</span> Scroll to explore</a>
      <div className="neo-hero-index mono"><b>01</b><span>02</span><span>03</span></div>
    </section>
  );
}
