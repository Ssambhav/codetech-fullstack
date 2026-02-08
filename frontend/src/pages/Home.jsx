import { Link } from "react-router-dom";
import "../styles/Home.css";
import QuickScenarios from "../components/QuickScenarios";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>
          Welcome to <span className="highlight">KnowMyRights</span>
        </h1>
        <p>Your personal legal guide — powered by AI, simplified for you.</p>
      </header>

      <div className="home-description">
        <p>
          KnowMyRights uses intelligent systems to help you understand your
          legal protections and state-specific laws in India. From tenant
          disputes to cyber safety, our AI-enhanced tools provide clear,
          trustworthy, and accessible legal information — no legal jargon, just
          real answers.
        </p>
      </div>

      <section className="home-grid">
        <Link to="/lawbot" className="home-card">
          <h2>🤖 Ask Law Bot</h2>
          <p>
            Chat with an AI to get simplified legal advice in plain language.
          </p>
        </Link>

        <Link to="/rights" className="home-card">
          <h2>📚 Browse Your Rights</h2>
          <p>
            Explore your rights in key areas like employment, housing, safety,
            and digital protection.
          </p>
        </Link>

        <Link to="/state-laws" className="home-card">
          <h2>📍 Know Your State Laws</h2>
          <p>
            Discover laws specific to your state and everyday legal scenarios.
          </p>
        </Link>
      </section>

      {/* ⭐ Example Scenarios Section */}
      {/* <h2 className="section-heading">💡 Example Scenarios You Can Explore</h2> */}
      <QuickScenarios />
    </div>
  );
}
