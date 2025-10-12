import React from 'react'
import styles from './navbar.module.scss'

const LoginButton = ({ authStatus }) => {
  return (
    <div className={styles.login}>
      <button className={styles.loginButton}>{authStatus}</button>
    </div>
  )
}

export default LoginButton
