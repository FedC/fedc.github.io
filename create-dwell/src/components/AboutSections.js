import React, { useEffect, useRef } from "react";
import * as styles from "./AboutSections.module.scss";
import { gsap } from "gsap";
import HalfCircleText from "./HalfCircleText";
import FullCircleText from "./FullCircleText";
import FourCircles from "./FourCircles";
import SevenCircles from "./SevenCircles";

const Paragraphs = ({ paragraphs }) => {
  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={'p_' + i} className={styles.paragraph}>{paragraph}</p>
      ))}
    </>
  );
};

const SectionContent = ({ content, name }) => {
  return (
    <>
      {content.map((content, i) => {
        if (content.type === "paragraph") return <p key={'section_' + name + '_p_' + i} className={styles.paragraph}>{content.text}</p>;
        return null;
      })}
    </>
  );
};

const AboutSections = ({ sections, openServices }) => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  const darkOrange = 'rgb(248, 192, 85)';
  const lightOrange = 'rgb(253, 236, 205)';

  useEffect(() => {
    // Animate sections as they appear
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      sectionRefs.current.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
          gsap.to(section, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.aboutSectionsContainer}>
      {sections.map((section, index) => (
        <section
          key={'section_' + index}
          ref={(el) => (sectionRefs.current[index] = el)}
          className={styles.section}
        >

          {section.title === 'Why' && (
            <div className={styles.sectionContent}>
              <h1 className={styles.title}>{section.title}</h1>
              <h2 className={styles.subtitle}>{section.subTitle}</h2>

              <div className={`${styles.gridContainer} ${styles.leftAligned}`}>

                <div className={styles.textContent}>
                  <div className={styles.content}>
                    <SectionContent content={section.content} name={section.title} />
                  </div>
                </div>

                <div className={styles.imageContainer}>
                  <HalfCircleText text={['People', 'Places', 'Things', 'Information', 'Time']} bgColor={darkOrange} />
                  <p className={styles.imageText}>are</p>
                  <HalfCircleText text={['sheltered', 'defined', 'contained', 'conveyed', 'recorded']} bgColor={lightOrange} position="right" />
                </div>
              </div>
            </div>
          )}

          {section.title === 'What' && (
            <>
              {(() => {
                let contentGroups = [];
                let currentGroup = { subtitle: null, paragraphs: [] };

                section.content.forEach((content, i) => {
                  if (content.type === "subtitle") {
                    // Push previous group if not empty
                    if (currentGroup.subtitle || currentGroup.paragraphs.length) {
                      contentGroups.push(currentGroup);
                    }
                    // Start new subtitle group
                    currentGroup = { subtitle: content.text, paragraphs: [] };
                  } else if (content.type === "paragraph") {
                    currentGroup.paragraphs.push(content.text);
                  }
                });

                // Push last group
                if (currentGroup.subtitle || currentGroup.paragraphs.length) {
                  contentGroups.push(currentGroup);
                }

                return contentGroups.map((group, index) => (
                  <div key={'contentGroup_' + index} className={`${styles.sectionContent} ${index === 0 ? styles.noBorderBottom : ''} ${index > 0 ? styles.flushTop : ''}`}>

                    {index === 0 && (<h1 className={styles.title}>{section.title}</h1>)}
                    {index === 0 && (<h2 className={styles.subtitle}>{section.subTitle}</h2>)}

                    <div className={`${styles.gridContainer} ${styles.leftAligned} ${index === 1 ? styles.reverseMobile : ''}`}>

                      {index % 2 === 0 && (
                        <div className={styles.textContent}>
                          {group.subtitle && <h2 className={styles.subtitle}>{group.subtitle}</h2>}

                          <div className={styles.content}>
                            <Paragraphs paragraphs={group.paragraphs} />
                          </div>
                        </div>
                      )}

                      {index === 0 && (
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

                      {index === 1 && (
                        <FourCircles
                          circles={[
                            { text: ["Need", "Wants", "Budget"] },  // Top
                            { text: ["Quality", "Size", "Cost"] }, // Bottom
                            { text: ["Industry"] },  // Left
                            { text: ["Site"] }, // Right
                          ]}
                        />
                      )}

                      {index % 2 !== 0 && (
                        <div className={styles.textContent}>
                          {group.subtitle && <h2 className={styles.subtitle}>{group.subtitle}</h2>}

                          <div className={styles.content}>
                            <Paragraphs paragraphs={group.paragraphs} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ));
              })()}
            </>
          )}

          {section.title === 'How' && (
            <div className={styles.sectionContent}>

              <h1 className={styles.title}>{section.title}</h1>
              <h2 className={styles.subtitle}>{section.subTitle}</h2>

              <div className={`${styles.gridContainer} ${styles.leftAligned}`}>
                <div className={styles.textContent}>
                  <div className={styles.content}>
                    <SectionContent content={section.content} name={section.title} />

                    <p className={styles.paragraphThick}>
                      Learn about <a onClick={openServices} >how</a> we provide Our Services
                    </p>
                  </div>
                </div>
                <div className={styles.imageContainer}>
                  <HalfCircleText text={['constraints', 'defined', 'established', ' ', 'minimal', 'beautiful', 'impactful']}
                    bgColor="rgb(253, 236, 205)" />

                  <div className={styles.twoRowImageText}>
                    <div className={`${styles.imageText}`}>
                      <div className={styles.yetText}>Yet</div>
                      <div className={styles.imageTextSmall}>catalysts for creativity <br />not preconceived <br />expected to change</div>
                    </div>

                    <div className={`${styles.imageText}`}>
                      <div>Yet</div>
                      <div className={styles.imageTextSmall}>essential <br />
                        transcending fashion <br />
                        enviromentally sensitive</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {section.title === 'Who' && (
            <div className={styles.sectionContent}>
              <div className={`${styles.gridContainer} ${styles.leftAligned}`}>
                <div className={styles.textContent}>
                  <h1 className={styles.title}>{section.title}</h1>
                  <h2 className={styles.subtitle}>{section.subTitle}</h2>

                  <div className={styles.content}>
                    <SectionContent content={section.content} name={section.title} />
                  </div>
                </div>
                <div className={styles.imageContainer}>
                  <SevenCircles />
                </div>
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default AboutSections;