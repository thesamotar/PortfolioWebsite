import ReactMarkdown from "react-markdown";

/**
 * InlineReader — Renders post/project content directly in the page,
 * replacing the bento grid on desktop. Uses the same page-content
 * container so the layout stays identical.
 */
export default function InlineReader({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="page-content inline-reader">
      <div className="inline-reader__body markdown-content">

        {/* Markdown Body */}
        {item.body && (
          <div className="ledger-body">
            <ReactMarkdown>{item.body}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
