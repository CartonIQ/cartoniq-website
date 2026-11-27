import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiKotlin, SiJetpackcompose, SiAndroid, SiGithub, SiSqlite } from "react-icons/si";
import { FaRobot } from "react-icons/fa";
import "./Portfolio.css";

const EMAIL = "cartoniq.business@gmail.com";
const GH_USER = "CartonIQ";

/* ---------- Pixel art (n navy, d deep, b blue, s sky, p pale, w white) ---------- */
const COLORS = { n: "#1B365D", d: "#0F2342", b: "#005A9C", s: "#60C1E5", p: "#A0E0EF", w: "#FFFFFF", g: "#C9A45C", h: "#E8CF9A" };
const ICON_WAVE = ["....w.....","....w.....","....w.....","..p.w.....","..p.w.p...","..p.w.p...","p.p.w.p...","p.p.w.p.p.","p.p.w.p.p.","p.p.w.p.p."];
const ICON_IMG = ["wwwwwwwwww","wssssssssw","wsssssggsw","wsssssggsw","wssbsssssw","wsbbbssbsw","wbbbbbbbbw","wbbbbbbbbw","wbbbbbbbbw","wwwwwwwwww"];
const ICON_DOC = ["wwwwwwww","wppppppw","wpbbbbpw","wppppppw","wpbbbbpw","wppppppw","wpbbpppw","wppppppw","wppgggpw","wwwwwwww"];

const CITY = [3,5,4,7,5,9,6,4,8,5,11,7,5,6,10,6,4,7,5,8,4,6,9,5,3,6,4,8];
function Skyline() {
  const r = [];
  CITY.forEach((h, i) => {
    const x = i * 6, top = 14 - h;
    r.push(<rect key={`b${i}`} x={x} y={top} width="5" height={h} fill={i % 2 ? COLORS.n : COLORS.b} />);
    for (let wy = top + 1; wy < 13; wy += 2)
      for (let wx = 1; wx < 5; wx += 2) {
        const k = (i * 7 + wy * 3 + wx) % 6;
        if (k < 2) r.push(<rect key={`w${i}-${wy}-${wx}`} x={x + wx} y={wy} width="1" height="1" fill={k ? COLORS.s : COLORS.g} />);
      }
  });
  return (
    <div className="skyline" aria-hidden="true">
      <svg viewBox={`0 0 ${CITY.length * 6} 14`} preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges">{r}</svg>
    </div>
  );
}

const BAND = ["Offline-first", "Zero trackers", "Built on Android", "Premium UI and UX", "Made in New Delhi"];
function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...BAND, ...BAND, ...BAND, ...BAND].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

const ORNAMENT = [
  "gggggggggggggggg", "g..............g", "g.hhhhhhhhhhhhhh", "g.h.............",
  "g.h..h..........", "g.h.hwh.........", "g.h..h..........", "g.h.............",
  "g.h.............", "g.h.............", "g.h.............", "g.h.............",
  "g.h.............", "g.h.............", "g.h.............", "gg..............",
];
const MOON = [
  "...hhhhh....", "..hhh.......", ".hhh........", ".hh.........", "hhh.........", "hhh.........",
  "hhh.........", "hhhh........", "hhhh........", ".hhhh.......", "..hhhhhh....", "...hhhhhhh..",
];
const STARS = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37 + 11) % 97 + 1, y: (i * 53 + 7) % 82 + 4, d: (i % 7) * 0.7, gold: i % 5 === 0,
}));

function Stars() {
  return (
    <div className="stars" aria-hidden="true">
      {STARS.map((s, i) => (
        <i key={i} className={s.gold ? "gold" : ""} style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `-${s.d}s` }} />
      ))}
    </div>
  );
}

function Corners() {
  return (
    <div className="corners" aria-hidden="true">
      {["tl", "tr", "bl", "br"].map((p) => <Pixel key={p} art={ORNAMENT} className={`orn orn-${p}`} />)}
    </div>
  );
}

