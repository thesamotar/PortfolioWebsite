/**
 * BlogSection — Scannable vertical index of writing.
 * Clicking a title opens the blog ledger modal.
 */
export default function BlogSection({ posts, onPostClick }) {
  return posts.map((post) => (
    <div
      key={post.title}
      className="project-card"
      role="button"
      tabIndex={0}
      aria-label={`Read: ${post.title}`}
      onClick={() => onPostClick(post)}
      onTouchStart={() => {}}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPostClick(post);
        }
      }}
    >
      <div className="project-card__thumb">
        {post.thumbnail && (
          <img 
            src={post.thumbnail} 
            alt={post.title} 
            loading="lazy" 
            decoding="async" 
            className="project-card__thumb-img" 
          />
        )}
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{post.title}</h3>
        <div className="project-card__tags">
          <span className="tag">{post.date}</span>
        </div>
        <p className="project-card__summary">{post.snippet}</p>
        <span className="project-card__cta">Read Post</span>
      </div>
    </div>
  ));
}
