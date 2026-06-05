import { useState } from "react";
import profileContent from "../data/profileContent";
import { BentoBox, BlogSection } from "../components/Bento";
import BlogModal from "../components/Modal/BlogModal";

/**
 * BlogsPage — Full blog listing with ledger modal for reading.
 */
export default function BlogsPage() {
  const { posts } = profileContent;
  const [activePost, setActivePost] = useState(null);

  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Blogs</h1>
        <p className="page-header__sub">Thinking out loud about systems, tools, and craft.</p>
      </header>

      <div className="page-content">
        <BentoBox id="blog-feed" header="All Posts" size="full" accent="mustard">
          <BlogSection posts={posts} onPostClick={setActivePost} />
        </BentoBox>
      </div>

      <BlogModal
        post={activePost}
        isOpen={!!activePost}
        onClose={() => setActivePost(null)}
      />
    </>
  );
}
