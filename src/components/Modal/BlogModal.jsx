import { useEffect, useRef, useCallback } from "react";

/**
 * BlogModal — Full editorial reading overlay ("Modal Ledger").
 * Renders markdown-like body text with typographic formatting.
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

  /**
   * Minimal markdown-to-JSX converter.
   * Handles: ## headings, **bold**, `code`, paragraphs, lists.
   * No innerHTML — fully sanitized via React's JSX escaping.
   */
  function renderMarkdown(text) {
    const lines = text.split("\n");
    const elements = [];
    let currentList = [];
    let listType = null;
    let key = 0;

    function flushList() {
      if (currentList.length > 0) {
        if (listType === "ul") {
          elements.push(
            <ul key={`list-${key++}`}>
              {currentList.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        } else {
          elements.push(
            <ol key={`list-${key++}`}>
              {currentList.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }
        currentList = [];
        listType = null;
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Heading
      if (line.startsWith("## ")) {
        flushList();
        elements.push(<h2 key={`h-${key++}`}>{line.slice(3)}</h2>);
        continue;
      }

      // Unordered list item
      if (line.startsWith("- ")) {
        listType = listType || "ul";
        currentList.push(line.slice(2));
        continue;
      }

      // Ordered list item
      const olMatch = line.match(/^(\d+)\.\s/);
      if (olMatch) {
        listType = listType || "ol";
        currentList.push(line.slice(olMatch[0].length));
        continue;
      }

      // Blank line
      if (line.trim() === "") {
        flushList();
        continue;
      }

      // Paragraph
      flushList();
      elements.push(<p key={`p-${key++}`}>{renderInline(line)}</p>);
    }

    flushList();
    return elements;
  }

  /**
   * Render inline formatting: **bold** and `code`.
   */
  function renderInline(text) {
    const parts = [];
    let remaining = text;
    let idx = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Code
      const codeMatch = remaining.match(/`([^`]+)`/);

      let nextMatch = null;
      let matchType = null;

      if (boldMatch && codeMatch) {
        if (remaining.indexOf(boldMatch[0]) <= remaining.indexOf(codeMatch[0])) {
          nextMatch = boldMatch;
          matchType = "bold";
        } else {
          nextMatch = codeMatch;
          matchType = "code";
        }
      } else if (boldMatch) {
        nextMatch = boldMatch;
        matchType = "bold";
      } else if (codeMatch) {
        nextMatch = codeMatch;
        matchType = "code";
      }

      if (!nextMatch) {
        parts.push(remaining);
        break;
      }

      const matchIndex = remaining.indexOf(nextMatch[0]);
      if (matchIndex > 0) {
        parts.push(remaining.slice(0, matchIndex));
      }

      if (matchType === "bold") {
        parts.push(<strong key={`b-${idx++}`}>{nextMatch[1]}</strong>);
      } else {
        parts.push(<code key={`c-${idx++}`}>{nextMatch[1]}</code>);
      }

      remaining = remaining.slice(matchIndex + nextMatch[0].length);
    }

    return parts;
  }

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
          <div className="ledger-body">
            {renderMarkdown(post.body)}
          </div>
        </div>
      </div>
    </div>
  );
}
