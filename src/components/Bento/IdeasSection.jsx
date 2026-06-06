/**
 * IdeasSection — Product ideas with category badges.
 * Accepts an optional onIdeaClick handler for inline reading.
 */
export default function IdeasSection({ items, onIdeaClick }) {
  return items.map((idea) => (
    <div
      key={idea.title}
      className="project-card"
      role={onIdeaClick ? "button" : undefined}
      tabIndex={onIdeaClick ? 0 : undefined}
      onClick={onIdeaClick ? () => onIdeaClick(idea) : undefined}
      onTouchStart={onIdeaClick ? () => {} : undefined}
      onKeyDown={onIdeaClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onIdeaClick(idea);
        }
      } : undefined}
    >
      <div className="project-card__thumb">
        {idea.thumbnail && (
          <img 
            src={idea.thumbnail} 
            alt={idea.title} 
            loading="lazy" 
            decoding="async" 
            className="project-card__thumb-img" 
          />
        )}
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{idea.title}</h3>
        <div className="project-card__tags">
          <span className="tag">{idea.badge}</span>
        </div>
        <p className="project-card__summary">{idea.body}</p>
        <span className="project-card__cta">Explore Idea</span>
      </div>
    </div>
  ));
}
