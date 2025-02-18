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

gsap.registerPlugin(InertiaPlugin, ScrollTrigger, Draggable, CSSPlugin, ScrollToPlugin);

initSmoothScrolling();

const Home = () => {
  const [originalProjects, setOriginalProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [headerAnimationComplete, setHeaderAnimationComplete] = useState(false);
  const [projectReset, setProjectReset] = useState(false);
  const [projectFilter, setProjectFilter] = useState(null);
  let cursor = null;
  let cursorRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('loading');
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectData = [];
      querySnapshot.forEach((doc) => {
        projectData.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectData);
      setOriginalProjects(projectData);
      onProjectsLoaded();
    };

    fetchProjects();
  }, []);

  const onProjectsLoaded = () => {
    preloadImages('.grid__item-img').then(() => {
      document.body.classList.remove('loading');
    });
  };

  useEffect(() => {
    cursor = new Cursor(cursorRef.current);
  }, []);

  const handleCloseProjectOverlay = () => {
    setSelectedProject(null);
    // animate header back into view
    gsap.to('.nav', { x: '0', duration: 0.3, ease: 'power2.out' });
  };

  const onHeaderAnimationEnd = () => {
    setHeaderAnimationComplete(true);
  }

  const onResetProjects = () => {
    setProjects(originalProjects);
    setProjectReset(true);
    // animate scroll up
    gsap.to(window, { duration: 0.5, scrollTo: 0, ease: 'power2.out' });
    setTimeout(() => {
      setProjectReset(false);
    }, 100);
  }

  const filterProjectUse = (use, filter) => {
    // use can be an array of strings or a single string
    if (Array.isArray(use)) {
      return use.some(use => use.toLowerCase() === filter.toLowerCase());
    } else {
      return use.toLowerCase() === filter.toLowerCase();
    }
  }

  const onFilterProjects = (filter) => {
    const filteredProjects = originalProjects.filter((project) => project.use && filterProjectUse(project.use, filter));
    setProjects(filteredProjects);
    // animate scroll up
    gsap.to(window, { duration: 0.5, scrollTo: 0, ease: 'power2.out' });
    setProjectFilter(true);
    setTimeout(() => {
      setProjectFilter(false);
    }, 100);
  }

  return (
    <>
      <Header onAnimationEnd={onHeaderAnimationEnd} projects={projects} resetProjects={onResetProjects} filterProjects={onFilterProjects} />
      <main className={styles.pageWrapper}>
        <section className="grid-container">
          {/* <ProjectGrid
            projects={projects}
            // onProjectClick={handleGridItemClick}
          /> */}
          <HomeProjectList projects={projects} headerAnimationComplete={headerAnimationComplete} projectReset={projectReset} projectFilter={projectFilter} />
        </section>
      </main>

      <svg className={styles.cursor} ref={cursorRef} width="40" height="40" viewBox="0 0 40 40">
        <circle className="cursor__inner" cx="20" cy="20" r="10"/>
      </svg>

      {/* {selectedProject && (
        <ProjectOverlay
          project={selectedProject}
          onClose={() => handleCloseProjectOverlay()}
        />
      )} */}
    </>
  );
};

export default Home;