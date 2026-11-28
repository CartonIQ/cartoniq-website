import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SITE } from "../data/content.js";

// Raw HTML inside a README is not rendered (react-markdown's safe default), and
// only http(s)/mailto links are allowed. Relative links and images are pointed
// back at the repository on GitHub.
export default function Markdown({ text, repo }) {
  const blob = `https://github.com/${SITE.ghUser}/${repo.name}/blob/HEAD/`;
  const raw = `https://raw.githubusercontent.com/${SITE.ghUser}/${repo.name}/HEAD/`;

  const isRel = (u) => u && !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(u);
  const clean = (u) => u.replace(/^\.?\//, "");
  const safe = (u) => /^(https?:|mailto:|#)/i.test(u) || isRel(u);

  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        urlTransform={(u) => (safe(u) ? u : "")}
        components={{
          a: ({ href = "", children }) => {
            const url = isRel(href) ? blob + clean(href) : href;
            const external = /^https?:/i.test(url);
            return <a href={url} {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}>{children}</a>;
          },
          img: ({ src = "", alt = "" }) => (
            <img src={isRel(src) ? raw + clean(src) : src} alt={alt} loading="lazy" referrerPolicy="no-referrer" />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
