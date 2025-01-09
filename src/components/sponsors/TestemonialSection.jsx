import React, { useEffect, useRef } from 'react';
import OneTestimonial from './OneTestimonial';
import testimonials from '../../data/test/testimonial.js';
import './testimonial.scss';

const TestimonialSection = () => {
    const carouselRef = useRef(null);

    useEffect(() => {
        const track = carouselRef.current;

        // Duplicate testimonials to ensure seamless scrolling
        const duplicateContent = () => {
            track.innerHTML += track.innerHTML;
        };

        duplicateContent();

        let scrollAmount = 0;

        // Smooth infinite scrolling
        const scrollCarousel = () => {
            scrollAmount += 1; // Scroll speed
            if (scrollAmount >= track.scrollWidth / 2) {
                scrollAmount = 0; // Reset when halfway done
            }
            track.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(scrollCarousel); // Smooth animation loop
        };

        scrollCarousel();

        return () => {
            cancelAnimationFrame(scrollCarousel);
        };
    }, []);

    return (
        <section className="testimonial-section">
            <h2 className="testimonial-heading">TESTIMONIAL</h2>
            <div className="carousel">
                <div className="carousel-track" ref={carouselRef}>
                    {testimonials.map((testimonial, index) => (
                        <OneTestimonial
                            key={index}
                            text={testimonial.text}
                            author={testimonial.author}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;