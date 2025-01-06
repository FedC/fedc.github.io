import React, { useRef, useEffect } from 'react';
import * as styles from './About.module.scss';

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
            We care what architecture conveys about

            you and your community.



            Through architecture,



            people are sheltered,

            places are defined,

            things are contained,

            information is conveyed,

            time is recorded.


            You play a role in HOW this happens.  We enjoy sharing part in that process with you! Together, we assume accountability in shaping your community, beginning with architecture that projects values important to YOU!
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
            Our projects draw from and serve their surrounding context, evolving into landmarks within their communities and projecting the identity of their commissioning patrons.
            Within our studio, architectural design is an intentional act of gathering:
          </p>

          <ul className={styles.list}>
            <li>Thoughts + dreams</li>
            <li>Space + place</li>
            <li>Material + technology</li>
            <li>Efficiency + economy</li>
          </ul>
          <p className={styles.paragraph}>
            We identify the unique balance of these interchangeable criteria in every design. To ensure the viability of your project, we sensitively integrate your specific needs + wants + budget, the multi-dimensional factors of your site, the dynamics of the local construction industry, and the synergy between quality, size, and cost.
          </p>

        </div>

        <div className={styles.contentSection}>
          {/* <div className={styles.bigOrageCircle}></div> */}
          <h2 className={styles.h2}>How</h2>
          <h3 className={styles.h3}>Implementation</h3>
          <p className={styles.paragraph}>
            We implement a design process where design criteria are:



            Constraints, yet catalysts for creativity;

            Defined, yet not pre-conceived;

            Established, yet expected to change.



            This process results in projects that reveal a strong sense of belonging to a place:



            Minimal, yet essential;

            Beautiful, yet transcending fashion and decoration;

            Impactful, yet environmentally sensitive.


            It is a process of discovery where TOGETHER we create spaces that lead you to dwell.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.aboutImageContainer}>
          <p className={styles.aboutParagraph}>
            As an architect and interior designer registered in the state of Florida, Carolina Wiebe has been recognized by local and state levels of the American Institute of Architects for her award-winning designs.

            Certified by the United States Green Building Council (USGBC) as an accredited professional in Leadership in Energy and Environmental Design (LEED AP), her specialty is in Building Design and Construction (BD+C).

            With a body of work in Florida, Mexico, and Canada, Carolina's professional experience ranges from large scale cultural institutions and master planning to small scale financial institutions and residences.

            By-products of her work include consensus building and visioning, furniture design, and graphic design.

            Carolina looks forward to future opportunities, applying her expertise to projects of varying uses, scales, and scopes, especially within zones of high velocity wind speeds – ready to address the needs of clients seeking one-of-a-kind projects that respond to and work with their local environments.
          </p>

          <img className={styles.aboutImage} src="https://static.wixstatic.com/media/5c9e6a_30d7ce8bb6dc4be08e4660035702a033~mv2.jpg/v1/crop/x_0,y_38,w_1067,h_1524/fill/w_570,h_814,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Carolina%20Headshots-67.jpg" alt="Carolina Wiebe" />
        </div>
      </div>

    </section>
  );
};

export default About;