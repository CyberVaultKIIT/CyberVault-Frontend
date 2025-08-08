import { useEffect, useState } from "react";
import { getEventData } from "../../services/apiServices";
import sponsorImages from "../../data/test/sponsorImages.js";
import styles from "./eventDetails.module.scss";

const EventDetails = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const data = await getEventData();
        if (data && data.events?.length > 0) {
          setEvents(data.events);
        } else {
          console.log("No event data received");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchImageData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.upcomingContainer}>
        <h2 className={styles.heading}>Upcoming Events</h2>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.cardTextSection}>
                {/* <h3 className={styles.cardTitle}>Text</h3> */}
              </div>
              <div className={styles.cardPoster}>
                <p>Stay Tuned for Upcoming Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["sponsor-images"]}>
        {sponsorImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Sponsor ${index + 1}`}
            className={styles["sponsor-image"]}
          />
        ))}
      </div>

      <div className={styles.pastEvents}>
        <h2 className={styles.heading}>Past Events</h2>
        <button className={styles.btn}>VIEW ALL EVENTS</button>
      </div>

      <div className={styles.imageGallery}>
        {events.length > 0 ? (
              events.slice(0,2).flatMap((event, index) => {
            const imageUrls = Object.values(event.poster?.images || {});
            const validImages = imageUrls.filter((url) => url);

            return validImages.map((imageUrl, imgIndex) => (

              <div key={`${event.id || index}-${imgIndex}`} className={styles.pastEventCard}>
                <img
                  src={imageUrl}
                  alt={`${event.title || "Past Event"} ${imgIndex + 1}`}
                  className={styles.eventImage}
                />
                <div className={styles.pastEventText}>
                  <h3 className={styles.cardTitle}>
                    {event.title || "No Title"}
                  </h3>
                  <p className={styles.cardText}>
                    {event.description
                    ? `${event.description.slice(0, 100)}${
                      event.description.length > 100 ? "..." : ""
                    }`
                    : "No description available."}
                  </p>
                  <span className={styles.cardTag}>
                    {event.topic || "No Topic"}
                  </span>
                </div>
              </div>
            ));
         })

        ) : (
          <p>No past event images found.</p>
        )}
      </div>

      <button className={styles.exploreButton}>
        <span>Explore</span>
      </button>
    </div>
  );
};

export default EventDetails;