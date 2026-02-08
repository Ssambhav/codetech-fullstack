/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../utils/constants";
import { addRecentView } from "../utils/recentViews";
import { spellCheck } from "../utils/spellCheck";
import "../styles/InfoSection.css";

export default function StateLaws() {
  const [query, setQuery] = useState("");
  const [matchedState, setMatchedState] = useState("");
  const [laws, setLaws] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const normalize = (text) => text.toLowerCase().trim();
  const location = useLocation();

  useEffect(() => {
    const preset = location.state?.presetQuery;
    if (preset) {
      handleSpellAndSearch(preset);
    }
  }, [location.state]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentViews")) || [];
    setRecentSearches(recent.filter((item) => item.type === "stateLaw"));
  }, []);

  const handleSpellAndSearch = async (input) => {
    const raw = input.trim();
    if (!raw) return;
    try {
      const { corrected } = await spellCheck(raw);
      const fixed = corrected.toLowerCase().trim();
      setQuery(corrected);
      fetchLaws(fixed);
    } catch {
      fetchLaws(normalize(raw));
    }
  };

  const fetchLaws = async (state, refresh = false) => {
    const endpoint = refresh
      ? API_ENDPOINTS.REFRESH_STATE_LAWS(state)
      : API_ENDPOINTS.GET_STATE_LAWS(state);

    setLoading(true);
    setError("");
    setLaws([]);
    setSources([]);
    setVisible(true);

    try {
      const res = await axios.get(endpoint);
      const summary = res.data.lawsSummary || "";
      const points = summary
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const region = res.data.regionName || state;
      setMatchedState(region);
      setLaws(points);
      setSources(res.data.sources || []);

      if (points.length > 0) {
        addRecentView({
          id: state,
          title: `Laws in ${region}`,
          type: "stateLaw",
          path: `/statelaws?query=${encodeURIComponent(state)}`,
          viewedAt: new Date().toISOString(),
        });

        const updated = JSON.parse(localStorage.getItem("recentViews")) || [];
        setRecentSearches(updated.filter((item) => item.type === "stateLaw"));
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "❌ Failed to load state laws. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    handleSpellAndSearch(query);
  };

  const handleRefresh = () => {
    if (matchedState) fetchLaws(matchedState, true);
  };

  const handleClose = () => {
    setQuery("");
    setMatchedState("");
    setVisible(false);
    setLaws([]);
    setSources([]);
    setError("");
  };

  const handleClearQuery = () => setQuery("");

  return (
    <div className={`info-wrapper ${visible ? "split-layout" : ""}`}>
      <div className="search-bar">
        <h2 className="info-title">📍 Know Your State Laws</h2>
        <div className="search-controls">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter state or region name (e.g. Delhi, Maharashtra)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {query && (
              <button
                className="inline-clear"
                onClick={handleClearQuery}
                title="Clear"
              >
                ×
              </button>
            )}
            <button
              className="inline-search"
              onClick={handleSearch}
              title="Search"
            >
              🔍
            </button>
          </div>
        </div>

        {!visible && (
          <p className="info-description">
            Enter an Indian state or region name in any form. We’ll detect the
            match and show simplified legal information if available.
          </p>
        )}

        {!query && recentSearches.length > 0 && (
          <div className="recent-box fade-in">
            <div className="recent-title">🕓 Recently Searched States:</div>
            <ul className="recent-list">
              {recentSearches.map((item) => (
                <li key={item.id} className="recent-pill">
                  <span
                    className="pill-label"
                    onClick={() => {
                      setQuery(item.id);
                      fetchLaws(item.id);
                    }}
                  >
                    {item.title.replace("Laws in ", "")}
                  </span>
                  <button
                    className="pill-close"
                    onClick={(e) => {
                      e.stopPropagation();
                      const updated = recentSearches.filter(
                        (v) => v.id !== item.id
                      );
                      setRecentSearches(updated);
                      localStorage.setItem(
                        "recentViews",
                        JSON.stringify(
                          JSON.parse(
                            localStorage.getItem("recentViews") || "[]"
                          ).filter(
                            (v) => !(v.type === "stateLaw" && v.id === item.id)
                          )
                        )
                      );
                    }}
                    title="Remove"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {visible && (
        <div className="info-result fade-in">
          <div className="result-header">
            <span className="result-title">
              Laws for: {matchedState || "—"}
            </span>
            <div className="result-controls">
              {!error && (
                <button onClick={handleRefresh} title="Refresh">
                  ⟳
                </button>
              )}
              <button onClick={handleClose} title="Close">
                ❌
              </button>
            </div>
          </div>

          <div className="info-details">
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && laws.length > 0 && (
              <ul className="info-scrollable">
                {laws.map((law, idx) => (
                  <li key={idx}>{law}</li>
                ))}
              </ul>
            )}

            {!loading && !error && laws.length === 0 && (
              <p className="empty">⚠️ No laws found for this region.</p>
            )}

            {!loading && !error && sources.length > 0 && (
              <div className="sources-section">
                <p className="sources-label">🔗 Official Sources:</p>
                <ul>
                  {sources.map((link, idx) => (
                    <li key={idx}>
                      <a href={link} target="_blank" rel="noreferrer">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
