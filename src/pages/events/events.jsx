import React, { useEffect, useState, useRef } from 'react';
import styles from './events.module.scss';
import carbonLogo from '../../assets/images/sponsor1.png';
import kingLogo from '../../assets/images/sponsor2.png';
import thirdLogo from '../../assets/images/sponsor3.png';
import fourLogo from '../../assets/images/sponsor4.png';
import cyberXposedPoster from'../../assets/images/cybervault.png';





const Event =() =><div className={styles.eventPageContainer}> {/* Main container for the whole page */}
      {/* Hero Section - CyberXposed Part */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>SECURE THE FUTURE. DEFEND TODAY.</h1>
          <p>
            Join us for an action-packed deep dive into the world of cybersecurity! This event will feature expert speakers, interactive workshops, and networking opportunities, providing valuable insights and practical skills to navigate the ever-evolving digital landscape. Don't miss out on this chance to enhance your knowledge and connect with fellow enthusiasts in the cybersecurity landscape.
          </p>
          <div className={styles.eventDetails}>
            <p><strong>DATE:</strong> 20th AUG</p>
            <p><strong>TIME:</strong> 10:00 AM</p>
            <p><strong>VENUE:</strong> CAMPUS-17 AUDITORIUM</p>
          </div>
          <button className={styles.registerButton}>Register Now</button>
          <div className={styles.speakers}>
            <h3>SPEAKERS</h3>
            <div className={styles.speakerImages}>
              <img src="https://placehold.co/60x60/CCCCCC/000000?text=SP1" alt="Speaker 1" className={styles.speakerImg} />
              <img src="https://placehold.co/60x60/CCCCCC/000000?text=SP2" alt="Speaker 2" className={styles.speakerImg} />
            </div>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src={cyberXposedPoster} alt="CyberXposed Poster" />
        </div>
      </section>

      {/* Partner Logos Section - Green Carbon Part */}
      <section className={styles.partnerLogosSection}>
        <div className={styles.partnerLogo}>
          <img src={carbonLogo} alt="Carbon Logo" />
          <span>CARBON</span>
        </div>
        <div className={styles.partnerLogo}>
          <img src={kingLogo} alt="King Logo" />
          <span>KING</span>
        </div>
        <div className={styles.partnerLogo}>
          <img src={thirdLogo} alt="Third Logo" />
          <span>GREEN</span>
        </div>
        <div className={styles.partnerLogo}>
        <img src={fourLogo} alt="fourth logo"/>
        <span>fourthlogo</span>
        </div>
      </section>
      {/* Follow for More Section */}
      <section className={styles.followForMoreSection}>
        <h2>FOLLOW FOR MORE</h2>
        <button className={styles.followButton}>
          <span>FOLLOW</span>
        </button>
      </section>
    </div>
    export default Event;