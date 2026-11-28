import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRepos } from "../lib/repos.jsx";
import { loadReadme, resetLabel, timeAgo } from "../lib/github.js";
import { useReveal } from "../lib/hooks.js";
import { SITE } from "../data/content.js";
import { Identicon } from "./Glyphs.jsx";

const Markdown = lazy(() => import("./Markdown.jsx"));

const openRepo = (repo) => window.dispatchEvent(new CustomEvent("cq:open-repo", { detail: repo }));

function Notice({ repos }) {
  const { status, error, stale, reason, resetAt, fetchedAt, reload } = repos;
  if (status === "loading") return <p className="notice" role="status">Reading the archive from GitHub&hellip;</p>;
  if (status === "error") {
    const msg = error?.kind === "limit"
      ? `GitHub is limiting requests from this connection. It should reset ${resetLabel(resetAt)}.`
      : "The archive could not be loaded right now. Check your connection and try again.";
    return (
      <div className="notice notice-error" role="alert">
        <p>{msg}</p>
        <p className="notice-actions">
          <button className="btn btn-line btn-sm" onClick={reload}>Try again</button>
          <a className="btn btn-line btn-sm" href={`https://github.com/${SITE.ghUser}`} target="_blank" rel="noopener noreferrer">Open GitHub instead</a>
        </p>
      </div>
    );
  }
  if (stale) {
    return (
      <p className="notice" role="status">
        {reason === "limit" ? `GitHub is limiting requests (reset ${resetLabel(resetAt)}).` : "GitHub could not be reached."}{" "}
        Showing the list saved {timeAgo(new Date(fetchedAt).toISOString())}.{" "}
        <button className="link-btn" onClick={reload}>Try again</button>
      </p>
    );
  }
  return null;
}

