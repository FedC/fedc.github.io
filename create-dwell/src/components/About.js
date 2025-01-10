import React, { useState, useEffect, useRef } from 'react';
import { db } from '../js/firebase';
import { doc, getDoc } from 'firebase/firestore';
import * as styles from './About.module.scss';

const About = () => {
  const aboutRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [aboutText, setAboutText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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
      }
    };

    fetchAbout();
  }, []);

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

  return (
    <section className={styles.about} ref={aboutRef}>
      <div className={styles.container}>
        <h1 className={styles.heading}>{renderHighlightText(title)}</h1>

        <p className={styles.aboutParagraph}>{description}</p>
      </div>

      <div className={styles.gridContainer}>
        {sections.map((section, index) => (
          <div key={index} className={styles.contentSection}>
            <h2 className={styles.h2}>{section.title}</h2>
            <div className={styles.headerContainer}>
              <img src={section.imageUrl} alt={section.title} />
            </div>
            <h3 className={styles.h3}>{section.subTitle}</h3>

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