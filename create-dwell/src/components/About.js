import React, { useRef, useEffect } from 'react';
import * as styles from './About.module.scss';
import { Draggable  } from 'gsap/Draggable';

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
  });

  return (
    <section className={styles.about} ref={aboutRef}>
      <div className={styles.container}>
        <h1 className={styles.heading}>We <span className={styles.highlight}>create</span> spaces that inspire people to <span className={styles.highlight}>dwell.</span></h1>

        <p className={styles.aboutParagraph}>
          We envision impacting the lives of our clients through spaces that convey a sense of belonging to a place.  The place chosen for a home, office, or cultural venue is imbued with significance.  This along with each client’s needs and desires inform our design concepts and processes.  When spaces effectively address the uniqueness of a client and that of the natural and man-made surroundings, inhabitants of that architecture experience dwelling.
        </p>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.contentSection}>
          <h2 className={styles.h2}>Why</h2>
          <div className={styles.headerContainer}>
            <div className={styles.circle}></div>
          </div>
          <h3 className={styles.h3}>Intention</h3>
          <p className={styles.paragraph}>
            Through architecture, people are sheltered, places are defined, things are contained,
            information is conveyed, and time is recorded.
          </p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.h2}>What</h2>
          <div className={styles.headerContainer}>
            <div className={styles.whiteCircle}></div>
            <div className={styles.orangeCircle}></div>
            <h3 className={styles.h3}>Identification + Integration</h3>
          </div>
          <p className={styles.paragraph}>
            Architectural design is an intentional act of gathering:
          </p>
          <ul className={styles.list}>
            <li>Thoughts + dreams</li>
            <li>Space + place</li>
            <li>Material + technology</li>
            <li>Efficiency + economy</li>
          </ul>
        </div>

        <div className={styles.contentSection}>
          {/* <div className={styles.bigOrageCircle}></div> */}
          <h2 className={styles.h2}>How</h2>
          <h3 className={styles.h3}>Implementation</h3>
          <p className={styles.paragraph}>
            At <span className={styles.brandName}>Create-Dwell</span>, we listen.
            We listen to the client, the site, the budget, and the schedule.
            We listen to the materials, the light, the air, and the water.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;