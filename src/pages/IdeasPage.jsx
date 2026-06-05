import profileContent from "../data/profileContent";
import { BentoBox, IdeasSection } from "../components/Bento";

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
        <BentoBox id="product-ideas" header="Product Ideas" size="full" accent="mustard">
          <IdeasSection items={ideas} />
        </BentoBox>
      </div>
    </>
  );
}
