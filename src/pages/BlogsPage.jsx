import { useState } from "react";
import profileContent from "../data/profileContent";
import { GridSection, BlogSection } from "../components/Bento";
import BlogModal from "../components/Modal/BlogModal";
import InlineReader from "../components/InlineReader";
import useIsDesktop from "../hooks/useIsDesktop";
import ResumeButton from "../components/ResumeButton";

/**
 * BlogsPage — Full blog listing.
 * Desktop: clicking a post swaps the header & grid for the post content inline.
 * Mobile: clicking a post opens the standard modal.
 */
export default function BlogsPage() {
  const { posts } = profileContent;
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [activePost, setActivePost] = useState(null);
  const isDesktop = useIsDesktop();

  const showInline = isDesktop && activePost;

  return (
    <>
      <header className="page-header">
        {showInline ? (
          <>
            <div className="page-header__top-row">
              <div className="page-header__title-row">
                <h1 className="page-header__title">{activePost.title}</h1>
                {activePost.tags && activePost.tags.length > 0 && (
                  <div className="page-header__tags">
                    {activePost.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="inline-reader__close"
                onClick={() => setActivePost(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="page-header__bottom-row">
              {activePost.snippet && (
                <p className="page-header__sub">{activePost.snippet}</p>
              )}
              {activePost.date && (
                <span className="page-header__date">{activePost.date}</span>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="page-header__heading-row">
              <h1 className="page-header__title">Blogs</h1>
              <ResumeButton />
            </div>
            <p className="page-header__sub">Thinking out loud about systems, tools, and craft.</p>
          </>
        )}
      </header>

      {showInline ? (
        <InlineReader item={activePost} onClose={() => setActivePost(null)} />
      ) : (
        <div className="page-content">
          <GridSection id="blog-feed" columns={3}>
            <BlogSection posts={sortedPosts} onPostClick={setActivePost} />
          </GridSection>
        </div>
      )}

      {/* Modal only renders on mobile */}
      {!isDesktop && (
        <BlogModal
          post={activePost}
          isOpen={!!activePost}
          onClose={() => setActivePost(null)}
        />
      )}
    </>
  );
}
