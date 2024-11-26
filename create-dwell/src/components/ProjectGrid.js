import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './ProjectGrid.scss';

const ProjectGrid = ({ projects, onProjectClick }) => {
  useEffect(() => {
    // GSAP animation for marquee
    const marquee = gsap.timeline({ repeat: -1, defaults: { ease: "linear" } });
    marquee.to('.mark__inner', {
      x: '-100%',
      duration: 20, // Adjust duration for speed
    });

  }, []);

  const animateMarquee = () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.grid',
        start: 'top=+25% center',
        end: 'center top',
        scrub: true,
        markers: false,
      }
    })
      .fromTo('.mark > .mark__inner', {
        x: '100vw'                           // Start the marquee off-screen to the right
      }, {
        x: '-100%',                          // Move the marquee to the left (completely across the screen)
        ease: 'sine',
      });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.grid',
        start: 'top top',
        end: 'center top',
        scrub: true,
        markers: false,
      }
    })
      .fromTo('.mark > .mark__inner', {
        x: '50vw', opacity: 0,
      }, {
        x: '0',
        opacity: 1,
        ease: 'sine',
      })
  };

  return (
    <>
      <div className="grid">
        {projects.map((project) => (project.published &&
          <figure
            className="grid__item"
            key={project.id}
            data-title={project.title}
            data-project-id={project.id}
            onClick={(e) => onProjectClick(project, e.currentTarget)}
          >
            <div className="grid__item-imgwrap">
              <div
                className="grid__item-img"
                style={{ backgroundImage: `url(${project.mainImage})` }}
              ></div>
            </div>
          </figure>
        ))}
      </div>
      <div className="mark">
        <div className="mark__inner font-alt">
          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>
        </div>
      </div>
    </>
  );
};

export default ProjectGrid;