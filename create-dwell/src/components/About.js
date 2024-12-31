import React from 'react';
import * as styles from './About.module.scss';

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h1>We <span className={styles.orangeText}>create</span> spaces that inspire people to <span className={styles.orangeText}>dwell.</span></h1>

        <p>
            We envision impacting the lives of our clients through spaces that convey a sense of belonging to a place.  The place chosen for a home, office, or cultural venue is imbued with significance.  This along with each client’s needs and desires inform our design concepts and processes.  When spaces effectively address the uniqueness of a client and that of the natural and man-made surroundings, inhabitants of that architecture experience dwelling.
        </p>

        <div class="w-layout-grid grid-2"><div class="wwh-container"><div class="div-block-23"><div class="div-block-22"></div><h2 class="h2">Why</h2></div><h3 class="h3">Intention</h3><p class="paragraph-8">Through architecture,​ people are sheltered, places are defined, things are contained, information is conveyed, and time is recorded.</p></div><div id="w-node-dcd5b410-d19c-5e4d-bd33-a286e393c368-e2301e23" class="wwh-container"><h2 class="h2">What</h2><div class="div-block-23"><div class="what-white-circle"></div><div class="whate-orange-circle"></div><h3 class="h3">Identification + Integration</h3></div><p class="paragraph-8-copy">architectural design is an intentional act of gathering:</p><ul role="list" class="list"><li>thoughts + dreams</li><li>space + place</li><li>material + technology</li><li>efficiency + economy</li></ul></div><div id="w-node-_43124154-8c3f-e85b-01c8-252aaa38ef91-e2301e23" class="wwh-container"><h2 class="h2">How</h2><h3 class="h3">Implementation</h3><p class="paragraph-8">At <span class="text-span-3">createdwell</span> we listen</p></div></div>

      </div>
    </section>
  );
};

export default About;