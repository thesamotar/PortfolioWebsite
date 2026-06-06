import { useState } from "react";
import profileContent from "../data/profileContent";
import { GridSection, ProjectsSection } from "../components/Bento";
import ProjectModal from "../components/Modal/ProjectModal";
import InlineReader from "../components/InlineReader";
import useIsDesktop from "../hooks/useIsDesktop";

/**
 * ProjectsPage — Full project gallery.
 * Desktop: clicking a project swaps the header & grid for the project content inline.
 * Mobile: clicking a project opens the standard modal.
 */
export default function ProjectsPage() {
  const { projects } = profileContent;
  const [activeProject, setActiveProject] = useState(null);
  const isDesktop = useIsDesktop();

  const showInline = isDesktop && activeProject;

  return (
    <>
      <header className="page-header">
        {showInline ? (
          <>
            <div className="page-header__top-row">
              <div className="page-header__title-row">
                <h1 className="page-header__title">{activeProject.title}</h1>
                {activeProject.tags && activeProject.tags.length > 0 && (
                  <div className="page-header__tags">
                    {activeProject.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="inline-reader__close"
                onClick={() => setActiveProject(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="page-header__bottom-row">
              {activeProject.summary && (
                <p className="page-header__sub">{activeProject.summary}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="page-header__title">Projects</h1>
            <p className="page-header__sub">A selection of things I've built, shipped, and open-sourced.</p>
          </>
        )}
      </header>

      {showInline ? (
        <InlineReader item={activeProject} onClose={() => setActiveProject(null)} />
      ) : (
        <div className="page-content">
          <GridSection id="all-projects" columns={3}>
            <ProjectsSection items={projects} onProjectClick={setActiveProject} />
          </GridSection>
        </div>
      )}

      {/* Modal only renders on mobile */}
      {!isDesktop && (
        <ProjectModal
          project={activeProject}
          isOpen={!!activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
