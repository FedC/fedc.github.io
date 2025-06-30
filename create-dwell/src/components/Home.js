import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
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
import ArticleModal from './ArticleModal';

gsap.registerPlugin(InertiaPlugin, ScrollTrigger, Draggable, CSSPlugin, ScrollToPlugin);

initSmoothScrolling();

const Home = () => {
  const [originalProjects, setOriginalProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [headerAnimationComplete, setHeaderAnimationComplete] = useState(false);
  const [projectReset, setProjectReset] = useState(false);
  const [projectFilter, setProjectFilter] = useState('all');
  const [isInfoPageOpen, setIsInfoPageOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [openProjects, setOpenProjects] = useState([]);
  const [mobileMenuState, setMobileMenuState] = useState({
    isOpen: false,
    activeId: 'all'
  });
  const [fullScreenContent, setFullScreenContent] = useState(null);
  const [fullScreenImageLoaded, setFullScreenImageLoaded] = useState(false);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [contactImageUrl, setContactImageUrl] = useState('');
  const [openArticle, setOpenArticle] = useState(null);

  let cursor = null;
  let cursorRef = useRef(null);
  let leftSlateMobileRef = useRef(null);

  useEffect(() => {
    const fetchContactImage = async () => {
      try {
        const docRef = doc(db, 'about', 'main');
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.mainImageUrl) setContactImageUrl(data.mainImageUrl);
        }
      } catch (err) {
        console.error('Error fetching contact image:', err);
      }
    };
    fetchContactImage();
  }, []);

  useEffect(() => {
    if (!projects || !projects.length) return;
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

  useEffect(() => {
    document.body.classList.add('loading');
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectData = [];
      querySnapshot.forEach((doc) => {
        projectData.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectData);
      console.log('projectData', projectData);
      setOriginalProjects(projectData);
      onProjectsLoaded();
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (fullScreenContent) {
      setFullScreenImageLoaded(false); // Reset when new content set
      const img = new Image();
      img.src = fullScreenContent.imageUrl;
      img.onload = () => {
        setFullScreenImageLoaded(true);
      };
    }
  }, [fullScreenContent]);

  const onProjectsLoaded = () => {
    preloadImages('.grid__item-img').then(() => {
      document.body.classList.remove('loading');
      setProjectsLoaded(true);
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
    } else if (use.includes(',')) {
      return use.split(',').some(use => use.toLowerCase() === filter.toLowerCase());
    } else {
      return use.toLowerCase() === filter.toLowerCase();
    }
  }

  const onFilterProjects = (filter) => {
    const filteredProjects = originalProjects.filter((project) => project.use && filterProjectUse(project.use, filter));
    // debugger;
    setProjects(filteredProjects);
    // animate scroll up
    gsap.to(window, { duration: 0.5, scrollTo: 0, ease: 'power2.out' });
    setProjectFilter(true);
    setTimeout(() => {
      setProjectFilter(false);
    }, 100);
  }

  const handleShowInfoPage = (page) => {
    setIsInfoPageOpen(!!page);
    setCurrentPage(page);
  };

  const handleSectionChange = (section) => {
    setCurrentPage(section);
  };

  const handleCloseInfoPage = () => {
    setIsInfoPageOpen(false);
    setCurrentPage(null);
  };

  const handleMobileMenuStateChange = (newState) => {
    setMobileMenuState(newState);
  };

  return (
    <>
      <Header
        onAnimationEnd={onHeaderAnimationEnd}
        projects={projects}
        projectsLoaded={projectsLoaded}
        resetProjects={onResetProjects}
        filterProjects={onFilterProjects}
        onShowInfoPage={handleShowInfoPage}
        isInfoPageOpen={isInfoPageOpen}
        currentPage={currentPage}
        mobileMenuState={mobileMenuState}
        onMobileMenuStateChange={handleMobileMenuStateChange}
      />
      <div className={styles.leftSlateMobile} ref={leftSlateMobileRef}></div>
      <main className={styles.pageWrapper}>
        <section className={styles.listContainer}>
          {/* <ProjectGrid
            projects={projects}
            // onProjectClick={handleGridItemClick}
          /> */}
          <HomeProjectList 
            projects={projects} 
            headerAnimationComplete={headerAnimationComplete} 
            projectReset={projectReset} 
            projectFilter={projectFilter}
            fullScreenContent={fullScreenContent}
            setFullScreenContent={setFullScreenContent}
            openProjects={openProjects}
            setOpenProjects={setOpenProjects}
            setOpenArticle={setOpenArticle}
          />
        </section>

        {fullScreenContent && (
          <div
            className={styles.fullScreenOverlay}
            onClick={() => setFullScreenContent(null)} // Tap to close
          >
            <div className={styles.fullScreenImageWrapper}>
              {!fullScreenImageLoaded ? (
                <div className={styles.projectContentLoader}>
                  <div className={styles.spinner}></div>
                </div>
              ) : (
                <img
                  className={styles.fullScreenImage}
                  src={fullScreenContent.imageUrl}
                  alt="Full screen preview"
                  loading="lazy"
                />
              )}
            </div>
            <div
              className={styles.fullScreenDescription}
              onClick={(e) => e.stopPropagation()} // Prevent closing when scrolling
            >
              <p>{fullScreenContent.description}</p>
            </div>
          </div>
        )}
      </main>

      <svg className={styles.cursor} ref={cursorRef} width="40" height="40" viewBox="0 0 40 40">
        <circle className="cursor__inner" cx="20" cy="20" r="10" />
      </svg>

      <InfoPage
        isOpen={isInfoPageOpen}
        onClose={handleCloseInfoPage}
        currentPage={currentPage}
        onSectionChange={handleSectionChange}
        mobileMenuState={mobileMenuState}
        onMobileMenuStateChange={handleMobileMenuStateChange}
        filterProjects={onFilterProjects}
        resetProjects={onResetProjects}
        contactImageUrl={contactImageUrl}
      />

      <ArticleModal
        open={!!openArticle}
        onClose={() => setOpenArticle(null)}
        article={openArticle}
      />

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