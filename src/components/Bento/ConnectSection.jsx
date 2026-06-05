/**
 * ConnectSection — Square social node grid.
 */
export default function ConnectSection({ nodes }) {
  return (
    <div className="connect-grid">
      {nodes.map((node) => (
        <a
          key={node.label}
          className="connect-node"
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={node.label}
        >
          {node.icon}
        </a>
      ))}
    </div>
  );
}
