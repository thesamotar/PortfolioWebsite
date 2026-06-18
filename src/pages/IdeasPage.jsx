import { useState } from "react";
import profileContent from "../data/profileContent";
import { GridSection, IdeasSection } from "../components/Bento";
import InlineReader from "../components/InlineReader";
import useIsDesktop from "../hooks/useIsDesktop";
import ResumeButton from "../components/ResumeButton";

/**
 * IdeasPage — Product ideas and conceptual thinking.
 * Desktop: clicking an idea swaps the header & grid for the idea content inline.
 * Mobile: clicking an idea opens a modal (future) or does nothing.
 */
export default function IdeasPage() {
  const { ideas } = profileContent;
  const [activeIdea, setActiveIdea] = useState(null);
  const isDesktop = useIsDesktop();

  const showInline = isDesktop && activeIdea;

  return (
    <>
      <header className="page-header">
        {showInline ? (
          <>
            <div className="page-header__top-row">
              <div className="page-header__title-row">
                <h1 className="page-header__title">{activeIdea.title}</h1>
                {activeIdea.badge && (
                  <div className="page-header__tags">
                    <span className="tag">{activeIdea.badge}</span>
                  </div>
                )}
              </div>
              <button
                className="inline-reader__close"
                onClick={() => setActiveIdea(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="page-header__bottom-row">
              {(activeIdea.summary || activeIdea.body) && (
                <p className="page-header__sub">{activeIdea.summary || activeIdea.body}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="page-header__heading-row">
              <h1 className="page-header__title">Ideas</h1>
              <ResumeButton />
            </div>
            <p className="page-header__sub">Things I'd build if I had infinite weekends.</p>
          </>
        )}
      </header>

      {showInline ? (
        <>
          {activeIdea.thumbnail && (
            <div className="inline-reader__hero">
              <img
                src={activeIdea.thumbnail}
                alt={activeIdea.title}
                loading="eager"
                decoding="async"
              />
            </div>
          )}
          <InlineReader
            item={activeIdea.summary ? activeIdea : { ...activeIdea, body: null }}
            onClose={() => setActiveIdea(null)}
          />
        </>
      ) : (
        <div className="page-content">
          <GridSection id="product-ideas" columns={3}>
            <IdeasSection items={ideas} onIdeaClick={setActiveIdea} />
          </GridSection>
        </div>
      )}
    </>
  );
}