function Pixel({ art, className = "" }) {
  const w = Math.max(...art.map((r) => r.length));
  const rects = [];
  art.forEach((row, y) =>
    [...row.padEnd(w, ".")].forEach((c, x) => {
      if (COLORS[c]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={COLORS[c]} />);
    })
  );
  return (
    <svg className={`pixel ${className}`} viewBox={`0 0 ${w} ${art.length}`}
      shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      {rects}
    </svg>
  );
}

/* ---------- Content ---------- */
const STATS = [
  { value: "29+", label: "Public repositories" },
  { value: "100%", label: "Offline and privacy-first" },
  { value: "Android", label: "Built entirely on a phone" },
];

const TIMELINE = [
  { year: "2020 to 2025", title: "Owner and Manager, Harsh Packaging", text: "Ran day-to-day operations at a corrugated packaging business in New Delhi." },
  { year: "2025", title: "Found Android development", text: "Picked up a phone and started writing apps with nothing but a terminal." },
  { year: "2026", title: "Founded CartonIQ", text: "Built 29+ apps. SilentSignal launched on the Play Store." },
];

const PLAY_APPS = [
  { name: "SilentSignal", status: "Live", text: "Data over sound, 100% offline.", url: "https://play.google.com/store/apps/details?id=com.cartoniq.silentsignal", shot: "", icon: ICON_WAVE },
  { name: "StealthText", status: "In testing", text: "Hide secrets in photos.", url: "https://play.google.com/store/apps/details?id=com.cartoniq.stealthtext", shot: "", icon: ICON_IMG },
  { name: "PDF Atelier", status: "Coming soon", text: "Premium PDF and AI studio.", url: "", shot: "", icon: ICON_DOC },
];

const TECH = [
  { name: "Kotlin", Icon: SiKotlin },
  { name: "Jetpack Compose", Icon: SiJetpackcompose },
  { name: "Room DB", Icon: SiSqlite },
  { name: "AI Integration", Icon: FaRobot },
  { name: "GitHub", Icon: SiGithub },
  { name: "Android SDK", Icon: SiAndroid },
];

const VALUES = [
  { title: "Offline-first", text: "Every app works without a connection. Your data stays on your device." },
  { title: "Privacy", text: "Zero trackers. Nothing is collected, nothing is sold." },
  { title: "Premium UI and UX", text: "Clear interfaces that feel considered, not crowded." },
  { title: "Reliability", text: "Apps that open fast and behave the same way every time." },
];

/* ---------- Page ---------- */
export default function Portfolio() {
  return (
    <div className="portfolio">
      <Hero />
      <About />
      <Journey />
      <PlayStore />
      <VideoFeature />
      <Works />
      <Stack />
      <Contact />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <>
    <header className="hero" id="top">
      <div className="hero-frame" aria-hidden="true" />
      <Stars />
      <Pixel art={MOON} className="moon" />
      <Corners />

      <motion.div className="hero-inner" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <h1 className="hero-title">Building ideas into reality,<span className="hero-line2">one app at a time.</span></h1>
        <p className="hero-sub">
          Independent Android developer building premium, offline-first apps entirely from a mobile phone.
        </p>
        <div className="build-badge">100% Built on Android</div>
        <div className="hero-ctas">
          <a href="#works" className="btn btn-gold">View my work</a>
          <a href={`mailto:${EMAIL}`} className="btn btn-pale">Contact me</a>
        </div>
        <p className="hero-name">Mohd Arsh, Founder of CartonIQ</p>
      </motion.div>
    </header>
    <Skyline />
    <Marquee />
    </>
  );
}

