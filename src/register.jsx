import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import "./login.css"; // Import the external CSS file

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !phone || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (phone < 0) {
      setError("Phone number cannot be in -");
    }

    if (name && phone && email && password) {
      navigate("/PhishGuard-front/midHome");
      localStorage.setItem("login", true);
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
            <label htmlFor="name">
              <FaUser className="input-icon" /> Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">
              <IoMdPhonePortrait className="input-icon" /> Phone Number
            </label>
            <input
              type="number"
              id="phone"
              placeholder="+91 9999999999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

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
            REGISTER
          </button>
          <p onClick={() => navigate("/PhishGuard-front/login")}>
            {" "}
            Already Registered? Sign In!
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
