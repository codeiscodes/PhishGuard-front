/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import {
  IoMdLock,
  IoMdSearch,
  IoIosBug,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { GoShieldCheck } from "react-icons/go";
import { TbVirus } from "react-icons/tb";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function PhishGuard() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(""); // Prefill with email
  const [description, setDescription] = useState(""); // Description input
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setScanResult(null);
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    let progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 500);

    try {
      const response = await axios.post(
        "https://phishguard-back-4yrj.onrender.com/checkUrl",
        // "http://localhost:5000/checkUrl",
        {
          url,
        }
      );
      console.log(response.data);
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setStatus(response.data.status);
        setScanResult(response.data.dataToSend);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error checking URL:", error);
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  const handleYesUpdate = () => {
    if (scanResult?.sourceUrl) {
      window.alert(
        `Redirecting you to ${scanResult.sourceUrl}. Click OK to continue!`
      );
      window.open(scanResult.sourceUrl, "_blank"); // Open URL in new tab
    }
    setStatus(null);
    setScanResult(null);
    setUrl("");
  };

  const handleNoUpdate = async () => {
    setShowModal(false);
    await axios.post(
      "https://phishguard-back-4yrj.onrender.com/updatePredict",
      // "http://localhost:5000/updatePredict",
      { email, description, url }
    );
    window.alert("Mail has been sent!");
    setDescription("");
    setEmail("");
    handleClear();
  };

  const handleClear = () => {
    setUrl("");
    setStatus(null);
    setLoading(false);
    setProgress(0);
  };

  return (
    <div>
      <header className="header">
        <h1>
          <IoMdLock onClick={() => navigate("/server")} /> PhishGuard
        </h1>
        <button
          className="submit-button"
          onClick={() => {
            navigate("/PhishGuard-front/login");
            localStorage.setItem("login", false);
          }}
        >
          Logout
        </button>
      </header>
      <section className="main-section">
        <div className="checker-box">
          <h2>Phishing URL Checker</h2>
          <p>
            Our phishing URL detects if a URL is malicious or contains a
            phishing link
          </p>
        </div>
        <div className="url-checker-box">
          <p>Detect if a URL has a phishing link or is malicious.</p>
          <form onSubmit={handleSubmit} className="url-form">
            <input
              disabled={localStorage.getItem("login") === "false"}
              type="text"
              className="url-input"
              placeholder={
                localStorage.getItem("login") === "false"
                  ? "Please login first...."
                  : "example.com (http://....)"
              }
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">
              <IoMdSearch size={"17px"} /> Scan
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
            >
              Clear
            </button>
          </form>
        </div>
      </section>

      {(loading || status !== null) && (
        <section className="result-section">
          {loading && (
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}>
                {progress}%
              </div>
            </div>
          )}

          {status !== null && !loading && (
            <div>
              <p className={`status-message ${status ? "safe" : "phishing"}`}>
                {status
                  ? "✅ No phishing detected! Looks safe"
                  : "❌ Warning: This site may be phishing!"}
              </p>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="review-msg">Is the prediction correct?</p>
                <IoMdInformationCircleOutline
                  title="This is based on AI prediction. We will use your answer to make our model perform better!"
                  size={18}
                  color="gray"
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                />
              </span>
              <section className="review-buttons">
                <button className="submit-button" onClick={handleYesUpdate}>
                  Yes
                </button>
                <button
                  className="clear-button"
                  onClick={() => setShowModal(true)}
                >
                  No
                </button>
              </section>
            </div>
          )}
          {scanResult && (
            <div className="scan-result">
              <h2
                style={{
                  fontWeight: "bold",
                  color: "#222",
                  textAlign: "center",
                }}
              >
                Scan Results
              </h2>
              <div className="scan-details">
                <div className="scan-row">
                  <p>
                    <strong>Source URL:</strong> {scanResult.sourceUrl}
                  </p>
                  <p>
                    <strong>Redirected URL:</strong>{" "}
                    {scanResult.redirectedUrl || "N/A"}
                  </p>
                </div>
                <div className="scan-row">
                  <p>
                    <strong>IP Address:</strong> {scanResult.ip || "N/A"}
                  </p>
                  <p>
                    <strong>Brand:</strong> {scanResult.brand || "Unknown"}
                  </p>
                </div>
                <div className="scan-row">
                  <p>
                    <strong>Location:</strong>{" "}
                    {scanResult.location || "Not available"}
                  </p>
                  <p>
                    <strong>Hosting Provider:</strong>{" "}
                    {scanResult.hostingProvider || "N/A"}
                  </p>
                </div>
                <div className="scan-row">
                  <p>
                    <strong>Detection Date:</strong>{" "}
                    {scanResult.detectionDate || "N/A"}
                  </p>
                  <p>
                    <strong>ASN:</strong> {scanResult.asn || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      <section className="card-section">
        <h1>How does PhishGuard Link Checker work?</h1>
        <p>
          PhishGuard Link Checker is a free tool designed to verify URLs,
          helping users avoid malware, phishing attempts, and counterfeit
          websites.
          <br />
          <br />
          Here's how it works:
        </p>
        <div className="cards">
          <div className="card card1">
            <div className="details">
              <IoIosBug size={"30px"} color="#2a83fd" />
              <h3>Scan for Threats</h3>
              <p>
                AI-powered 'small engines' scan the URL for potential threats.
              </p>
            </div>
          </div>
          <div className="card card2">
            <div className="details">
              <TbVirus size={"30px"} color="#2a83fd" />
              <h3>Cross-reference</h3>
              <p>
                We also cross-reference the URL with up-to-date security
                databases and analyze the site's behaviour.
              </p>
            </div>
          </div>
          <div className="card card3">
            <div className="details">
              <GoShieldCheck size={"30px"} color="#2a83fd" />
              <h3>Give Verdict</h3>
              <p>
                You'll know if you should trust that URL or not in a matter of
                seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for 'No' button click */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Please provide more details</h3>
            <form onSubmit={handleNoUpdate}>
              <div className="form-group">
                <label>Email ID:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="form-group">
                <label>Website URL:</label>
                <input
                  type="text"
                  value={url}
                  disabled
                  className="input-field"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field"
                  placeholder="Please describe why you think this URL was predicted incorrectly."
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
