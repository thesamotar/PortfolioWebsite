import profileContent from "../data/profileContent";

/**
 * ResumeButton — Square box with download icon.
 */
export default function ResumeButton() {
  const { identity } = profileContent;
  
  if (!identity.resumeUrl) return null;

  return (
    <a 
      href={identity.resumeUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="resume-button"
      title="Download Resume"
      aria-label="Download Resume"
    >
      <span className="resume-button__text">Resume</span>
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </a>
  );
}
