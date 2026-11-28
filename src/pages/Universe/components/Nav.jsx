import { useEffect, useRef, useState } from "react";

const LINKS = [
  { id: "top", label: "Home" }, { id: "products", label: "Apps" },
  { id: "philosophy", label: "Universe" }, { id: "founder", label: "About" },
  { id: "lab", label: "Lab" }, { id: "contact", label: "Contact" },
];

export function Wordmark({ className = "" }) {
  return <span className={`neo-wordmark ${className}`} aria-label="CartonIQ"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2 24 15 38 20 24 24 20 38 16 24 2 20 16 15Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M20 10v20M10 20h20" stroke="#f0183e" strokeWidth="1.5"/></svg><span>Carton<span>IQ</span></span></span>;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const btnRef = useRef(null);
  useEffect(() => {
    const nodes = LINKS.map(x => document.getElementById(x.id)).filter(Boolean);
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-42% 0px -50% 0px" });
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const key = e => { if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); } };
    window.addEventListener("keydown", key);
    return () => { document.documentElement.classList.remove("menu-open"); window.removeEventListener("keydown", key); };
  }, [open]);
  return <>
    <a className="skip" href="#products">Skip to content</a>
    <header className="neo-header">
      <a className="neo-brand" href="#top"><Wordmark/><span className="neo-brand-sub mono">UNIVERSE</span></a>
      <nav className="neo-nav" aria-label="Main navigation">{LINKS.map(x => <a key={x.id} href={`#${x.id}`} className={active === x.id ? "active" : ""}>{x.label}</a>)}</nav>
      <a className="neo-explore" href="#products">Explore <span>↗</span></a>
      <button ref={btnRef} className="neo-menu-btn" aria-expanded={open} aria-controls="neo-mobile-menu" onClick={() => setOpen(v => !v)}>{open ? "CLOSE ×" : "☰ MENU"}</button>
    </header>
    <div id="neo-mobile-menu" className="neo-mobile-menu" hidden={!open}>
      {LINKS.map((x,i) => <a key={x.id} href={`#${x.id}`} onClick={() => setOpen(false)}><small>0{i+1}</small>{x.label}<span>↗</span></a>)}
    </div>
  </>;
}

export function Cursor() { return null; }
