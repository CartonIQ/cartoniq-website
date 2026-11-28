import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export function useMedia(query) {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia(query); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia(query).matches,
    () => false
  );
}
export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");

// Adds the class "in" to an element once it scrolls into view.
export function useReveal() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced || !("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return ref;
}

// Scroll progress (0 to 1) through a tall element, written to a CSS variable.
export function useScrollVar(ref, varName, onValue) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      el.style.setProperty(varName, p.toFixed(4));
      if (onValue) onValue(p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [ref, varName, onValue]);
}

export function useCopy() {
  const [done, setDone] = useState(false);
  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const t = document.createElement("textarea");
      t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      t.remove();
      if (!ok) return false;
    }
    setDone(true); setTimeout(() => setDone(false), 2200);
    return true;
  };
  return [done, copy];
}
