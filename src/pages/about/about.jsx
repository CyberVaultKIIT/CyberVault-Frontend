import React from 'react'
import styles from './about.module.scss'
import Logo1 from '../../assets/images/cybervault-logo.svg'
import Logo2 from '../../assets/images/kiit.svg'

function App() {
  const cards = [
    {
      image: Logo1,
      title: 'CYBERVAULT',
      content:
        ' Hello everyone! Welcome to CyberVault, the premier cybersecurity society at KIIT Deemed To Be University. We are a vibrant and dynamic community of innovators, learners, and cybersecurity enthusiasts, dedicated to advancing the field of cybersecurity Our society is committed to fostering an environment of continuous learning and innovation. We offer a diverse range of activities to enhance your skills and understanding of the cybersecurity landscape.',
    },
    {
      image: Logo2,
      title: 'KIIT',
      content:
        ' KIIT Bhubaneswar, officially known as Kalinga Institute of Industrial Technology, is one of India’s premier educational institutions. Established in 1992 by Dr. Achyuta Samanta, KIIT has grown exponentially over the years, becoming a Deemed to be University in 2004. Located in the capital city of Odisha, KIIT is renowned for its world-class infrastructure, diverse academic programs, and a strong emphasis on research and innovation.',
    },
  ]

  return (
    <div className={styles.aboutPage}>
      <div className={styles.layout1}></div>
      <div className={styles.layout2}></div>
      <div className={styles.layout3}></div>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          <span style={{ color: '#04b40c' }}>ABOUT</span> US
        </h1>
      </header>

      <div className={styles.main}>
        <section className={styles.founderSection}>
          <img
            src="src\assets\images\founder.svg"
            alt="Founder"
            className={styles.founderImage}
          />
          <h2 className={styles.founderTitle}>Founder</h2>
          <p className={styles.founderDescription}>
            Dr. Achyuta Samanta is a visionary educationist, philanthropist, and
            social entrepreneur from India, best known for founding KIIT
            (Kalinga Institute of Industrial Technology) and KISS (Kalinga
            Institute of Social Sciences) in Bhubaneswar, Odisha. Born on
            January 20, 1965, in a small village in Odisha, Dr. Samanta faced
            numerous hardships during his early life, which fueled his
            determination to make a significant impact in the field of education
            and social development.
          </p>
        </section>

        <div className={styles.cardSection}>
          {cards.map((card, index) => (
            <div key={index} className={styles.infoCard}>
              <img
                src={card.image}
                alt={card.title}
                className={styles.cardImage}
              />
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardContent}>{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
