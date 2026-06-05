/**
 * IdeasSection — Product ideas with category badges.
 */
export default function IdeasSection({ items }) {
  return (
    <div className="ideas-list">
      {items.map((idea) => (
        <div key={idea.title} className="idea-item">
          <span className="idea-item__badge">{idea.badge}</span>
          <h4 className="idea-item__title">{idea.title}</h4>
          <p className="idea-item__desc">{idea.description}</p>
        </div>
      ))}
    </div>
  );
}
