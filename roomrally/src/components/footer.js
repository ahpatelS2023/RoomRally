import React from "react";
import { useNavigate } from "react-router-dom";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faBell,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const navigate = useNavigate();

  const handleHome = (event) => {
    event.preventDefault();
    navigate("/rooms");
  };

  const handleLogout = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="footer">
      <FontAwesomeIcon
        icon={faHome}
        className="footer-icon"
        onClick={handleHome}
      />
      <FontAwesomeIcon icon={faSearch} className="footer-icon" />
      <FontAwesomeIcon icon={faBell} className="footer-icon" />
      <FontAwesomeIcon
        icon={faSignOut}
        className="footer-icon chatbot-icon"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Footer;
