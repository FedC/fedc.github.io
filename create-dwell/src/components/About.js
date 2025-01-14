import React, { useState, useEffect, useRef } from 'react';
import { db } from '../js/firebase';
import { doc, getDoc } from 'firebase/firestore';
import * as styles from './About.module.scss';
import { gsap } from 'gsap';

const About = () => {
  const aboutRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [aboutText, setAboutText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      const aboutDoc = await getDoc(doc(db, 'about', 'main'));
      if (aboutDoc.exists()) {
        const data = aboutDoc.data();
        setTitle(data.title || '');
        setDescription(data.description || '');
        setSections(data.sections || []);
        setAboutText(data.aboutText || '');
        setImageUrl(data.imageUrl || '');

        setTimeout(() => {
          animateSectionsStagger();
        }, 500);
      }
    };

    fetchAbout();
  }, []);

  const animateSectionsStagger = () => {
    gsap.fromTo(
      aboutRef.current.querySelectorAll(`.${styles.contentSection}`),
      {
        autoAlpha: 0,
        y: 50,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.2,
      }
    );
  };


  const renderHighlightText = (text) => {
    return text.split(' ').map((word, index) => {
      if (word.toLowerCase() === 'create' || word.toLowerCase() === 'dwell') {
        return (
          <span key={index} className={styles.highlight}>
            {word}&nbsp;
          </span>
        );
      }
      return word + ' ';
    });
  };

  const revealContent = (index) => () => {
    setActiveSection(index);
  }

  const toggleContent = (index) => (e) => {
    e.stopPropagation();
    if (activeSection === index) {
      setActiveSection(null);
    } else {
      setActiveSection(index);
    }
  }

  const closeContent = (e) => {
    e.stopPropagation();
    setActiveSection(null);
  }

  return (
    <section className={styles.about} ref={aboutRef}>
      <div className={styles.container}>
        <h1 className={styles.heading}>{renderHighlightText(title)}</h1>

        <p className={styles.aboutParagraph}>{description}</p>
      </div>

      <div className={`${styles.gridContainer} ${activeSection !== null ? styles.oneColumn : ''}`}>
        {sections.map((section, index) => (
          <div key={index} className={`${styles.contentSection} ${activeSection === index ? styles.active : ''}
            ${activeSection !== null && activeSection !== index ? styles.inactive : ''}`}>

            {activeSection === index && (
              <button className={styles.closeButton} onClick={(e) => closeContent(e)}>
                <svg className={styles.closeIcon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z" /></svg>
              </button>
            )}

            <div className={styles.headerContainer} onClick={toggleContent(index)}>
              <h2 className={styles.h2}>{section.title}</h2>
              <img src={section.imageUrl} alt={section.title} />
            </div>

            {activeSection === index && (
              <div className={styles.content}>
                {/* Render content dynamically */}
                {section.content.map((content, contentIndex) => {
                  if (content.type === 'paragraph') {
                    return (
                      <p key={contentIndex} className={styles.paragraph}>
                        {content.text}
                      </p>
                    );
                  }
                  if (content.type === 'bullets') {
                    return (
                      <ul key={contentIndex} className={styles.list}>
                        {content.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>{bullet}</li>
                        ))}
                      </ul>
                    );
                  }
                  return null; // Fallback for unknown content types
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.aboutImageContainer}>
          <p className={styles.aboutParagraph}>{aboutText}</p>
          {imageUrl && (
            <img
              className={styles.aboutImage}
              src={imageUrl}
              alt="About the Architect"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default About;