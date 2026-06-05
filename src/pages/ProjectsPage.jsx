import { useState } from "react";
import profileContent from "../data/profileContent";
import { GridSection, ProjectsSection } from "../components/Bento";
import ProjectModal from "../components/Modal/ProjectModal";

/**
 * ProjectsPage — Full project gallery with case study modals.
 */
export default function ProjectsPage() {
  const { projects } = profileContent;
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Projects</h1>
        <p className="page-header__sub">A selection of things I've built, shipped, and open-sourced.</p>
      </header>

      <div className="page-content">
        <GridSection id="all-projects" columns={3}>
          <ProjectsSection items={projects} onProjectClick={setActiveProject} />
        </GridSection>
      </div>

      <ProjectModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
