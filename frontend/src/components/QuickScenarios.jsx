import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function QuickScenarios() {
  const navigate = useNavigate();

  const rightsScenarios = [
    "Tenant Eviction",
    "Workplace Harassment",
    "Police Misconduct",
    "Online Fraud",
    "Consumer Complaint",
    "Traffic Violation",
  ];

  const lawScenarios = [
    { label: "Maharashtra", query: "Maharashtra" },
    { label: "Delhi", query: "Delhi" },
    { label: "Tamil Nadu ", query: "Tamil Nadu" },
    { label: "Punjab ", query: "Punjab" },
    { label: "Karnataka ", query: "Karnataka" },
  ];

  const handleRightsClick = (topic) => {
    navigate("/rights", { state: { presetQuery: topic } });
  };

  const handleLawClick = (topic) => {
    navigate("/state-laws", { state: { presetQuery: topic } });
  };

  return (
    <div className="quick-scenarios">
      <hr className="scenario-divider" />
      <h2 className="section-heading">🧭 Common Legal Rights Scenarios</h2>
      <div className="scenario-scroll">
        {rightsScenarios.map((scenario, idx) => (
          <div
            key={idx}
            className="home-card scenario-card"
            onClick={() => handleRightsClick(scenario)}
          >
            <h3>{scenario}</h3>
            <p>Tap to learn your rights for this situation.</p>
          </div>
        ))}
      </div>

      <hr className="scenario-divider" />

      <h2 className="section-heading">🏛️ State Law Examples</h2>
      <div className="scenario-scroll scroll-center">
        {lawScenarios.map((item, idx) => (
          <div
            key={idx}
            className="home-card scenario-card"
            onClick={() => handleLawClick(item.query)}
          >
            <h3>{item.label}</h3>
            <p>View state-specific laws and regulations.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
