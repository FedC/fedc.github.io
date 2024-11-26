import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import './ProjectOverlay.scss';

const ProjectOverlay = ({ project, onClose }) => {
  let lenis;

  useEffect(() => {
    initLenisHorizontalScroll();

    // add class .show to the overlay to trigger the animation
    const overlay = document.querySelector('.fullscreen-overlay');
    overlay.classList.add('show');
  }, []);

  const initLenisHorizontalScroll = () => {
    if (lenis) lenis.destroy();

    const overlay = document.querySelector('.fullscreen-overlay');
    const projectContent = overlay.querySelector('.project-content');
  
    lenis = new Lenis({
      orientation: 'horizontal',
      smoothWheel: true,
      gestureOrientation: 'vertical',
      wrapper: overlay,
      content: projectContent,
    });
  
    lenis.on('scroll', (e) => {
      const currentScroll = lenis.animatedScroll;
      const maxScrollValue = lenis.limit;
      // Check if we've reached the end of scroll
      // make sure currentScroll might be half a pixel away from maxScrollValue
      if (currentScroll >= maxScrollValue || (currentScroll >= maxScrollValue - 0.5)) {
        onClose();
      }
    });
  
    // Animation frame loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  };

  return (
    <div className="fullscreen-overlay">
      <button className="unbutton close-overlay" onClick={onClose}>
        <span className="close-overlay__line close-overlay__line--1"></span>
        <span className="close-overlay__line close-overlay__line--2"></span>
      </button>
      <div className="project-content">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        {project.content.map((content, index) => {
          if (content.type === 'image' && content.description) {
            return (
              <>
              <img className='project-image' key={index} src={content.url} alt={content.title} />
              <p className='project-image-description'>{content.description}</p>
              </>
            );
          } else if (content.type === 'image') {
            return (
              <img className='project-image' key={index} src={content.url} alt={content.title} />
            );
          } else if (content.type === 'text') {
            return (
              <div className='project-text' key={index}>{content.text}</div>
            );
          } else if (content.type === 'quote') {
            return (
              <blockquote className='project-quote' key={index}>{content.text}</blockquote>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProjectOverlay;