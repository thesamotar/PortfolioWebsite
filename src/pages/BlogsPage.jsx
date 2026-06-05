import { useState } from "react";
import profileContent from "../data/profileContent";
import { GridSection, BlogSection } from "../components/Bento";
import BlogModal from "../components/Modal/BlogModal";

/**
 * BlogsPage — Full blog listing with ledger modal for reading.
 */
export default function BlogsPage() {
  const { posts } = profileContent;
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [activePost, setActivePost] = useState(null);

  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Blogs</h1>
        <p className="page-header__sub">Thinking out loud about systems, tools, and craft.</p>
      </header>

      <div className="page-content">
        <GridSection id="blog-feed" columns={3}>
          <BlogSection posts={sortedPosts} onPostClick={setActivePost} />
        </GridSection>
      </div>

      <BlogModal
        post={activePost}
        isOpen={!!activePost}
        onClose={() => setActivePost(null)}
      />
    </>
  );
}
