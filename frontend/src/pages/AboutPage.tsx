import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <main className="content about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-label">About Numy Academy</span>

          <h1>Financial planning made simple</h1>

          <p>
            Managing a budget can be stressful and confusing...
          </p>

          <Link to="/calculator" className="start-button">
            Try calculator
          </Link>
        </div>

        <div className="about-hero-visual">
          <img src="/logo.png" alt="Numy Academy" />
        </div>
      </section>

      <section className="about-section">
        <h2>The problem</h2>

        <div className="about-grid">
          <div className="about-card">
            <h3>Budget planning is confusing</h3>
            <p>
              Many users struggle with planning project, event or business
              budgets without financial experience.
            </p>
          </div>

          <div className="about-card">
            <h3>Tools are too complex</h3>
            <p>
              Spreadsheets and professional finance tools can feel overwhelming
              for beginners.
            </p>
          </div>

          <div className="about-card">
            <h3>Fear of mistakes</h3>
            <p>
              Users are often unsure if their calculations are correct or if
              they missed important costs.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Our solution</h2>

        <p className="about-text">
          Numy transforms financial planning into a simple step-by-step process.
          Instead of showing everything at once, the app guides users through
          one section at a time.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h3>Guided forms</h3>
            <p>Clear steps help users enter the right information gradually.</p>
          </div>

          <div className="about-card">
            <h3>Project & business modes</h3>
            <p>
              Users can calculate budgets for university projects or business
              cases.
            </p>
          </div>

          <div className="about-card">
            <h3>Export ready</h3>
            <p>
              Results can be prepared for PDF or Excel export for further use.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Who is it for?</h2>

        <div className="about-two-columns">
          <div className="about-card">
            <h3>Project / University</h3>
            <ul>
              <li>student projects</li>
              <li>university assignments</li>
              <li>events and educational budgets</li>
              <li>project cost planning</li>
            </ul>
          </div>

          <div className="about-card">
            <h3>Company / Business</h3>
            <ul>
              <li>business case studies</li>
              <li>startup simulations</li>
              <li>financial analysis exercises</li>
              <li>beginner business planning</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <h2>Our mission</h2>

        <p>
          We believe financial planning should be accessible, understandable,
          and stress-free for everyone.
        </p>
      </section>
    </main>
  );
}

export default AboutPage;