import { useState } from "react";
import profileContent from "../data/profileContent";
import { BentoBox, ProjectsSection } from "../components/Bento";
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
        <BentoBox id="all-projects" header="All Projects" size="full" accent="teal">
          <ProjectsSection items={projects} onProjectClick={setActiveProject} />
        </BentoBox>
      </div>

      <ProjectModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