/* ------------------------------ 05 Laboratory ------------------------------ */
export function Lab() {
  const repos = useRepos();
  const ref = useReveal();
  const bench = useMemo(() => repos.repos.filter((r) => !r.fork).slice(0, 6), [repos.repos]);

  return (
    <section className="sec sec-light" id="lab" aria-labelledby="lab-title">
      <div className="wrap">
        <header className="sec-head rv" ref={ref}>
          <p className="sec-tag mono">05 / Laboratory</p>
          <h2 id="lab-title" className="h2">On the bench.</h2>
          <p className="lede">
            Experiments are kept in public. This is a live view of the repositories touched most recently.
            Some are products, some are unfinished tests, and none of them should be read as a release.
          </p>
        </header>

        <Notice repos={repos} />

        {repos.status === "loading" && (
          <ul className="bench" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <li key={i} className="bench-item skeleton" />)}</ul>
        )}
        {repos.status === "ready" && bench.length === 0 && <p className="notice">No public repositories to show yet.</p>}
        {bench.length > 0 && (
          <ul className="bench">
            {bench.map((r, i) => (
              <li key={r.id}>
                <button className="bench-item" onClick={() => openRepo(r)}>
                  <Identicon name={r.name} className="bench-mark" />
                  <span className="bench-n mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="bench-name">{r.name}</span>
                  <span className="bench-desc">{r.description || "No description yet."}</span>
                  <span className="bench-meta mono">
                    <span>{r.language || "Mixed"}</span>
                    <span>Updated {timeAgo(r.pushed_at)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ------------------------------ 06 Archive ------------------------------ */
const PAGE = 20;

export function Archive() {
  const repos = useRepos();
  const ref = useReveal();
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("All");
  const [sort, setSort] = useState("updated");
  const [forks, setForks] = useState(true);
  const [shown, setShown] = useState(PAGE);

  const languages = useMemo(() => {
    const c = {};
    repos.repos.forEach((r) => { if (r.language) c[r.language] = (c[r.language] || 0) + 1; });
    return Object.entries(c).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, v]);
  }, [repos.repos]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = repos.repos.filter((r) =>
      (forks || !r.fork) &&
      (lang === "All" || r.language === lang) &&
      (!needle || r.name.toLowerCase().includes(needle) || (r.description || "").toLowerCase().includes(needle)));
    out = [...out].sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : new Date(b.pushed_at) - new Date(a.pushed_at));
    return out;
  }, [repos.repos, q, lang, sort, forks]);

  useEffect(() => setShown(PAGE), [q, lang, sort, forks]);

  return (
    <section className="sec sec-dark" id="archive" aria-labelledby="archive-title">
      <div className="wrap">
        <header className="sec-head rv" ref={ref}>
          <p className="sec-tag mono">06 / Archive</p>
          <h2 id="archive-title" className="h2">Every public repository.</h2>
          <p className="lede">
            {repos.status === "ready" ? `${repos.repos.length} public repositories under ${SITE.ghUser}. ` : ""}
            Open any entry to read its README here, exactly as it is written on GitHub.
          </p>
        </header>

        <Notice repos={repos} />

        {repos.repos.length > 0 && (
          <>
            <div className="controls">
              <label className="field-inline">
                <span className="mono">Search</span>
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or description" autoComplete="off" />
              </label>
              <label className="field-inline">
                <span className="mono">Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="updated">Recently updated</option>
                  <option value="name">Name</option>
                </select>
              </label>
              <label className="check">
                <input type="checkbox" checked={forks} onChange={(e) => setForks(e.target.checked)} />
                <span className="mono">Include forks</span>
              </label>
            </div>

            <div className="chips" role="group" aria-label="Filter by language">
              {[["All", repos.repos.length], ...languages].map(([k, n]) => (
                <button key={k} className="chip mono" aria-pressed={lang === k} onClick={() => setLang(k)}>{k}<i>{n}</i></button>
              ))}
            </div>

            <p className="count mono" role="status">{list.length} of {repos.repos.length} shown</p>

            {list.length === 0 ? (
              <p className="notice">Nothing matches that search. Clear a filter and try again.</p>
            ) : (
              <ol className="index">
                {list.slice(0, shown).map((r, i) => (
                  <li key={r.id}>
                    <button className="index-row" onClick={() => openRepo(r)}>
                      <span className="index-n mono">{String(i + 1).padStart(3, "0")}</span>
                      <Identicon name={r.name} className="index-mark" />
                      <span className="index-main">
                        <span className="index-name">{r.name}{r.fork && <em className="tag mono">fork</em>}{r.archived && <em className="tag mono">archived</em>}</span>
                        <span className="index-desc">{r.description || "No description yet."}</span>
                      </span>
                      <span className="index-meta mono">
                        <span>{r.language || "Mixed"}</span>
                        <span>{timeAgo(r.pushed_at)}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            )}
            {list.length > shown && (
              <p className="more"><button className="btn btn-line" onClick={() => setShown((s) => s + PAGE)}>Show {Math.min(PAGE, list.length - shown)} more</button></p>
            )}
          </>
        )}
        <p className="archive-foot mono"><a href={`https://github.com/${SITE.ghUser}`} target="_blank" rel="noopener noreferrer">github.com/{SITE.ghUser} →</a></p>
      </div>
      <ReadmeDialog />
    </section>
  );
}

/* ------------------------------ README dialog ------------------------------ */
function ReadmeDialog() {
  const dlg = useRef(null);
  const [repo, setRepo] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const h = (e) => { setRepo(e.detail); };
    window.addEventListener("cq:open-repo", h);
    return () => window.removeEventListener("cq:open-repo", h);
  }, []);

  useEffect(() => {
    const d = dlg.current;
    if (!repo) return;
    setData(null);
    if (!d.open) { d.showModal(); document.documentElement.classList.add("dialog-open"); }
    const ac = new AbortController();
    loadReadme(SITE.ghUser, repo.name, { signal: ac.signal }).then(setData).catch(() => {});
    return () => ac.abort();
  }, [repo]);

  const close = () => { dlg.current?.close(); };
  const onClose = () => { document.documentElement.classList.remove("dialog-open"); setRepo(null); };
  const onBackdrop = (e) => { if (e.target === dlg.current) close(); };

  const message = !data ? "Loading README…" :
    data.state === "empty" ? "This project has no README yet." :
    data.state === "limit" ? `GitHub is limiting requests. It should reset ${resetLabel(data.resetAt)}. You can read the README on GitHub meanwhile.` :
    data.state === "error" ? "The README could not be loaded right now." : null;

  return (
    <dialog ref={dlg} className="readme-dialog" aria-labelledby="readme-title" onClose={onClose} onClick={onBackdrop}>
      {repo && (
        <div className="readme-box">
          <header className="readme-head">
            <div>
              <p className="mono readme-meta">{repo.language || "Mixed"} &middot; Updated {timeAgo(repo.pushed_at)}</p>
              <h3 id="readme-title">{repo.name}</h3>
              {repo.description && <p className="readme-desc">{repo.description}</p>}
            </div>
            <button className="btn btn-line btn-sm" onClick={close} aria-label="Close README">Close</button>
          </header>
          <div className="readme-body">
            {message ? <p className="notice" role="status">{message}</p> : (
              <Suspense fallback={<p className="notice" role="status">Loading README…</p>}>
                <Markdown text={data.text} repo={repo} />
                {data.truncated && <p className="notice">This README is long, so only the first part is shown here.</p>}
              </Suspense>
            )}
          </div>
          <footer className="readme-foot">
            <a className="btn btn-red btn-sm" href={repo.html_url} target="_blank" rel="noopener noreferrer">Open on GitHub →</a>
          </footer>
        </div>
      )}
    </dialog>
  );
}
