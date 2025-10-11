import React, { useState, useEffect, useRef } from 'react';
import OneTestimonial from './OneTestimonial';
import testimonials from '../../data/test/testimonial.js';
import styles from './styles/testimonial.module.scss';

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const carouselRef = useRef(null);
  
  useEffect(() => {
    const updateSlidesCount = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setSlidesToShow(3);
      } else if (width > 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };
    

    updateSlidesCount();
    
 
    window.addEventListener('resize', updateSlidesCount);
    return () => window.removeEventListener('resize', updateSlidesCount);
  }, []);
  
  useEffect(() => {
    const maxIndex = Math.max(0, testimonials.length - slidesToShow);
    if (maxIndex <= 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex > maxIndex ? 0 : nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [slidesToShow]);
  
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };
  

  const maxDotsIndex = Math.max(0, testimonials.length - slidesToShow);

  const calculateOffset = () => {

    if (slidesToShow === 1) {
      return `translateX(calc(-${activeIndex * 100}%))`;
    }
    

    return `translateX(calc(-${activeIndex * (100 / slidesToShow)}%))`;
  };
  
  return (
    <section className={styles.testimonialSection}>
      <h2 className={styles.testimonialHeading}>TESTIMONIALS</h2>
      
      <div className={styles.carousel} ref={carouselRef}>
        <div 
          className={styles.carouselTrack} 
          style={{ transform: calculateOffset() }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialSlide}>
              <OneTestimonial
                text={testimonial.text}
                author={testimonial.author}
              />
            </div>
          ))}
        </div>
        
        {maxDotsIndex > 0 && (
          <div className={styles.navigationDots}>
            {Array.from({ length: maxDotsIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`${styles.navDot} ${activeIndex === index ? styles.activeDot : ''}`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialSection;