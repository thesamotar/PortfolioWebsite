import { useEffect, useRef, useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";

/**
 * ProjectModal — Case study overlay for project deep-dives.
 * Includes lazy-loaded video facade.
 */
export default function ProjectModal({ project, isOpen, onClose }) {
  const closeRef = useRef(null);
  const [videoActive, setVideoActive] = useState(false);

  // Focus trap & escape handler
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

  useEffect(() => {
    if (!isOpen) {
      setVideoActive(false);
    }
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

  if (!project) return null;

  const { title, tags, body, video } = project;

  return (
    <div
      className={`modal-overlay ${isOpen ? "is-open" : ""}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-shell">
        <div className="modal-header">
          <h2 className="modal-header__title">{title}</h2>
          <button
            ref={closeRef}
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="modal-tags">
              {tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Video Facade — lazy load */}
          {video && !videoActive && (
            <div
              className="video-facade"
              role="button"
              tabIndex={0}
              aria-label="Play demo video"
              onClick={() => setVideoActive(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setVideoActive(true);
                }
              }}
            >
              <div className="video-facade__play" aria-hidden="true">▶</div>
              <span className="video-facade__label">Watch Demo</span>
            </div>
          )}

          {/* Actual player — only mounts on interaction */}
          {video && videoActive && (
            <video
              className="video-player"
              src={video}
              controls
              autoPlay
              playsInline
            />
          )}

          {/* Markdown Content */}
          {body && (
            <div className="markdown-content case-study-content">
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
