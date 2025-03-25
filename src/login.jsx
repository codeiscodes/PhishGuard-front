import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdLock } from "react-icons/io";
import "./login.css"; // Import the external CSS file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (password) => {
    return password === "password";
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    const isAuthenticated = await login(password);
    if (isAuthenticated) {
      localStorage.setItem("login", true);
      navigate("/Phishguard-front/midHome");
      return;
    }

    setError("Invalid email or password");
  };

  return (
    <div>
      <header className="header">
        <h1>
          <IoMdLock className="lock-icon" /> PhishGuard
        </h1>
      </header>
      <div className="login-box">
        <form onSubmit={submitForm} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">
              <MdOutlineEmail className="input-icon" /> Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="xyz@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <RiLockPasswordFill className="input-icon" /> Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
          <a onClick={() => navigate("/PhishGuard-front/register")}>
            New Here? Sign Up Now!
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
