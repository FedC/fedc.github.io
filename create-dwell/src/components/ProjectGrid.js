import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './ProjectGrid.scss';

gsap.registerPlugin(ScrollTrigger);

const ProjectGrid = ({ projects, onProjectClick }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const loadResources = async () => {
      if (projects?.length === 0) return;
      await preloadImages(projects); // Wait until all images are loaded
      setImagesLoaded(true);
      startAnimations();
    };

    loadResources();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up GSAP ScrollTriggers
    };
  }, [projects]);

  const preloadImages = (projects) => {
    return Promise.all(
      projects.map(
        (project) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = project.mainImage;
            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    );
  };

  const startAnimations = () => {
    animateFadeIn();
    animateGridSlideUp();
    animateMarqueeOnScroll();
    animateGridScrollEffect();
  };

  const animateFadeIn = () => {
    gsap.timeline()
      .fromTo('.grid', { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo('.mark__inner', { opacity: 0 }, { opacity: 1, duration: 1 }, '<');
  }

  const animateGridSlideUp = () => {
    gsap.timeline()
      .fromTo('.grid', { y: '100vh' }, { y: '0', duration: 1.5, ease: 'power2.out' });
  }

  const animateGridScrollEffect = () => {
    const grid = document.querySelector('.grid');
    const gridImages = grid.querySelectorAll('.grid__item-imgwrap');

    gridImages.forEach(imageWrap => {
      const imgEl = imageWrap.querySelector('.grid__item-img');

      gsap.timeline({
        scrollTrigger: {
          trigger: imageWrap,
          start: 'top bottom+=100%',
          end: 'top center',
          scrub: true,
          markers: false,
        }
      })
        // .from(imageWrap, {
        //   z: 100,
        //   rotateX: 16,
        //   ease: 'sine',
        // })
        // .to(imageWrap, {
        //   z: 100,
        //   rotateX: -16,
        //   ease: 'sine.in',
        // })
        .from(imgEl, {
          scale: .9,
          opacity: .8,
          ease: 'sine',
        }, 0)
        .to(imgEl, {
          scale: 1.2,
          opacity: 1,
          ease: 'sine.in',
        }, '>');
    });
  }

  const animateMarqueeOnScroll = () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.grid',
        start: 'top=+25% center',
        end: 'bottom center+=50%',
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
  };

  const throttle = (callback, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      callback(...args);
    };
  };
  
  return (
    <>
     <div className="grid">
        {projects.map((project) => (
          project.published && (
            <div key={project.id}>
              <figure
                className="grid__item"
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
              <figcaption className="grid__item-caption">
                <h2>{project.title}</h2>
                <p>{project.location}</p>
              </figcaption>
            </div>
          )
        ))}
      </div>
      <div className="mark" ref={marqueeRef}>
        <div className="mark__inner font-alt">
          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

          <span className="clickable architecture">Architecture</span>
          <span className="clickable interior-design">Interior Design</span>
          <span className="clickable residential">Residential</span>
          <span className="clickable commercial">Commercial</span>
          <span className="clickable cultural">Cultural</span>

          <div className="spacer"></div>

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