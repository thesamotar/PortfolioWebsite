import { useState, useCallback } from "react";
import profileContent from "../data/profileContent";
import { GridSection, ProjectsSection, BlogSection, IdeasSection, ConnectSection, ActionsSection } from "../components/Bento";
import ProjectModal from "../components/Modal/ProjectModal";
import BlogModal from "../components/Modal/BlogModal";
import Toast from "../components/Toast";

/**
 * HomePage — The default landing page.
 * Shows: Featured Mix (Projects, Blogs, Ideas) -> Working On -> Connect (Quick Actions & Socials)
 */
export default function HomePage() {
  const { identity, projects, posts, ideas, connect } = profileContent;
  const [activeProject, setActiveProject] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const [toast, setToast] = useState({ message: "", visible: false });

  // Aggregate anything with the "Featured" tag
  const featuredProjects = projects.filter(p => p.tags?.includes("Featured")).map(p => ({ ...p, _type: 'project' }));
  const featuredPosts = posts.filter(p => p.tags?.includes("Featured")).map(p => ({ ...p, _type: 'post' }));
  const featuredIdeas = ideas.filter(i => i.tags?.includes("Featured")).map(i => ({ ...i, _type: 'idea' }));
  
  const allFeatured = [...featuredProjects, ...featuredPosts, ...featuredIdeas];

  // Dynamically find current Working On project
  const workingProject = projects.find(p => p.tags?.includes("Working On"));

  // Dynamically find posts tagged for vectors
  const getVectorPost = (tag) => posts.find(p => p.tags?.includes(tag));
  const vectors = [
    { label: "Learning", post: getVectorPost("Learning") },
    { label: "Reading", post: getVectorPost("Reading") },
    { label: "Exploring", post: getVectorPost("Exploring") },
  ].filter(v => v.post);

  const showToast = useCallback((msg) => {
    setToast({ message: msg, visible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleAction = useCallback(
    (action) => {
      if (action === "download-resume") {
        window.open(identity.resumeUrl, "_blank", "noopener,noreferrer");
      } else if (action === "copy-email") {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(identity.email)
            .then(() => showToast("Email copied to clipboard"))
            .catch(() => showToast("Copy failed — try manually"));
        } else {
          const ta = document.createElement("textarea");
          ta.value = identity.email;
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
            showToast("Email copied to clipboard");
          } catch {
            showToast("Copy failed — try manually");
          }
          document.body.removeChild(ta);
        }
      }
    },
    [identity, showToast]
  );

  return (
    <>
      {/* Hero */}
      <header className="hero">
        <h1 className="hero__name">{identity.name}</h1>
        <p className="hero__tagline">{identity.tagline}</p>
      </header>

      <div className="page-content">
        {/* Featured Content Area */}
        <GridSection id="featured" columns={3} className="home-featured-grid" showCarouselIndicator={true}>
          {allFeatured.map(item => {
            if (item._type === 'project') return <ProjectsSection key={item.title} items={[item]} onProjectClick={setActiveProject} />;
            if (item._type === 'post') return <BlogSection key={item.title} posts={[item]} onPostClick={setActivePost} />;
            if (item._type === 'idea') return <IdeasSection key={item.title} items={[item]} />;
            return null;
          })}
        </GridSection>

        {/* Working On — latest build focus */}
        {workingProject && (
          <GridSection id="working-on" header="Working On" columns={2}>
            <div 
              className="working-on interactive-card"
              onClick={() => setActiveProject(workingProject)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveProject(workingProject);
                }
              }}
            >
              <h3 className="working-on__title">{workingProject.title}</h3>
              <div className="working-on__tags">
                {workingProject.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <p className="working-on__desc">{workingProject.summary}</p>
            </div>
            <div className="working-on__vectors">
              {vectors.map((v) => (
                <div 
                  key={v.label} 
                  className="status-item interactive-row"
                  onClick={() => setActivePost(v.post)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivePost(v.post);
                    }
                  }}
                >
                  <span className="status-item__label">{v.label}</span>
                  <span className="status-item__value status-link-text">
                    {v.post.title}
                  </span>
                </div>
              ))}
            </div>
          </GridSection>
        )}

        {/* Connect Section */}
        <div className="home-footer page-content--connect">
          <GridSection id="quick-actions" header="Quick Actions" columns={1} className="actions-box">
            <ActionsSection actions={connect.actions} onAction={handleAction} />
          </GridSection>

          <GridSection id="social-nodes" header="Find Me" columns={1}>
            <ConnectSection nodes={connect.nodes} />
          </GridSection>
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
      <BlogModal
        post={activePost}
        isOpen={!!activePost}
        onClose={() => setActivePost(null)}
      />

      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />
    </>
  );
}
