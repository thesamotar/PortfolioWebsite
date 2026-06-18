import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

/**
 * InlineReader — Renders post/project content directly in the page,
 * replacing the bento grid on desktop. Uses the same page-content
 * container so the layout stays identical.
 */
export default function InlineReader({ item }) {
  if (!item) return null;

  return (
    <div className="page-content inline-reader">
      <div className="inline-reader__body markdown-content">

        {/* Markdown Body */}
        {item.body && (
          <div className="ledger-body">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ src, alt, ...props }) => (
                  <img
                    src={src}
                    alt={alt || ""}
                    loading="lazy"
                    decoding="async"
                    {...props}
                  />
                ),
              }}
            >
              {item.body}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
