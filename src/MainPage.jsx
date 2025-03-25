import { IoMdLock } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="header">
        <h1>
          <IoMdLock /> PhishGuard
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
      </section>
      <div className="auth-box">
        <FaUserCircle className="user-icon" />
        <button
          className="login-button"
          onClick={() => navigate("/Phishguard-front/login")}
        >
          LOGIN
        </button>
        <button
          className="register-button"
          onClick={() => navigate("/Phishguard-front/register")}
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}
