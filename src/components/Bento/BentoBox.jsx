import { useCallback } from "react";

/**
 * BentoBox — Universal wrapper component.
 * Enforces consistent structure: header title bar + content area.
 * Every section in the grid is rendered through this component.
 *
 * @param {string}   id       - Section anchor ID
 * @param {string}   header   - Display title (rendered ALL-CAPS via CSS)
 * @param {string}   size     - Grid span: "full" | "half" | "third" | "two-thirds"
 * @param {string}   [accent] - Dot color: "mustard" | "coral" | "teal" | "moss"
 * @param {string}   [className] - Extra class on the outer shell
 * @param {React.ReactNode} children - Section content
 */
export default function BentoBox({ id, header, size, accent, className, children }) {
  const sizeClass = `bento--${size}`;
  const dotClass = accent ? `bento-box__dot bento-box__dot--${accent}` : "bento-box__dot";
  const outerClass = ["bento-box", sizeClass, className].filter(Boolean).join(" ");

  return (
    <section id={id} className={outerClass}>
      <div className="bento-box__header">
        <span className="bento-box__title">{header}</span>
        <span className={dotClass} aria-hidden="true" />
      </div>
      <div className="bento-box__body">
        {children}
      </div>
    </section>
  );
}
