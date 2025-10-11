import React from "react";
import styles from "./styles/about.module.scss";

function About() {
  return (
    <div className="about-container">

      <main className={"aboutPage"}>
        <h1 className={styles.welcomeHeading}>Welcome to Cybervault</h1>
        <p className={styles.subtitle}>Securing the future, One Byte at a time</p>
        <div className={styles.aboutBox}>We are a dynamic community of innovators, learners, and cybersecurity enthusiasts at KIIT Deemed To Be University. United by a shared passion for technology and security, we strive to empower students with cutting-edge knowledge, hands-on experiences, and opportunities to grow.</div>
      </main>


    </div>
  );
}

export default About;
