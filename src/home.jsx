/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { IoMdLock, IoMdSearch, IoIosBug } from "react-icons/io";
import { GoShieldCheck } from "react-icons/go";
import { TbVirus } from "react-icons/tb";

import "./home.css";
import { useNavigate } from "react-router-dom";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button className="accordion-button" onClick={() => setIsOpen(!isOpen)}>
        {title} <span className={`arrow ${isOpen ? "open" : ""}`}>+ </span>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default function PhishGuard() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    let progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 500);

    try {
      const response = await axios.post(
        "https://phishguard-back.onrender.com/checkUrl",
        { url }
      );
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

  const faqs = [
    {
      question: "What is an unsafe link?",
      answer:
        "An unsafe link is a URL that may lead to malicious websites designed to steal personal information, install malware, or execute phishing attacks.",
    },
    {
      question: "How can I check if any website URL is safe?",
      answer:
        "Identifying a safe URL just by looking at it can be tricky. Use our link checker tool for reliable results.",
    },
    {
      question: "What happens if I click on a malicious link?",
      answer:
        "Clicking on a malicious link may install malware, steal personal information, or direct you to phishing sites.",
    },
    {
      question: "Does a URL checker identify if a link is a scam?",
      answer:
        "Yes, our checker identifies scams by analyzing domain names, website age, and known phishing patterns.",
    },
    {
      question: "How to check phishing links?",
      answer:
        "Use a phishing URL scanner that analyzes the link for known threats before clicking.",
    },
    {
      question: "Can I check a shortened URL before opening it?",
      answer:
        "Yes, our tool expands shortened URLs to reveal their true destination and check for threats.",
    },
  ];

  return (
    <div>
      <header className="header">
        <h1>
          <IoMdLock onClick={() => navigate("/server")} /> PhishGuard
        </h1>
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
              type="text"
              className="url-input"
              placeholder="example.com (http://....)"
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
            <p className={`status-message ${status ? "safe" : "phishing"}`}>
              {status
                ? "✅ No phishing detected! Looks safe"
                : "❌ Warning: This site may be phishing!"}
            </p>
          )}
        </section>
      )}

      <section className="card-section">
        <h1>How does PhishGuard Link Checker works?</h1>
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
                You'll know if you should trust that URL or not in matter of
                seconds.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <div className="accordion">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} title={faq.question}>
              <p>{faq.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </section>
    </div>
  );
}
