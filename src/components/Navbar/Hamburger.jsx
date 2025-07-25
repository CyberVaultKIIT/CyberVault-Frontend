import React, { useState } from "react"; 
import styles from "./navbar.module.scss";

const Hamburger = ({ authStatus }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDisplay = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={styles.hamburger} onClick={toggleDisplay}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {isMenuOpen && (
        <div className={styles.hamburgerMenu}>
          <ul className={styles.hamburgerMenuList}>
            <li>
              <a href="/" className={styles.link}>
                Home
              </a>
            </li>
            <li>
              <a href="/events" className={styles.link}>
                Events
              </a>
            </li>
            <li>
              <a href="/team" className={styles.link}>
                Team
              </a>
            </li>
            <li>
              <a href="/about" className={styles.link}>
                About
              </a>
            </li>
            <li>{authStatus}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Hamburger;
