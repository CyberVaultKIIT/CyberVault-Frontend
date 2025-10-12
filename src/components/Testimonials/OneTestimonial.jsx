import React from 'react';
import styles from './testimonial.module.scss';

const OneTestimonial = ({ text, author }) => {
    return (
        <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>"{text}"</p>
            <p className={styles.testimonialAuthor}>- {author}</p>
        </div>
    );
};

export default OneTestimonial;