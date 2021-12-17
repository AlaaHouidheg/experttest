import React from "react";
import "./footNav.css";
import Logo from "../assets/logo-nav.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-top-content">
          <ul>
            <li className="active-link">Home</li>
            <li>Home</li>
            <li>Community</li>
          </ul>
          <ul>
            <li className="active-link">Home</li>
            <li>Home</li>
            <li>Community</li>
          </ul>{" "}
          <ul>
            <li className="active-link">Home</li>
            <li>Home</li>
            <li>Community</li>
          </ul>{" "}
          <ul>
            <li className="active-link">Home</li>
            <li>Home</li>
            <li>Community</li>
          </ul>
          <ul>
            <li className="active-link">Subscribe Cirkle Newsletter</li>
            <li>
              Subscribe to be the first one to know about updates. Enter your
              email
            </li>
            <li>
              <div className="footer-search">
                <input type="text" placeholder="Email Adress ..." />
                <button>Subscribe</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bot">
        <img src={Logo} alt="lgoo" />

        <div className="social">
          <div className="soc">
            <FaTwitter />
          </div>
          <div className="soc">
            <FaLinkedinIn />
          </div>
          <div className="soc">
            <FaFacebookF />
          </div>
          <div className="soc">
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
