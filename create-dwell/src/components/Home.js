import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../js/firebase';
import Header from './Header';
import ProjectGrid from './ProjectGrid';
import ProjectOverlay from './ProjectOverlay';
import { initSmoothScrolling } from '../js/smoothscroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadImages } from '../js/utils';
import styles from './Home.module.scss';

gsap.registerPlugin(ScrollTrigger);

initSmoothScrolling();

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.body.classList.add('loading');
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectData = [];
      querySnapshot.forEach((doc) => {
        projectData.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectData);
      onProjectsLoaded();
    };

    fetchProjects();
  }, []);

  onProjectsLoaded = () => {
    preloadImages('.grid__item-img').then(() => {
      document.body.classList.remove('loading');
    });
  };


  const animateEntryLogo = () => {
    const grid = document.querySelector('.grid');
    grid.style.opacity = 0;
    window.scrollTo(0, 0);

    setTimeout(() => {
      document.body.style.overflow = 'hidden';

      gsap.timeline()
        .fromTo(
          '.entry-logo',
          { opacity: 0, y: '3px' },
          { y: '0', opacity: 1, duration: 1.5, ease: 'power2.out' }
        )
        .delay(0.3)
        .fromTo(
          '.entry-animation',
          { top: '0' },
          { top: '55px', duration: 1.5, ease: 'power2.out' },
          '<'
        )
        .to('.entry-logo', {
          width: '200px',
          height: '55px',
          duration: 1,
          ease: 'power2.out',
        }, '+=0.5')
        .to('.entry-logo-container', {
          y: '-100vh',
          paddingBottom: '0',
          top: '55px',
          duration: 1,
          ease: 'power2.out',
        }, '<')
        .to('.entry-animation', {
          y: '-100vh',
          duration: 1,
          ease: 'power2.out',
        }, '<')
        .to('.entry-animation', {
          left: '-100vw',
          duration: 0.6,
          ease: 'sine.out',
        })
        .to('.entry-logo-container', {
          left: '-100vw',
          duration: 0.6,
          ease: 'sine.out',
        }, '<')
        .to('.nav__logo img', {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        }, '-=0.5')
        // .to(
        //   window,
        //   {
        //     scrollTo: { y: document.body.clientHeight / 7.5 },
        //     duration: 2,
        //     ease: 'power2.out',
        //   },
        //   '=-1.9'
        // )
        .fromTo(
          '.mark > .mark__inner',
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '=-1.6'
        )
        .fromTo(
          grid,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '<'
        )
        .eventCallback('onComplete', () => {
          document.body.style.overflow = 'auto';
        });
    }, 0);
  };

  useEffect(() => {
    
  }, []);

  const handleCloseProjectOverlay = () => {
    setSelectedProject(null);
    // animate header back into view
    gsap.to('.nav', { x: '0', duration: 0.3, ease: 'power2.out' });
  };

  const handleGridItemClick = async (project, imageWrapper) => {
    // document.body.style.overflow = 'hidden';

    const projectId = project.id || imageWrapper.dataset.projectId;
    const img = imageWrapper.querySelector('.grid__item-img');
    const initialImgSrc = img.style.backgroundImage.slice(5, -2);

    setSelectedProject(project);

    // animate header out of view
    gsap.to('.nav', { x: '-100%', duration: 0.3, ease: 'power2.out' });

    return;

    const zoomedImg = imageWrapper.cloneNode(true);
    zoomedImg.classList.add('zoomed-image');
    document.querySelectorAll('.zoomed-image').forEach(el => el.remove());
    document.body.appendChild(zoomedImg);

    const rect = imageWrapper.getBoundingClientRect();
    zoomedImg.style.position = 'fixed';
    zoomedImg.style.zIndex = '6000';
    zoomedImg.style.transition = 'none';
    zoomedImg.style.transform = 'scale(1) translate3d(0, 0, 0)';
    zoomedImg.style.top = `${rect.top}px`;
    zoomedImg.style.left = `${rect.left}px`;
    zoomedImg.style.width = `${rect.width}px`;
    zoomedImg.style.height = `${rect.height}px`;
    zoomedImg.style.objectFit = 'cover';
    zoomedImg.style.borderRadius = 'var(--grid-item-radius)';
    zoomedImg.style.filter = imageWrapper.style.filter;

    zoomedImg.style.transition = 'transform 1s ease, opacity 0.5s ease, object-fit 0.5s ease';

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    zoomedImg.appendChild(spinner);

    let content = [];
    // try {
    //   const projectRef = doc(db, 'projects', projectId);
    //   const projectDoc = await getDoc(projectRef);

    //   if (projectDoc.exists()) {
    //     content = projectDoc.data().content || [];
    //   } else {
    //     console.error("No such project!");
    //   }
    // } catch (error) {
    //   console.error("Error fetching project content:", error);
    // }

    spinner.remove();

    setTimeout(() => {
      // Zoom animation
      gsap.timeline()
        .to(zoomedImg, {
          duration: 0.3,
          ease: 'power2.out',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          scale: 1,
        })
        .then(() => {
          document.body.style.overflow = 'auto';
        });
    }, 0);
  };

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <section className="grid-container">
          <ProjectGrid
            projects={projects}
            onProjectClick={handleGridItemClick}
          />
        </section>
      </main>

      {selectedProject && (
        <ProjectOverlay
          project={selectedProject}
          onClose={() => handleCloseProjectOverlay()}
        />
      )}
    </>
  );
};

export default Home;