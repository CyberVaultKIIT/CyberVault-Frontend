import React, { useState } from 'react';
import styles from './styles/Footer.module.scss';
import { Linkedin, Twitter, Instagram, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Message:', message);

    setEmail('');
    setMessage('');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contactSection}>
          <div className={styles.getInTouch}>
            <h2 className={styles.title}>
              Get in touch<br />with us
            </h2>
            <div className={styles.emailInput}>
              <input
                type="email"
                placeholder="Your email here"
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.messageSection}>
            <div className={styles.messageBox}>
              <textarea
                placeholder="Send a message"
                value={message}
                onChange={handleMessageChange}
                className={styles.messageInput}
              />
              <button 
                onClick={handleSubmit} 
                className={styles.sendButton}
              >
                SEND
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerLeft}>
            <div className={styles.brand}>
              <span className={styles.year}>2025</span> CyberVault
            </div>
            <div className={styles.socialIcons}>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Linkedin size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Twitter size={20} />
              </a>
              <a href="*" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className={styles.footerRight}>
            <div className={styles.navSection}>
              <div className={styles.navLinks}>
                <a href="/" className={styles.link}>Home</a>
                <a href="/events" className={styles.link}>Events</a>
                <a href="/team" className={styles.link}>Team</a>
                <a href="/about" className={styles.link}>About</a>
              </div>
              <div className={styles.enquiries}>
                <p>General enquiries</p>
                <div className={styles.emailId}>
                  Email id <Mail size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button className={styles.scrollTop} onClick={scrollToTop}>
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;