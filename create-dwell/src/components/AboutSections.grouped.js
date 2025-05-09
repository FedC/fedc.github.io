import React, { useEffect, useRef } from "react";
import * as styles from "./AboutSections.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HalfCircleText from "./HalfCircleText";
import FullCircleText from "./FullCircleText";
import FourCircles from "./FourCircles";
import SevenCircles from "./SevenCircles";

gsap.registerPlugin(ScrollTrigger);

const darkOrange = 'rgb(248, 192, 85)';
const lightOrange = 'rgb(253, 236, 205)';

const AboutSections = ({ sections }) => {
  const groupSections = [
    sections.filter(s => ["Why", "What"].includes(s.title)),
    sections.filter(s => ["Integration", "Implementation"].includes(s.subTitle)),
    sections.filter(s => ["Who"].includes(s.title)),
  ];

  return (
    <>
      {groupSections.map((group, i) => (
        <div key={`panel-group-${i}`} className={`${styles.panel} panel`}>
          {group.map((section, j) => (
            <div key={`section-${section.title}-${j}`} className={styles.section}>
              <h1 className={styles.title}>{section.title}</h1>
              <h2 className={styles.subtitle}>{section.subTitle}</h2>
              <div className={styles.content}>
                {section.content.map((item, idx) => {
                  if (item.type === 'subtitle') {
                    return <h3 key={`sub_${idx}`} className={styles.subtitle}>{item.text}</h3>;
                  }
                  if (item.type === 'paragraph') {
                    return <p key={`para_${idx}`} className={styles.paragraph}>{item.text}</p>;
                  }
                  return null;
                })}

                {section.title === 'Why' && (
                  <div className={styles.imageContainer}>
                    <HalfCircleText text={['People', 'Places', 'Things', 'Information', 'Time']} bgColor={darkOrange} />
                    <p className={styles.imageText}>are</p>
                    <HalfCircleText text={['sheltered', 'defined', 'contained', 'conveyed', 'recorded']} bgColor={lightOrange} position="right" />
                  </div>
                )}

                {section.title === 'What' && (
                  <>
                    {j === 0 && (
                      <div className={styles.imageContainerFullCircles}>
                        <FullCircleText
                          text={["Thoughts", "Space", "Material", "Efficiency"]}
                          bgColor={lightOrange}
                          borderColor={lightOrange}
                          position="left"
                        />
                        <div className={styles.imageText}>+</div>
                        <FullCircleText
                          text={["Dreams", "Place", "Technology", "Economy"]}
                          bgColor={darkOrange}
                          borderColor={darkOrange}
                          position="right"
                        />
                      </div>
                    )}
                    {j === 1 && (
                      <FourCircles
                        circles={[
                          { text: ["Need", "Wants", "Budget"] },
                          { text: ["Quality", "Size", "Cost"] },
                          { text: ["Industry"] },
                          { text: ["Site"] },
                        ]}
                      />
                    )}
                  </>
                )}

                {section.title === 'Implementation' && (
                  <div className={styles.imageContainer}>
                    <HalfCircleText
                      text={['constraints', 'defined', 'established', ' ', 'minimal', 'beautiful', 'impactful']}
                      bgColor="rgb(253, 236, 205)"
                    />
                    <div className={styles.twoRowImageText}>
                      <div className={styles.imageText}>
                        <div className={styles.yetText}>Yet</div>
                        <div className={styles.imageTextSmall}>catalysts for creativity <br />not preconceived <br />expected to change</div>
                      </div>
                      <div className={styles.imageText}>
                        <div className={styles.yetText}>Yet</div>
                        <div className={styles.imageTextSmall}>essential <br />transcending fashion <br />environmentally sensitive</div>
                      </div>
                    </div>
                  </div>
                )}

                {section.title === 'Who' && (
                  <div className={styles.imageContainer}>
                    <SevenCircles />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default AboutSections;
