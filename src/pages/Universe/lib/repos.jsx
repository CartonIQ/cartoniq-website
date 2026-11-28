import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loadRepos } from "./github.js";
import { SITE } from "../data/content.js";

const Ctx = createContext(null);
export const useRepos = () => useContext(Ctx);

// One GitHub request for the whole page; the Laboratory and the Archive share it.
export function ReposProvider({ children }) {
  const [state, setState] = useState({ status: "loading", repos: [], error: null, stale: false, fetchedAt: 0, resetAt: null });

  const load = useCallback((force = false) => {
    const ac = new AbortController();
    setState((s) => ({ ...s, status: "loading", error: null }));
    loadRepos(SITE.ghUser, { force, signal: ac.signal })
      .then((r) => setState({ status: "ready", repos: r.repos, error: null, stale: r.stale, fetchedAt: r.fetchedAt, resetAt: r.resetAt || null, reason: r.reason }))
      .catch((e) => { if (e.name !== "AbortError") setState({ status: "error", repos: [], error: e, stale: false, fetchedAt: 0, resetAt: e.resetAt || null }); });
    return () => ac.abort();
  }, []);

  useEffect(() => load(false), [load]);
  const value = useMemo(() => ({ ...state, reload: () => load(true) }), [state, load]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
