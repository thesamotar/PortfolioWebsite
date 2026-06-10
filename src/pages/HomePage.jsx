import { useState, useCallback } from "react";
import profileContent from "../data/profileContent";
import { GridSection, ProjectsSection, BlogSection, IdeasSection, ConnectSection } from "../components/Bento";
import ProjectModal from "../components/Modal/ProjectModal";
import BlogModal from "../components/Modal/BlogModal";
import InlineReader from "../components/InlineReader";
import useIsDesktop from "../hooks/useIsDesktop";
import Toast from "../components/Toast";
import ResumeButton from "../components/ResumeButton";

/**
 * HomePage — The default landing page.
 * Desktop: clicking a post/project swaps the hero & grid for inline content.
 * Mobile: clicking opens standard modals.
 */
export default function HomePage() {
  const { identity, projects, posts, ideas, connect } = profileContent;
  const [activeProject, setActiveProject] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const [activeIdea, setActiveIdea] = useState(null);
  const [toast, setToast] = useState({ message: "", visible: false });
  const isDesktop = useIsDesktop();

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


  const activeItem = activeProject || activePost || activeIdea;
  const showInline = isDesktop && activeItem;

  const handleClose = () => {
    setActiveProject(null);
    setActivePost(null);
    setActiveIdea(null);
  };

  return (
    <>
      {/* Hero — replaced with post title on desktop when reading */}
      {showInline ? (
        <header className="page-header">
          <div className="page-header__top-row">
            <div className="page-header__title-row">
              <h1 className="page-header__title">{activeItem.title}</h1>
              {activeItem.tags && activeItem.tags.length > 0 && (
                <div className="page-header__tags">
                  {activeItem.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              )}
            </div>
            <button
              className="inline-reader__close"
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="page-header__bottom-row">
            {(activeItem.snippet || activeItem.summary) && (
              <p className="page-header__sub">{activeItem.snippet || activeItem.summary}</p>
            )}
            {activeItem.date && (
              <span className="page-header__date">{activeItem.date}</span>
            )}
          </div>
        </header>
      ) : (
        <header className="hero">
          <div className="hero__heading-row">
            <h1 className="hero__name">{identity.name}</h1>
            <ResumeButton />
          </div>
          <p className="hero__tagline">{identity.tagline}</p>
        </header>
      )}

      {/* Main content — swapped for inline reader on desktop */}
      {showInline ? (
        <InlineReader item={activeItem} onClose={handleClose} />
      ) : (
        <div className="page-content">
          {/* Featured Content Area */}
          <GridSection id="featured" columns={3} className="home-featured-grid" showCarouselIndicator={true}>
            {allFeatured.map(item => {
              if (item._type === 'project') return <ProjectsSection key={item.title} items={[item]} onProjectClick={setActiveProject} />;
              if (item._type === 'post') return <BlogSection key={item.title} posts={[item]} onPostClick={setActivePost} />;
              if (item._type === 'idea') return <IdeasSection key={item.title} items={[item]} onIdeaClick={setActiveIdea} />;
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
                <div className="working-on__content">
                  <h3 className="working-on__title">{workingProject.title}</h3>
                  <div className="working-on__tags">
                    {workingProject.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <p className="working-on__desc">{workingProject.summary}</p>
                </div>
                <div className="working-on__media">
                  {workingProject.thumbnail ? (
                    <img 
                      src={workingProject.thumbnail} 
                      alt={workingProject.title} 
                      className="working-on__image" 
                    />
                  ) : workingProject.video ? (
                    <video 
                      src={workingProject.video} 
                      className="working-on__video" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                    />
                  ) : null}
                </div>
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
              
              {/* GitHub Activity */}
              <div className="github-dashboard">
                <img 
                  src="https://ghchart.rshah.org/thesamotar" 
                  alt="thesamotar's Github Activity" 
                  style={{ width: "100%", opacity: 0.85, mixBlendMode: "multiply", marginTop: "1rem" }}
                />
              </div>
            </GridSection>
          )}

          {/* Connect Section */}
          <div className="home-footer page-content--connect">
            <GridSection id="social-nodes" header="Find Me" columns={1}>
              <ConnectSection nodes={connect.nodes} />
            </GridSection>
          </div>
        </div>
      )}

      {/* Modals only render on mobile */}
      {!isDesktop && (
        <>
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
        </>
      )}

      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />
    </>
  );
}
