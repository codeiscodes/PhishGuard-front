import { IoMdLock } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Options.css";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="header">
        <h1>
          <IoMdLock /> PhishGuard
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
      <div className="auth-box">
        <FaUserCircle className="user-icon" />
        <p>URL Checker</p>
        <button
          className="login-button"
          onClick={() => navigate("/Phishguard-front/home")}
        >
          Click here to check your URL
        </button>
        <p>FAQ's</p>
        <button
          className="register-button"
          onClick={() => navigate("/Phishguard-front/faq")}
        >
          Click here to view FAQs
        </button>
      </div>
    </div>
  );
}
