import React, { useEffect, useState } from 'react'
import styles from './navbar.module.scss'
import Logo from '../../assets/images/Logo.png'
import LoginButton from './LoginButton'
import NavList from './NavList'
import Hamburger from './Hamburger'
import api from '../../services/api'

// Check comment
const Navbar = () => {
  // Check if the user is authenticated or not assuming that the data or token is in the local storage to show the correct button
  const [authStatus, setAuthStatus] = useState('Login')

  const getData = async () => {
    try {
      const response = await api.post('/api/auth/register', {
        email: 'test@example.com',
        password: '123456',
      })
      console.log('Registration response:', response.data)
    } catch (error) {
      console.error(
        'Error registering user:',
        error.response?.data || error.message,
      )
    }
  }
  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      setAuthStatus('Logout')
    }
    getData()
  }, [])

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" className={styles.logoImage} />
        </div>
        <NavList />
        <LoginButton authStatus={authStatus} />
        <Hamburger authStatus={authStatus} />
      </div>
    </nav>
  )
}

export default Navbar
