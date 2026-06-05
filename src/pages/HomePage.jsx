import { useState } from "react";
import profileContent from "../data/profileContent";
import { BentoBox, ProjectsSection, StatusSection, SysStatusSection } from "../components/Bento";
import ProjectModal from "../components/Modal/ProjectModal";

/**
 * HomePage — The default landing page.
 * Shows: Selected Projects (top 3) → Working On (current build focus) → System Status
 * No mention of "Now" anywhere.
 */
export default function HomePage() {
  const { identity, projects, workingOn, connect } = profileContent;
  const [activeProject, setActiveProject] = useState(null);

  // Show first 3 projects as "selected" on home
  const selectedProjects = projects.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <header className="hero">
        <h1 className="hero__name">{identity.name}</h1>
        <p className="hero__tagline">{identity.tagline}</p>
        <hr className="hero__rule" />
      </header>

      <div className="page-content">
        {/* Selected Projects */}
        <BentoBox id="selected-projects" header="Selected Projects" size="full" accent="teal">
          <ProjectsSection items={selectedProjects} onProjectClick={setActiveProject} />
        </BentoBox>

        {/* Working On — latest build focus */}
        <BentoBox id="working-on" header="Working On" size="full" accent="moss">
          <div className="working-on">
            <div className="working-on__main">
              <h3 className="working-on__title">{workingOn.title}</h3>
              <div className="working-on__tags">
                {workingOn.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <p className="working-on__desc">{workingOn.description}</p>
            </div>
            <div className="working-on__vectors">
              {workingOn.vectors.map((v) => (
                <div key={v.label} className="status-item">
                  <span className="status-item__label">{v.label}</span>
                  <span className="status-item__value">{v.value}</span>
                </div>
              ))}
            </div>
          </div>
        </BentoBox>

        {/* System Status — compact */}
        <div className="home-footer">
          <BentoBox id="sys-status" header="System Status" size="full" accent="coral">
            <SysStatusSection status={connect.status} />
          </BentoBox>
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
