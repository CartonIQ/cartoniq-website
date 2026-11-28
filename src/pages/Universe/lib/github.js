// GitHub access for the project archive. No token, no secrets: only public,
// unauthenticated endpoints. Results are cached in localStorage and the list is
// revalidated with an ETag (a 304 reply does not use up GitHub's rate limit).

const API = "https://api.github.com";
const REPO_TTL = 30 * 60 * 1000;       // 30 minutes
const README_TTL = 6 * 60 * 60 * 1000; // 6 hours
const MAX_README = 80000;              // characters, keeps the dialog responsive

export function readJSON(key) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
}
export function writeJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

export class GhError extends Error {
  constructor(kind, message, resetAt) { super(message); this.kind = kind; this.resetAt = resetAt || null; }
}

function limitedFrom(res) {
  const reset = Number(res.headers.get("x-ratelimit-reset"));
  return reset ? reset * 1000 : null;
}

const slim = (r) => ({
  id: r.id, name: r.name, description: r.description, language: r.language,
  pushed_at: r.pushed_at, html_url: r.html_url, fork: r.fork, archived: r.archived,
});

export async function loadRepos(user, { force = false, signal } = {}) {
  const key = `cq:repos:v2:${user}`;
  const cached = readJSON(key);
  const fresh = cached && Date.now() - cached.t < REPO_TTL;
  if (fresh && !force) return { repos: cached.repos, fetchedAt: cached.t, stale: false };

  try {
    const all = [];
    let etag = null;
    for (let page = 1; page <= 5; page++) {
      const headers = { Accept: "application/vnd.github+json" };
      if (page === 1 && cached?.etag) headers["If-None-Match"] = cached.etag;
      const res = await fetch(`${API}/users/${user}/repos?sort=pushed&per_page=100&page=${page}`, { headers, signal });
      if (res.status === 304 && cached) {
        writeJSON(key, { ...cached, t: Date.now() });
        return { repos: cached.repos, fetchedAt: Date.now(), stale: false };
      }
      if (res.status === 403 || res.status === 429) throw new GhError("limit", "GitHub is limiting requests from this connection.", limitedFrom(res));
      if (!res.ok) throw new GhError("http", `GitHub answered with status ${res.status}.`);
      if (page === 1) etag = res.headers.get("etag");
      const data = await res.json();
      all.push(...data.map(slim));
      if (data.length < 100) break;
    }
    writeJSON(key, { t: Date.now(), etag, repos: all });
    return { repos: all, fetchedAt: Date.now(), stale: false };
  } catch (e) {
    if (e.name === "AbortError") throw e;
    // On any failure, fall back to whatever was saved earlier, however old.
    if (cached?.repos?.length) return { repos: cached.repos, fetchedAt: cached.t, stale: true, reason: e.kind || "network", resetAt: e.resetAt };
    if (e instanceof GhError) throw e;
    throw new GhError("network", "Could not reach GitHub.");
  }
}

export async function loadReadme(user, repo, { signal } = {}) {
  const key = `cq:readme:v2:${user}/${repo}`;
  const cached = readJSON(key);
  if (cached && Date.now() - cached.t < README_TTL) return cached.v;
  try {
    const res = await fetch(`${API}/repos/${user}/${repo}/readme`, { headers: { Accept: "application/vnd.github.raw+json" }, signal });
    if (res.status === 404) { const v = { state: "empty" }; writeJSON(key, { t: Date.now(), v }); return v; }
    if (res.status === 403 || res.status === 429) return cached?.v?.text ? cached.v : { state: "limit", resetAt: limitedFrom(res) };
    if (!res.ok) return cached?.v?.text ? cached.v : { state: "error" };
    let text = await res.text();
    const truncated = text.length > MAX_README;
    if (truncated) text = text.slice(0, MAX_README);
    const v = { state: "ok", text, truncated };
    writeJSON(key, { t: Date.now(), v });
    return v;
  } catch (e) {
    if (e.name === "AbortError") throw e;
    return cached?.v?.text ? cached.v : { state: "error" };
  }
}

export function timeAgo(iso) {
  if (!iso) return "";
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const units = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [u, s] of units) if (Math.abs(diff) >= s) return rtf.format(Math.round(diff / s), u);
  return "just now";
}

export function resetLabel(ms) {
  if (!ms) return "in a while";
  const mins = Math.max(1, Math.round((ms - Date.now()) / 60000));
  return mins > 90 ? "in over an hour" : `in about ${mins} minute${mins === 1 ? "" : "s"}`;
}
