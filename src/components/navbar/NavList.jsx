import React from 'react'
import styles from './navbar.module.scss'

const NavList = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>
        <li>Home</li>
        <li>Events</li>
        <li>Team</li>
        <li>About</li>
      </ul>
    </div>
  )
}

export default NavList
