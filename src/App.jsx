import { useState } from "react";
import "./App.css";
import axios from "axios";

function PhishGuard() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    // Simulate progress filling up
    let progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      const response = await axios.post("http://localhost:5000/checkUrl", {
        url,
      });

      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setStatus(response.data.status);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error checking URL:", error);
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl("");
    setStatus(null);
    setLoading(false);
    setProgress(0);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>PhishGuard</h1>
      </header>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="text"
            placeholder="Enter URL to check in the format (http://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
            required
          />
          <button type="submit" className="submit-btn">
            Check
          </button>
          <button type="button" onClick={handleClear} className="clear-btn">
            Clear
          </button>
        </form>

        {/* Progress Bar - Only show when loading */}
        {loading && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        )}

        {/* Result Message */}
        {status !== null && !loading && (
          <p className={`status-message ${status ? "safe" : "phishing"}`}>
            {status
              ? "✅ No phishing detected! Looks safe"
              : "❌ Warning: This site may be phishing!"}
          </p>
        )}
      </main>

      <footer className="footer">
        &copy; 2025 PhishGuard. All Rights Reserved.
      </footer>
    </div>
  );
}

export default PhishGuard;
