import { useCallback } from "react";

/**
 * GridSection — Flexible grid wrapper matching editorial aesthetics.
 * 
 * @param {string}   id        - Section anchor ID
 * @param {string}   header    - Display title
 * @param {number}   columns   - Number of grid columns (1, 2, or 3)
 * @param {string}   [className] - Extra class on the outer shell
 * @param {React.ReactNode} children - Section content
 */
export default function GridSection({ id, header, columns = 1, className, children }) {
  const layoutClass = `grid-layout grid-layout--${columns}-col`;
  const outerClass = ["grid-section", className].filter(Boolean).join(" ");

  return (
    <section id={id} className={outerClass}>
      {header && (
        <div className="grid-section__header">
          <h2 className="grid-section__title">{header}</h2>
        </div>
      )}
      <div className={layoutClass}>
        {children}
      </div>
    </section>
  );
}
