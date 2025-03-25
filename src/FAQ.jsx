/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoMdLock } from "react-icons/io";
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
  const navigate = useNavigate();

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
