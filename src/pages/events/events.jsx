import React, { useEffect, useState, useRef } from 'react';
import styles from './events.module.scss';
import carbonLogo from '../../assets/images/sponsor1.png';
import kingLogo from '../../assets/images/sponsor2.png';
import thirdLogo from '../../assets/images/sponsor3.png';
import fourLogo from '../../assets/images/sponsor4.png';
// Assuming cyberXposedPoster will also come from the backend if it's dynamic per event
// import cyberXposedPoster from '../../assets/images/cybervault.png';

const Event = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch('/api/form/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEventData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []); // The empty array ensures this effect runs only once after the initial render

  if (loading) {
    return <div className={styles.loadingContainer}>Loading event details...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>Error: {error.message}. Could not load event details.</div>;
  }

  // If eventData is null even after loading, it means no data was found
  if (!eventData) {
    return <div className={styles.noDataContainer}>No event data available.</div>;
  }

  // Destructure eventData for easier access (assuming the backend returns these fields)
  const {
    title,
    description,
    date,
    time,
    venue,
    speakers, // Array of speaker objects, each with an image URL
    posterImage, // URL for the main event poster
    sponsors // Array of sponsor objects, each with logo and name
  } = eventData;


  return (
    <div className={styles.eventPageContainer}>
      {/* Hero Section - CyberXposed Part */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className={styles.eventDetails}>
            <p><strong>DATE:</strong> {date}</p>
            <p><strong>TIME:</strong> {time}</p>
            <p><strong>VENUE:</strong> {venue}</p>
          </div>
          <button className={styles.registerButton}>Register Now</button>
          <div className={styles.speakers}>
            <h3>SPEAKERS</h3>
            <div className={styles.speakerImages}>
              {speakers && speakers.map((speaker, index) => (
                <img
                  key={index}
                  src={speaker.imageUrl} // Assuming speaker object has an imageUrl property
                  alt={speaker.name || `Speaker ${index + 1}`}
                  className={styles.speakerImg}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.heroImage}>
          {posterImage && <img src={posterImage} alt={title} />}
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className={styles.partnerLogosSection}>
        {sponsors && sponsors.map((sponsor, index) => (
          <div key={index} className={styles.partnerLogo}>
            <img src={sponsor.logoUrl} alt={sponsor.name} />
            <span>{sponsor.name}</span>
          </div>
        ))}
      </section>

      {/* Follow for More Section */}
      <section className={styles.followForMoreSection}>
        <h2>FOLLOW FOR MORE</h2>
        <button className={styles.followButton}>
          <span>FOLLOW</span>
        </button>
      </section>
    </div>
  );
};

export default Event;