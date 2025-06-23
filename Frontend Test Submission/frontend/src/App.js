import React, { useState } from "react";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortenedUrl("");
    setLoading(true);
    if (!originalUrl) {
      setError("Please enter a URL here.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/shorten", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ url: originalUrl }),
      });
      if (!response.ok) {
        throw new Error("Failed to shorten URL. Please try again.");
      }
      const data = await response.json();
      setShortenedUrl(data.shortenedUrl.shortenedUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter URL to shorten it"
            style={{ width: "300px", padding: "10px", marginRight: "10px" }}/>
          <button type="submit" disabled={loading} style={{ padding: "10px" }}>
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </form>
        {shortenedUrl && (
          <div style={{ marginTop: "20px" }}>
            <p>Shortened URL:</p>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}
        {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
