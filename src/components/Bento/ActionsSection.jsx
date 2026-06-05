/**
 * ActionsSection — Recruiter quick-action buttons.
 */
export default function ActionsSection({ actions, onAction }) {
  return (
    <div className="actions-stack">
      {actions.map((a) => (
        <button
          key={a.action}
          className="action-btn"
          type="button"
          aria-label={a.label}
          onClick={() => onAction(a.action)}
        >
          <span className="action-btn__icon" aria-hidden="true">{a.icon}</span>
          {a.label}
        </button>
      ))}
    </div>
  );
}
