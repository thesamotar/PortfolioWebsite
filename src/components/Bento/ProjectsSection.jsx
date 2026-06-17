/**
 * ProjectsSection — Renders project cards in a grid.
 * Each card opens a case study modal on click.
 */
export default function ProjectsSection({ items, onProjectClick }) {
  return items.map((project) => (
    <div
      key={project.title}
      className="project-card"
      role="button"
      tabIndex={0}
      aria-label={`View case study: ${project.title}`}
      onClick={() => onProjectClick(project)}
      onTouchStart={() => {}}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onProjectClick(project);
        }
      }}
    >
      <div className="project-card__thumb">
        {project.thumbnail && (
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            loading="lazy" 
            decoding="async" 
            className="project-card__thumb-img" 
          />
        )}
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <p className="project-card__summary">{project.summary}</p>
        <span className="project-card__cta">Case Study</span>
      </div>
    </div>
  ));
}
