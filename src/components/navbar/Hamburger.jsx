import React, { useState } from 'react' // Import useState
import styles from './navbar.module.scss'

const Hamburger = ({ authStatus }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleDisplay = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
            <li>Home</li>
            <li>Events</li>
            <li>Team</li>
            <li>About</li>
            <li>{authStatus}</li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Hamburger
