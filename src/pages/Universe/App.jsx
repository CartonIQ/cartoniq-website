import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/sections.css";
import "./styles/cinematic.css";
import "./styles/universe-final.css";
import { useEffect, useRef } from "react";
import Nav, { Cursor } from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import { Philosophy, Founder, Products, Technology } from "./components/Sections.jsx";
import { Lab, Archive } from "./components/Archive.jsx";
import { Contact, Footer } from "./components/Contact.jsx";
import { ReposProvider, useRepos } from "./lib/repos.jsx";

// Direct links such as /#contact. The target is created after the first
// render, and page height changes once GitHub data arrives (skeletons become
// real content), so scroll to the target again when that settles, but only if
// the visitor has not started scrolling themselves.
function HashScroll() {
  const { status } = useRepos();
  const touched = useRef(false);
  useEffect(() => {
    const mark = () => { touched.current = true; };
    const evs = ["wheel", "touchmove", "keydown", "pointerdown"];
    evs.forEach((e) => window.addEventListener(e, mark, { passive: true, once: true }));
    return () => evs.forEach((e) => window.removeEventListener(e, mark));
  }, []);
  useEffect(() => {
    if (status === "loading" || touched.current) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = setTimeout(() => { if (!touched.current) document.getElementById(id)?.scrollIntoView({ behavior: "instant" }); }, 80);
    return () => clearTimeout(t);
  }, [status]);
  return null;
}

export default function App() {
  return (
    <ReposProvider>
      <HashScroll />
      <Nav />
      <Cursor />
      <main id="main">
        <Hero />
        <Products />
        <Philosophy />
        <Founder />
        <Lab />
        <Archive />
        <Technology />
        <Contact />
      </main>
      <Footer />
    </ReposProvider>
  );
}
