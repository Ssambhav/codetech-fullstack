/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../utils/constants";
import { addRecentView } from "../utils/recentViews";
import { spellCheck } from "../utils/spellCheck"; // ✅ Spellcheck added
import "../styles/InfoSection.css";

export default function Rights() {
  const [query, setQuery] = useState("");
  const [rightsList, setRightsList] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [lastSearched, setLastSearched] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const preset = location.state?.presetQuery;
    if (preset) {
      const normalized = preset.trim().toLowerCase();
      setQuery(preset);
      setLastSearched(normalized);
      fetchRights(normalized);
    }

    const stored = JSON.parse(localStorage.getItem("recentViews")) || [];
    setRecentSearches(stored.filter((item) => item.type === "right"));
  }, [location.state]);

  const fetchRights = async (term, isRefresh = false) => {
    const endpoint = isRefresh
      ? API_ENDPOINTS.REFRESH_RIGHTS(term)
      : API_ENDPOINTS.GET_RIGHTS(term);

    setLoading(true);
    setError("");
    setRightsList([]);
    setSources([]);
    setVisible(true);

    try {
      const res = await axios.get(endpoint);
      const {
        summary = "",
        sources = [],
        category,
        source,
        message,
      } = res.data;

      // Handle special backend signals
      if (source === "invalid") {
        setError(
          `ℹ️ ${
            summary ||
            "This seems like a state name. Please try the State Laws section."
          }`
        );
        return;
      }

      if (source === "irrelevant") {
        setError(
          "🤖 This query doesn't seem related to specific rights. Please try using LawBot for general legal questions."
        );
        return;
      }

      const points = summary
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      setRightsList(points);
      setSources(sources);

      if (points.length > 0) {
        addRecentView({
          id: term,
          title: `Rights about: ${term}`,
          type: "right",
          path: `/rights?query=${encodeURIComponent(term)}`,
          viewedAt: new Date().toISOString(),
        });

        const updated = JSON.parse(localStorage.getItem("recentViews")) || [];
        setRecentSearches(updated.filter((item) => item.type === "right"));
      }
    } catch (err) {
      console.error(err);
      setError("❌ Failed to load rights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const term = query.trim();
    if (!term) return;
    const normalized = term.toLowerCase();

    try {
      const { corrected } = await spellCheck(normalized);
      const correctedNormalized = corrected.trim().toLowerCase();

      setQuery(corrected); // optional: to reflect fixed input in UI
      setLastSearched(correctedNormalized);
      fetchRights(correctedNormalized);
    } catch (err) {
      console.error("Spellcheck failed, using original input.");
      setLastSearched(normalized);
      fetchRights(normalized);
    }
  };

  const handleClear = () => {
    setQuery("");
    setRightsList([]);
    setSources([]);
    setError("");
    setVisible(false);
    setLastSearched("");
  };

  const handleClearQuery = () => setQuery("");

  const handleRefresh = () => {
    if (lastSearched) fetchRights(lastSearched, true);
  };

  return (
    <div className={`info-wrapper ${visible ? "split-layout" : ""}`}>
      <div className="search-bar">
        <h2 className="info-title">📚 Know Your Rights</h2>
        <div className="search-controls">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="e.g. Tenant rights, Workplace rights, etc."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {query && (
              <button
                className="inline-clear"
                onClick={handleClearQuery}
                title="Clear input"
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
          <>
            <p className="info-description">
              Know your rights with clarity. Search topics and get simplified
              summaries backed by trusted sources.
            </p>

            {recentSearches.length > 0 && !query && (
              <div className="recent-box fade-in">
                <p className="recent-title">🕘 Recent Searches:</p>
                <ul className="recent-list">
                  {recentSearches.map((item) => (
                    <li key={item.id} className="recent-pill">
                      <span
                        className="pill-label"
                        onClick={() => {
                          setQuery(item.id);
                          setLastSearched(item.id);
                          fetchRights(item.id);
                        }}
                      >
                        {item.title.replace("Rights about: ", "")}
                      </span>
                      <button
                        className="pill-close"
                        title="Remove from recent"
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
                                (v) => !(v.type === "right" && v.id === item.id)
                              )
                            )
                          );
                        }}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      {visible && (
        <div className="info-result fade-in">
          <div className="result-header">
            <span className="result-title">Results for: {lastSearched}</span>
            <div className="result-controls">
              <button onClick={handleRefresh} title="Refresh">
                ⟳
              </button>
              <button onClick={handleClear} title="Close result">
                ❌
              </button>
            </div>
          </div>

          <div className="info-details">
            {loading && <p className="loading">Loading...</p>}
            {!loading && error && <p className="error">{error}</p>}
            {!loading && !error && rightsList.length > 0 && (
              <ul className="info-scrollable">
                {rightsList.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}

            {!loading && !error && rightsList.length === 0 && (
              <p className="empty">⚠️ No rights found for this topic.</p>
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
