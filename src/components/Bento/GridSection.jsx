import { useRef, useState } from "react";

/**
 * GridSection — Flexible grid wrapper matching editorial aesthetics.
 * 
 * @param {string}   id        - Section anchor ID
 * @param {string}   header    - Display title
 * @param {number}   columns   - Number of grid columns (1, 2, or 3)
 * @param {string}   [className] - Extra class on the outer shell
 * @param {React.ReactNode} children - Section content
 * @param {boolean}  [showCarouselIndicator] - Whether to show carousel dots
 */
export default function GridSection({ id, header, columns = 1, className, children, showCarouselIndicator }) {
  const layoutClass = `grid-layout grid-layout--${columns}-col`;
  const outerClass = ["grid-section", className].filter(Boolean).join(" ");
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.scrollWidth / (children?.length || 1);
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleDotClick = (index) => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.scrollWidth / (children?.length || 1);
    scrollRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <section id={id} className={outerClass}>
      {header && (
        <div className="grid-section__header">
          <h2 className="grid-section__title">{header}</h2>
        </div>
      )}
      <div 
        className={layoutClass} 
        ref={scrollRef} 
        onScroll={showCarouselIndicator ? handleScroll : undefined}
      >
        {children}
      </div>
      {showCarouselIndicator && children && children.length > 1 && (
        <div className="carousel-indicators">
          {children.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
