import { useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

/**
 * BlogModal — Full editorial reading overlay ("Modal Ledger").
 * Renders markdown body text with typographic formatting.
 */
export default function BlogModal({ post, isOpen, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (isOpen && closeRef.current) {
      closeRef.current.focus();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!post) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "is-open" : ""}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label={`Reading: ${post.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-shell modal-shell--ledger">
        <div className="modal-header">
          <h2 className="modal-header__title">{post.title}</h2>
          <button
            ref={closeRef}
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="ledger-meta">
            <span className="ledger-meta__date">{post.date}</span>
          </div>
          <div className="ledger-body markdown-content">
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
              {post.body}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
