import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-label">Numy Academy</p>

          <img
            src="/logo.png"
            alt="Numy Academy"
            className="hero-logo"
          />

          <h1>Financial planning made simple</h1>

          <p className="home-description">
            Plan project and business budgets step by step. Numy helps you
            organize costs, income, taxes and final results in one clear place.
          </p>

          <div className="home-actions">
            <Link to="/calculator" className="start-button">
              Start Calculation
            </Link>

            <Link to="/about" className="secondary-button">
              Learn more
            </Link>
          </div>
        </div>

        <div className="home-preview-card">
          <div className="preview-header">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <h3>Budget overview</h3>

          <div className="preview-row">
            <span>Planned budget</span>
            <strong>12 000 €</strong>
          </div>

          <div className="preview-row">
            <span>Total costs</span>
            <strong>8 450 €</strong>
          </div>

          <div className="preview-row">
            <span>Estimated balance</span>
            <strong>3 550 €</strong>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="home-feature-card">
          <div className="feature-icon blue">1</div>
          <h3>Choose your context</h3>
          <p>
            Select project or business mode and fill only the fields that matter.
          </p>
        </div>

        <div className="home-feature-card">
          <div className="feature-icon yellow">2</div>
          <h3>Enter financial data</h3>
          <p>
            Add budget, costs, income and tax information in a guided form.
          </p>
        </div>

        <div className="home-feature-card">
          <div className="feature-icon green">3</div>
          <h3>Review results</h3>
          <p>
            Get a clear summary of entered data and calculated financial results.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;