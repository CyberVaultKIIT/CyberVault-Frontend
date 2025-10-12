import React from 'react'
import styles from './navbar.module.scss'
import { Link } from 'react-router-dom'

const NavList = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <li>Events</li>
        <Link to='/team'>
          <li>Team</li>
        </Link>
        <Link to='/about'>
          <li>About</li>
        </Link>
      </ul>
    </div>
  )
}

export default NavList