function About() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let live = true;
    fetch(`https://api.github.com/users/${GH_USER}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (live && d && typeof d.public_repos === "number") setCount(d.public_repos); })
      .catch(() => {});
    return () => { live = false; };
  }, []);
  const stats = STATS.map((s, i) => (i === 0 && count ? { ...s, value: `${count}` } : s));
  return (
    <section className="section about" id="about">
      <div className="wrap">
        <h2 className="h2">The builder</h2>
        <div className="about-grid">
          <div className="about-copy">
            <p>
              I am an entrepreneur and independent Android developer from New Delhi, India. I managed operations at a
              corrugated packaging business before moving into tech.
            </p>
            <p>
              No laptop, no PC, no team. Just a terminal, an idea, and pure grit.
            </p>
            <p>
              My mission is to build practical, premium, offline-first Android applications with clear interfaces.
            </p>
          </div>
          <dl className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="section journey" id="journey">
      <div className="wrap">
        <h2 className="h2">The journey</h2>
        <ol className="timeline">
          {TIMELINE.map((t, i) => (
            <motion.li key={t.year} className="timeline-item"
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
              <span className="timeline-year">{t.year}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PhoneMock({ shot, name, icon }) {
  return (
    <div className="phone-mock">
      <div className="phone-screen">
        {shot ? <img src={shot} alt={`${name} screenshot`} loading="lazy" /> : <>{icon && <Pixel art={icon} className="screen-icon" />}<span>{name}</span></>}
      </div>
    </div>
  );
}

function PlayStore() {
  return (
    <section className="section play" id="play">
      <div className="wrap">
        <h2 className="h2">Live on Google Play</h2>
        <div className="play-grid">
          {PLAY_APPS.map((app) => (
            <article className="play-card" key={app.name}>
              <PhoneMock shot={app.shot} name={app.name} icon={app.icon} />
              <div className="play-body">
                <h3>{app.name}</h3>
                <p className="play-status">{app.status}</p>
                <p>{app.text}</p>
                {app.url ? (
                  <a href={app.url} target="_blank" rel="noreferrer" className="btn btn-navy">Get it on Google Play</a>
                ) : (
                  <span className="btn btn-disabled" aria-disabled="true">Coming soon</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const VIDEO_ID = "1f0x03KvSBI";

function VideoFeature() {
  const [play, setPlay] = useState(false);
  return (
    <section className="section video" id="video">
      <Stars />
      <Corners />
      <div className="wrap video-grid">
        <div className="video-copy">
          <h2 className="h2">See PDF Atelier in action</h2>
          <p>A premium PDF and AI studio, built by CartonIQ. Watch it work before it reaches the Play Store.</p>
          <a className="btn btn-gold" href={`https://youtu.be/${VIDEO_ID}`} target="_blank" rel="noreferrer">Watch on YouTube</a>
        </div>
        <div className="video-frame">
          {play ? (
            <iframe src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="PDF Atelier demo video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          ) : (
            <button className="video-play" onClick={() => setPlay(true)} aria-label="Play the PDF Atelier video">
              <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`} alt="" />
              <span className="play-badge" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

async function fetchReadme(repo) {
  const res = await fetch(`https://api.github.com/repos/${GH_USER}/${repo}/readme`, {
    headers: { Accept: "application/vnd.github.v3.raw" },
  });
  if (res.status === 404) return { state: "empty" };
  if (res.status === 403 || res.status === 429) return { state: "limit" };
  if (!res.ok) return { state: "error" };
  return { state: "ok", text: await res.text() };
}

