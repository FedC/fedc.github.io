import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../js/firebase';
import Header from './Header';
// import ProjectGrid from './ProjectGrid';
// import ProjectOverlay from './ProjectOverlay';
import { initSmoothScrolling } from '../js/smoothscroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadImages } from '../js/utils';
import * as styles from './Home.module.scss';
import HomeProjectList from './HomeProjectList';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Draggable } from 'gsap/Draggable';
import InertiaPlugin from './InertiaPlugin.js';
import { Cursor } from '../js/cursor.js';
import InfoPage from './InfoPage';

gsap.registerPlugin(InertiaPlugin, ScrollTrigger, Draggable, CSSPlugin, ScrollToPlugin);

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerAnimationComplete, setHeaderAnimationComplete] = useState(false);
  const [projectReset, setProjectReset] = useState(false);
  const [projectFilter, setProjectFilter] = useState(null);
  const [fullScreenContent, setFullScreenContent] = useState(null);
  const [mobileMenuState, setMobileMenuState] = useState({
    isOpen: false,
    activeId: 'all'
  });
  const imageRefs = useRef({});

  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize cursor
    const cursor = new Cursor(document.querySelector('.cursor'));

    // Fetch projects from Firestore
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'projects');
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsList = projectsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        // Sort projects by order field
        projectsList.sort((a, b) => (a.order || 0) - (b.order || 0));

        setProjects(projectsList);
        setLoading(false);

        // Preload all project images
        const imageUrls = projectsList.reduce((acc, project) => {
          if (project.mainImage) acc.push(project.mainImage);
          if (project.content) {
            project.content.forEach(content => {
              if (content.type === 'image' && content.url) {
                acc.push(content.url);
              }
            });
          }
          return acc;
        }, []);

        await preloadImages(imageUrls);

      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();

    // Cleanup
    return () => {
      cursor.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className={styles.home}>
      <div className="cursor"></div>
      <Header
        onAnimationComplete={() => setHeaderAnimationComplete(true)}
        onProjectReset={() => setProjectReset(prev => !prev)}
        onFilterChange={setProjectFilter}
        mobileMenuState={mobileMenuState}
        onMobileMenuStateChange={setMobileMenuState}
      />
      {!loading && (
        <HomeProjectList
          projects={projects}
          headerAnimationComplete={headerAnimationComplete}
          projectReset={projectReset}
          projectFilter={projectFilter}
          onFullScreenContent={setFullScreenContent}
        />
      )}
      {fullScreenContent && (
        <div
          className={styles.fullScreenOverlay}
          onClick={() => setFullScreenContent(null)}
        >
          <div className={styles.fullScreenImageWrapper}>
            <img
              ref={(el) => (imageRefs.current[fullScreenContent.id] = el)}
              data-project-id={fullScreenContent.id}
              src={fullScreenContent.imageUrl}
              alt="Full screen preview"
              className={styles.fullScreenImage}
            />
          </div>
          <div
            className={styles.fullScreenDescription}
            onClick={(e) => e.stopPropagation()}
          >
            <p>{fullScreenContent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;