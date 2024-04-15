import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import copyright from "../images/copyright.png";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/rooms");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <br></br>
        <div className="logo-container">
          <img src={logo} alt="RoomRally Logo" className="login-logo" />{" "}
        </div>
        <br></br>
        <br></br>
        <h2 className="login">Log in</h2>
        <div className="text-xs">Enter vour credentials to access features</div>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label> Remember me</label>
        </div>
        <button type="submit" className="signin-button" href="/rooms">
          Sign in
        </button>
      </form>
      <footer className="login-footer">
        <img src={copyright} alt="RoomRally copyright" className="copyright" />
        <p className="footer-p"> 2024 RoomRally</p>
      </footer>
    </div>
  );
};

export default Login;
