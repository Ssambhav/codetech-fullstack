import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.classList.toggle("dark", newMode);
  };

  return (
    <nav className="navbar">
      <div className="nav-header">
        <Link to="/" className="nav-title">
          <img
            src="/images/knowmyrights.png"
            alt="KnowMyRights logo"
            className="logo-img"
          />
          KnowMyRights
        </Link>
        <button className="mode-toggle" onClick={toggleMode}>
          {darkMode ? (
            <>
              <FaSun /> Light
            </>
          ) : (
            <>
              <FaMoon /> Dark
            </>
          )}
        </button>
      </div>

      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/lawbot"
          className={location.pathname === "/lawbot" ? "active" : ""}
        >
          Legal Assistant
        </Link>
        <Link
          to="/rights"
          className={location.pathname === "/rights" ? "active" : ""}
        >
          Citizen Rights
        </Link>
        <Link
          to="/state-laws"
          className={location.pathname === "/state-laws" ? "active" : ""}
        >
          Laws by State/Region
        </Link>
      </div>
    </nav>
  );
}
