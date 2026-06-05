/**
 * SysStatusSection — Compact availability indicator with pulsing dot.
 */
export default function SysStatusSection({ status }) {
  return (
    <div className="sys-status-display">
      {status.pulse && <span className="pulse-dot" aria-hidden="true" />}
      <span className="sys-status-label">
        {`• Status: ${status.label}`}
      </span>
    </div>
  );
}
