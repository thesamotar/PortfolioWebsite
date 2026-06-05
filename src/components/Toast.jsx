import { useEffect } from "react";

/**
 * Toast — Ephemeral notification bar.
 */
export default function Toast({ message, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <div className={`toast ${visible ? "is-visible" : ""}`} aria-live="polite">
      {message}
    </div>
  );
}
