import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faBell,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
      <FontAwesomeIcon icon={faHome} className="footer-icon" />
      <FontAwesomeIcon icon={faSearch} className="footer-icon" />
      <FontAwesomeIcon icon={faBell} className="footer-icon" />
      <FontAwesomeIcon icon={faComments} className="footer-icon chatbot-icon" />
    </div>
  );
};

export default Footer;
