/**
 * BlogSection — Scannable vertical index of writing.
 * Clicking a title opens the blog ledger modal.
 */
export default function BlogSection({ posts, onPostClick }) {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div
          key={post.title}
          className="blog-entry"
          role="button"
          tabIndex={0}
          aria-label={`Read: ${post.title}`}
          onClick={() => onPostClick(post)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPostClick(post);
            }
          }}
        >
          <span className="blog-entry__date">{post.date}</span>
          <span className="blog-entry__title">{post.title}</span>
          <p className="blog-entry__snippet">{post.snippet}</p>
        </div>
      ))}
    </div>
  );
}
