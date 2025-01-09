import React, { useEffect, useState } from 'react';
  import './eventposter.css';
  import eventFallbackData from '../../data/event/liveEvent.json'

  const LiveEventComponent = () => {
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
      const getEventData = async () => {
        try {
          const response = await fetch('/api/form/getLiveForm');
          const formData = await response.json(); 
          setEventData(formData.data.info.eventPoster);
        } catch (err) {
          console.log('Entering catch block',eventFallbackData.info.eventPoster);
          setEventData(eventFallbackData.info.eventPoster);

          console.log("printing event data inside catch",eventData.image1);
          
        }
      };

      getEventData();
    }, []);

    if (!eventData) {
      return <p>Loading...</p>;
    }

    return (

      <div className="eventContainer">
        <div className="liveBox">LIVE</div>
        <p className="eventText">Events</p>
        <img src={eventData.image2} alt="Event Image 2" className="image2" />
        <img src={eventData.image1} alt="Event Image 1" className="image1" />
      </div>
    );
  };

  export default LiveEventComponent;