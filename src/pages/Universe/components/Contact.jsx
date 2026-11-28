import { useRef, useState } from "react";
import { SITE } from "../data/content.js";
import { useCopy, useReveal } from "../lib/hooks.js";
import { Wordmark } from "./Nav.jsx";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | opened | copied | copyfail
  const [copied, copy] = useCopy();
  const [mailCopied, copyMail] = useCopy();
  const head = useReveal();
  const body = useReveal();
  const formRef = useRef(null);

  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); if (status !== "idle") setStatus("idle"); };
  const subject = `Message from ${form.name || "the CartonIQ website"}`;
  const text = `${form.message}\n\n${form.name} (${form.email})`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

  const submit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    setStatus("opened");
  };
  const doCopy = async () => {
    if (!formRef.current.reportValidity()) return;
    const ok = await copy(`To: ${SITE.email}\nSubject: ${subject}\n\n${text}`);
    setStatus(ok ? "copied" : "copyfail");
  };

  return (
    <section className="sec sec-red" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <header className="sec-head rv" ref={head}>
          <p className="sec-tag mono">08 / Contact</p>
          <h2 id="contact-title" className="h2 h2-xl">Let&rsquo;s build something useful.</h2>
        </header>

        <div className="contact-grid rv" ref={body}>
          <div className="contact-side">
            <p className="lede">Have an idea, a project or a question? Write to me and I will reply personally.</p>
            <p className="contact-mail">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
            <p className="contact-actions">
              <button type="button" className="btn btn-ink btn-sm" onClick={() => copyMail(SITE.email)}>{mailCopied ? "Address copied" : "Copy address"}</button>
              <a className="btn btn-ink btn-sm" href={`https://github.com/${SITE.ghUser}`} target="_blank" rel="noopener noreferrer">GitHub →</a>
            </p>
            <p className="mono contact-city">{SITE.city}</p>
          </div>

          <form className="form" ref={formRef} onSubmit={submit} noValidate={false}>
            <label>Name<input required value={form.name} onChange={set("name")} autoComplete="name" /></label>
            <label>Email<input required type="email" value={form.email} onChange={set("email")} autoComplete="email" /></label>
            <label>Message<textarea required rows="5" value={form.message} onChange={set("message")} /></label>
            <div className="form-actions">
              <button type="submit" className="btn btn-ink">Open in my email app</button>
              <button type="button" className="btn btn-ghost" onClick={doCopy}>{copied ? "Copied" : "Copy message"}</button>
              <a className="btn btn-ghost" href={gmail} target="_blank" rel="noopener noreferrer" onClick={(e) => { if (!formRef.current.reportValidity()) e.preventDefault(); else setStatus("opened"); }}>Compose in Gmail</a>
            </div>
            <p className="form-note" role="status" aria-live="polite">
              {status === "idle" && "This form does not send anything by itself. It prepares an email for you to send from your own mail app."}
              {status === "opened" && "Your email is prepared. Nothing has been sent yet. Press send in your mail app. If nothing opened, copy the message or use Gmail."}
              {status === "copied" && `Copied. Paste it into an email to ${SITE.email}.`}
              {status === "copyfail" && `Copying was blocked by this browser. Please write to ${SITE.email} directly.`}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="neo-footer" id="end">
      <div className="neo-footer-art" aria-hidden="true" />
      <div className="neo-footer-inner">
        <div className="neo-footer-cta">
          <p className="neo-kicker mono"><i /> CartonIQ Universe / 09 — The next chapter</p>
          <h2>THE NEXT IDEA.<br/><em>BUILT TOGETHER.</em></h2>
          <p>Have a meaningful project in mind? Let’s make it real.</p>
        </div>
        <a className="neo-pill neo-pill-hot neo-footer-button" href="#contact">Start a conversation <b>↗</b></a>
        <div className="neo-footer-bottom">
          <a className="neo-footer-brand" href="#top" aria-label="CartonIQ, back to top"><Wordmark /></a>
          <span className="neo-footer-copy">© {new Date().getFullYear()} CartonIQ. Independent by nature. Built with purpose.</span>
          <nav aria-label="Footer links">
            <a href="https://github.com/CartonIQ" target="_blank" rel="noopener noreferrer">GitHub <b>↗</b></a>
            <a href={`mailto:${SITE.email}`}>Email <b>↗</b></a>
            <a href="#top">Back to top <b>↑</b></a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
