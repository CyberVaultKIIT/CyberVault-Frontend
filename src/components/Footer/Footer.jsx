import React from "react";
import "./Footer.scss";
import backgroundImage from '../../assets/images/Polygon.png';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
            <h1 className="footer-title" style={{ color: "#ffffff", margin: 0 }}>CYBERVAULT</h1>
      <div className="footer-polygon">
        {/* Footer content */}
      <div className="footer-content" style={{ position: "relative", zIndex: 1 }}>
        <div className="footer-sections">
          <div className="site-links">
            <ul>
              <li>Home</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className="connect">
            <h3>Connect with us</h3>
            <div className="email-input">
              <input type="email" placeholder="Your email" />
              <button>→</button>
            </div>
          </div>
          <div className="social-links">
            <ul>
              <li><a href="https://x.com/CyberVault_KIIT" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
              <li><a href="https://www.instagram.com/cybervault_kiit/#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/cybervault-kiit/posts/?feedView=all" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li>General inquiries</li>
              <li>Email ID</li>
            </ul>
          </div>
        </div>
        <p className="footer-year">2024 CyberVault</p>
        <button className="scroll-up" onClick={scrollToTop}>⬆</button>
      </div>
      </div>
      
      <div className="footer-title-container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "20px 0",
        }}
      >
      </div>

      {/* Footer content
      <div className="footer-content" style={{ position: "relative", zIndex: 1 }}>
        <div className="footer-sections">
          <div className="site-links">
            <ul>
              <li>Home</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className="connect">
            <h3>Connect with us</h3>
            <div className="email-input">
              <input type="email" placeholder="Your email" />
              <button>→</button>
            </div>
          </div>
          <div className="social-links">
            <ul>
              <li><a href="https://x.com/CyberVault_KIIT" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
              <li><a href="https://www.instagram.com/cybervault_kiit/#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/cybervault-kiit/posts/?feedView=all" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li>General inquiries</li>
              <li>Email ID</li>
            </ul>
          </div>
        </div>
        <p className="footer-year">2024 CyberVault</p>
        <button className="scroll-up" onClick={scrollToTop}>⬆</button>
      </div> */}
    </footer>
  );
};

export default Footer;
