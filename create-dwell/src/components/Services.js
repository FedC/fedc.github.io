import React, { useState, useEffect } from 'react';
import * as styles from './Services.module.scss';

const Contact = ({ parentScroller, projects }) => {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    if (!projects?.length) return;
    const publishedProjects = projects.filter((project) => project.published);
    const projectContents = publishedProjects.map((project) => {
      return project.content;
    });

    projectContents.forEach((contents) => {
      const featuredImages = contents.filter((content) => content.type === 'image' && content.featured);
      featuredImages.forEach((image) => {
        setFeaturedItems((prevItems) => {
          return [...prevItems, { imageUrl: image.url }];
        });
      });
    });
  }, [projects]);
  

  return (
    <div className={styles.contactContainer}>
      <h2>Services</h2>
      
      <div className={styles.featuredImages}>
        {featuredItems.map((item, index) => (
          <img key={index} src={item.imageUrl} alt="Featured" />
        ))}
      </div>

    </div>
  );
};

export default Contact;