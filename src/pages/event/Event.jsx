import React, { useEffect, useState, useRef } from 'react';
import styles from './Event.module.scss';

import event1 from '../../assets/images/Event5.svg';
import event2 from '../../assets/images/Event4.svg';
import event3 from '../../assets/images/Event1.svg';
import event4 from '../../assets/images/Event2.svg';
import event5 from '../../assets/images/Event3.svg';

const events = [event1, event2, event3, event4, event5];

const feedbacks = [
  {
    name: "Aarav Mehta",
    comment: "The design is sleek and I love the minimalistic approach, but maybe the contrast could be slightly improved for readability.",
  },
  {
    name: "Sofia Patel",
    comment: "Great work! The color scheme is vibrant and eye-catching. However, the navigation could be more intuitive.",
  },
  {
    name: "Liam Sharma",
    comment: "Impressive layout! The typography choices are spot-on. Just a small suggestion—try adding a bit more whitespace for better clarity.",
  },
  {
    name: "Maya Kapoor",
    comment: "The UI feels smooth and user-friendly. One thing that might help is a more consistent icon style across the design.",
  },
  {
    name: "Rohan Verma",
    comment: "I really like the structure and alignment! Maybe consider using a slightly larger font size for better accessibility.",
  },
  {
    name: "Isabella D'Souza",
    comment: "Super creative! The animations are engaging, but they might be a bit too fast. Slowing them down could enhance user experience.",
  },
];

const Event = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const feedbackContainerRef = useRef(null);
  const scrollPositionRef = useRef({ position: 0, lastTimestamp: 0 });
  const requestRef = useRef();
  const [displayedFeedbacks] = useState([...feedbacks, ...feedbacks]);


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const container = feedbackContainerRef.current;
    if (!container) return;

    const cardWidth = 320;
    const gap = 40;
    const scrollSpeed = 1.5; 
    const singleLoopWidth = feedbacks.length * (cardWidth + gap);

    const animateScroll = (timestamp) => {
      if (!scrollPositionRef.current.lastTimestamp) {
        scrollPositionRef.current.lastTimestamp = timestamp;
      }
      
      const delta = timestamp - scrollPositionRef.current.lastTimestamp;
      scrollPositionRef.current.lastTimestamp = timestamp;

      scrollPositionRef.current.position += (scrollSpeed * delta / 16);
      container.scrollLeft = scrollPositionRef.current.position;

 
      if (scrollPositionRef.current.position >= singleLoopWidth) {
        scrollPositionRef.current.position -= singleLoopWidth;
        container.scrollLeft = scrollPositionRef.current.position;
      }

      requestRef.current = requestAnimationFrame(animateScroll);
    };

    requestRef.current = requestAnimationFrame(animateScroll);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const getPositionClass = (index) => {
    const offset = (index - activeIndex + events.length) % events.length;
    if (offset === 0) return styles.center;
    if (offset === 1 || offset === -4) return styles.right;
    if (offset === 2 || offset === -3) return styles.farRight;
    if (offset === 4 || offset === -1) return styles.left;
    if (offset === 3 || offset === -2) return styles.farLeft;
    return styles.hidden;
  };

  return (
    <section className={styles.eventSection}>
      <div className={styles.carousel}>
        {events.map((img, index) => (
          <div
            key={index}
            className={`${styles.card} ${getPositionClass(index)}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={img} alt={`Event ${index + 1}`} />
          </div>
        ))}
        <div className={styles.dots}>
          {events.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
              style={{ opacity: index === activeIndex ? 1 : 0.4 }}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <button className={styles.exploreButton}>
        <span>Explore</span>
      </button>

      <div className={styles.feedbackSection} ref={feedbackContainerRef}>
        {displayedFeedbacks.map((feedback, index) => (
          <div key={index} className={styles.feedbackCard}>
            <h3 className={styles.feedbackName}>{feedback.name}</h3>
            <p className={styles.feedbackComment}>{feedback.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Event;