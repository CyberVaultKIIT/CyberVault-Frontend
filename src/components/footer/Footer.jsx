import React from "react";
import "./App.scss"; 
import backgroundImage from './assets/Polygon.png'; 

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0, 
      behavior: "smooth", 
    });
  };

  return (
    <footer className="footer"
    style={{
      backgroundColor: "#000000", 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="footer-content">
        <h1 className="footer-title">CYBERVAULT</h1>
        <div className="footer-sections">
          <div className="social-links">
            <ul>
              <li><a href="https://x.com/CyberVault_KIIT" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
              <li><a href="https://www.instagram.com/cybervault_kiit/#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/cybervault-kiit/posts/?feedView=all" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li>General inquiries</li>
              <li>Email ID</li>
            </ul>
          </div>
          <div className="connect">
            <h3>Connect with us</h3>
            <div className="email-input">
              <input type="email" placeholder="Your email" />
              <button>→</button>
            </div>
          </div>
          <div className="site-links">
            <ul>
              <li>Home</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>
        </div>
        <p className="footer-year">2024 CyberVault</p>
        <button className="scroll-up" onClick={scrollToTop}>⬆</button>
      </div>
    </footer>
  );
};

export default Footer;
