import React, { useEffect, useRef } from 'react';
import OneTestimonial from './OneTestimonial';
import testimonials from '../../data/test/testimonial.js';
import './testimonial.scss';

const TestimonialSection = () => {
    const carouselRef = useRef(null);

    useEffect(() => {
        const track = carouselRef.current;

        // Duplicate testimonials dynamically for seamless loop
        const duplicateTestimonials = () => {
            const items = Array.from(track.children);
            items.forEach((item) => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
        };

        duplicateTestimonials();

        // Start animation
        let scrollAmount = 0;
        const scrollSpeed = 0.5; // Adjust speed here

        const scroll = () => {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= track.scrollWidth / 2) {
                scrollAmount = 0; // Reset without any glitch
            }
            track.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(scroll);
        };

        scroll();

        return () => cancelAnimationFrame(scroll);
    }, []);

    return (
        <section className="testimonial-section">
            <h2 className="testimonial-heading">TESTIMONIALS</h2>
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
