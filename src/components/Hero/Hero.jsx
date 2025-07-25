import React, { Suspense, useState } from 'react';
import styles from './styles/Hero.module.scss';

const LazySpline = React.lazy(() => import('@splinetool/react-spline'));

function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleSplineLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles['hero-container']}>
        {isLoading && (
          <div className={styles['loading-overlay']}>
            <p>Loading 3D experience...</p>
          </div>
        )}
        
        <div className={styles['spline-object-container']}>
          <Suspense fallback={<div className={styles['spline-fallback']} />}>
            <LazySpline 
              className={styles['spline-object']} 
              scene="https://prod.spline.design/iG8YgDzUmhycJDqS/scene.splinecode" 
              onLoad={handleSplineLoad}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Hero;