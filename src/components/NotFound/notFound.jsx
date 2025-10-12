import React from 'react'
import styles from './styles/notFound.module.scss';
import Spline from '@splinetool/react-spline';


function notFound() {
  return (
    <div className={styles['object-container']}>
    <div className={styles['spline-object']}>
    <Spline scene="https://prod.spline.design/Driq1BDvHriEl2iH/scene.splinecode" />
    </div>
    <div className={styles['second-div']}>
    </div>
</div>
  )
}

export default notFound