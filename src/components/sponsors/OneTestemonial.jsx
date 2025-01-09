// OneTestimonial.jsx
import React from 'react';
import './testimonial.scss';


const OneTestimonial = ({ text, author }) => {
    return (
        <div className="testimonial-card">
            <p className="testimonial-text">"{text}"</p>
            <p className="testimonial-author">- {author}</p>
        </div>
    );
};

export default OneTestimonial;