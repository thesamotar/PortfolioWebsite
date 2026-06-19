import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import profileContent from "./data/profileContent";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import BlogsPage from "./pages/BlogsPage";
import ProjectsPage from "./pages/ProjectsPage";
import IdeasPage from "./pages/IdeasPage";

export default function App() {
  const { identity, navLinks } = profileContent;
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const handleImageClick = (e) => {
      // Only open lightbox for images inside post/project content — NOT card thumbnails
      if (e.target.tagName === "IMG") {
        const isGalleryImg = e.target.closest(".image-gallery");
        const isLedgerImg = e.target.closest(".ledger-body");
        const isMarkdownImg = e.target.closest(".markdown-content");

        if (isGalleryImg || isLedgerImg || isMarkdownImg) {
          e.preventDefault();
          setLightbox({
            src: e.target.src,
            alt: e.target.alt || e.target.title || "Image Preview"
          });
        }
      }
    };

    document.addEventListener("click", handleImageClick, { capture: true });
    return () => document.removeEventListener("click", handleImageClick, { capture: true });
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightbox(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  return (
    <BrowserRouter>
      <Nav name={identity.name} links={navLinks} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/ideas" element={<IdeasPage />} />
        </Routes>
      </main>

      {/* Lightbox / Popup Overlay */}
      {lightbox && (
        <div 
          className="lightbox-overlay" 
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close" 
              onClick={() => setLightbox(null)}
              aria-label="Close image popup"
            >
              ×
            </button>
            <img src={lightbox.src} alt={lightbox.alt} className="lightbox-img" />
            {lightbox.alt && <p className="lightbox-title">{lightbox.alt}</p>}
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}
