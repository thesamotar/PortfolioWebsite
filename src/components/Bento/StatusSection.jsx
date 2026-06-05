/**
 * StatusSection — Active focus vectors / "Now" display.
 */
export default function StatusSection({ vectors }) {
  return (
    <div className="status-list">
      {vectors.map((v) => (
        <div key={v.label} className="status-item">
          <span className="status-item__label">{v.label}</span>
          <span className="status-item__value">{v.value}</span>
        </div>
      ))}
    </div>
  );
}
