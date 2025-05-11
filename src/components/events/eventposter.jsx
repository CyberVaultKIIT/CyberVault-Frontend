import React, { useEffect, useState } from 'react';
import styles from './styles/eventposter.module.scss';
import eventFallbackData from '../../data/event/liveEvent.json';

const LiveEventComponent = () => {
  const [eventData, setEventData] = useState(null);
  
  useEffect(() => {
    const getEventData = async () => {
      try {
        const response = await fetch('/api/form/getLiveForm');
        const formData = await response.json();
        
        setEventData(formData.data.info.eventPoster);
      } catch (err) {
        console.log('Entering catch block', eventFallbackData.info.eventPoster);
        console.log("Printing fallback event data", eventFallbackData.info.eventPoster.image1);
        setEventData(eventFallbackData.info.eventPoster);
      }
    };
    
    getEventData();
  }, []);
  
  if (!eventData) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className={styles.eventContainer}>
      <div className={styles.liveBox}>LIVE</div>
      <p className={styles.eventText}>Events</p>
      <img src={eventData.image2} alt="Event Image 2" className={styles.image2} />
      <img src={eventData.image1} alt="Event Image 1" className={styles.image1} />
    </div>
  );
};

export default LiveEventComponent;