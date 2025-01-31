import { useState } from "react";
import "./App.css";
import axios from "axios";

function PhishGuard() {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/checkUrl", {
      url,
    });
    console.log(response);
  };

  const handleClear = () => {
    setUrl(""); // Clears the input field
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
            placeholder="Enter URL to check..."
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
      </main>

      <footer className="footer">
        &copy; 2025 PhishGuard. All Rights Reserved.
      </footer>
    </div>
  );
}

export default PhishGuard;
