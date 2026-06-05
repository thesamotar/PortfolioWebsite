import profileContent from "../data/profileContent";
import { GridSection, IdeasSection } from "../components/Bento";

/**
 * IdeasPage — Product ideas and conceptual thinking.
 */
export default function IdeasPage() {
  const { ideas } = profileContent;

  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Ideas</h1>
        <p className="page-header__sub">Things I'd build if I had infinite weekends.</p>
      </header>

      <div className="page-content">
        <GridSection id="product-ideas" columns={3}>
          <IdeasSection items={ideas} />
        </GridSection>
      </div>
    </>
  );
}