function Works() {
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(null);
  const [readmes, setReadmes] = useState({});

  useEffect(() => {
    let live = true;
    fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100`)
      .then((r) => {
        if (r.status === 403 || r.status === 429) throw new Error("GitHub is limiting requests from this connection. Try again in an hour, or open the projects on GitHub.");
        if (!r.ok) throw new Error("Projects could not be loaded. Check your connection and refresh.");
        return r.json();
      })
      .then((d) => live && setRepos(d))
      .catch((e) => live && setError(e.message));
    return () => { live = false; };
  }, []);

  const toggle = async (name) => {
    if (open === name) return setOpen(null);
    setOpen(name);
    if (readmes[name]) return;
    setReadmes((m) => ({ ...m, [name]: { state: "loading" } }));
    try {
      const r = await fetchReadme(name);
      setReadmes((m) => ({ ...m, [name]: r }));
    } catch {
      setReadmes((m) => ({ ...m, [name]: { state: "error" } }));
    }
  };

  const message = (r) => ({
    loading: "Loading README.",
    empty: "This project has no README yet.",
    limit: "GitHub rate limit reached. Open the repository to read it there.",
    error: "The README could not be loaded.",
  }[r.state]);

  return (
    <section className="section works" id="works">
      <div className="wrap">
        <h2 className="h2">The works</h2>
        {error && <p className="notice" role="alert">{error}</p>}
        {!repos && !error && <p className="notice">Loading projects.</p>}
        <div className="repo-grid">
          {repos && repos.map((repo) => {
            const isOpen = open === repo.name;
            const r = readmes[repo.name];
            return (
              <article key={repo.id} className={`repo-card ${isOpen ? "is-open" : ""}`}>
                <button className="repo-head" onClick={() => toggle(repo.name)}
                  aria-expanded={isOpen} aria-controls={`readme-${repo.id}`}>
                  <span className="repo-name">{repo.name}</span>
                  <span className="repo-desc">{repo.description || "No description provided."}</span>
                  <span className="repo-meta">
                    <span className="repo-facts">
                      {repo.language && <span>{repo.language}</span>}
                      {repo.pushed_at && <span>Updated {new Date(repo.pushed_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>}
                    </span>
                    <span className="repo-toggle">{isOpen ? "Close README" : "Read README"}</span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`readme-${repo.id}`} className="repo-body"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="readme">
                        {r?.state === "ok" ? (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}
                            components={{ a: (p) => <a {...p} target="_blank" rel="noreferrer" /> }}>
                            {r.text}
                          </ReactMarkdown>
                        ) : (
                          <p>{r ? message(r) : ""}</p>
                        )}
                        <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn btn-navy btn-small">
                          Open on GitHub
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="section stack" id="stack">
      <div className="wrap">
        <h2 className="h2">Tech stack</h2>
        <ul className="tech-list">
          {TECH.map(({ name, Icon }) => (
            <li className="tech" key={name}><Icon aria-hidden="true" /><span>{name}</span></li>
          ))}
        </ul>
        <h2 className="h2 values-title">Core values</h2>
        <div className="values">
          {VALUES.map((v) => (
            <div className="value" key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\nFrom: ${form.name} (${form.email})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Message from " + form.name)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="section contact" id="contact">
      <Stars />
      <Corners />
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <h2 className="h2">Let us build something together.</h2>
          <p className="contact-lead">
            Have an idea, a project or a question? Write to me and I will reply personally.
          </p>
          <ul className="contact-links">
            <li><a className="contact-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer">github.com/{GH_USER}</a></li>
            <li>New Delhi, India</li>
          </ul>
        </div>
        <form className="contact-form contact-card" onSubmit={submit}>
          <label>Name<input required value={form.name} onChange={set("name")} autoComplete="name" /></label>
          <label>Email<input required type="email" value={form.email} onChange={set("email")} autoComplete="email" /></label>
          <label>Message<textarea required rows="5" value={form.message} onChange={set("message")} /></label>
          <button type="submit" className="btn btn-gold">Send message</button>
          {sent && <p className="notice" role="status">Your email app should open with the message ready to send.</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Corners />
      <p className="footer-mark" aria-hidden="true">CartonIQ</p>
      <nav className="footer-links" aria-label="Footer">
        <a href={`mailto:${EMAIL}`}>Email</a>
        <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://cartoniq.com" target="_blank" rel="noreferrer">Website</a>
      </nav>
      <p>Built with curiosity by Mohd Arsh.</p>
    </footer>
  );
}
