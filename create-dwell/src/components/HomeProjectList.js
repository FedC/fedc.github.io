import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadImages } from '../js/utils';
import * as styles from  './HomeProjectList.module.scss';

const HomeProjectList = ({ projects }) => {
  const [openProjects, setOpenProjects] = useState([]);
  const [loadingContentImages, setLoadingContentImages] = useState([]);
  const gridRef = useRef(null);
  const projectRefs = useRef({});

  const previousScrollY = useRef(0);
  const velocityScale = useRef(1);
  const minimumScaleOffset = 0.88;
  const maxScaleOffset = 1;
  const previousScale = useRef(1);
  let draggable;
  let lenis;
  let scrollDirection;
  let currentProjectId;
  let snapping = false;

  useEffect(() => {
    const loadResources = async () => {
      if (!projects?.length) return;
      await preloadImages(`.${styles.projectMainImage}`);

      // await preloadImages('.').then(() => {
      //   document.body.classList.remove('loading');
      // });

      // repeat the items in the grid to create a seamless loop
      // const grid = gridRef.current;
      // const gridItems = Array.from(grid.querySelectorAll('.projectItem'));
      // const gridItemsLength = gridItems.length;
      // const cloneItems = gridItems.map((item) => item.cloneNode(true));
      // cloneItems.forEach((clone, index) => {
      //   clone.classList.add('clone');
      //   clone.dataset.projectId = gridItems[index % gridItemsLength].dataset.projectId;
      //   grid.appendChild(clone);
      // });

      window.addEventListener('wheel', (e) => {
        const scrollingSideWays = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (scrollingSideWays) {
          e.preventDefault();
        }
      }, { passive: false });

      const gridItems = Object.values(projectRefs.current); // Collect all grid items

      scaleListItems();

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top center',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          scrollDirection = velocity > 0 ? 1 : -1;
          velocityScale.current = Math.max(1 - Math.abs(velocity) / 1000, minimumScaleOffset);
          updateVelocityScale(velocity);
          applySkewEffect(velocity);
          moveNavToScrollVelocity(velocity);
        },
      });
    };

    loadResources();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('wheel', () => { });
    };
  }, [projects]);

  useEffect(() => {
    scaleListItems();
  }, [openProjects]);

  const scaleListItems = () => {
    const listItems = document.querySelectorAll(`${styles.projectItem}`);
    const listItemsArray = Array.from(listItems);
    listItemsArray.forEach((box, index) => {
      const projectId = box.dataset.projectId;
      if (openProjects.includes(projectId)) {
        return;
      }

      gsap.to(box, {
        scrollTrigger: {
          trigger: box,
          start: "bottom center",
          end: "bottom top",
          scrub: true,
        },
        scale: .9,
        duration: 0.5,
        ease: 'sine',
      });

      gsap.fromTo(box, {
        scale: .9,
      },
        {
          scrollTrigger: {
            trigger: box,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
          scale: 1,
          duration: 0.5,
          ease: 'sine',
        });
    });
  };

  const updateVelocityScale = (velocity) => {
    const gridElement = gridRef.current;
    if (!gridElement) return;

    // console.log('velocity', velocity);

    const scrollDirection = velocity > 0 ? 1 : -1;
    const gridItems = Object.values(projectRefs.current);
    if (!gridItems.length) return;

    const currentScrollY = window.scrollY;
    const differenceScroll = Math.abs(currentScrollY - previousScrollY.current);
    previousScrollY.current = currentScrollY;

    const calcScale = Math.max(
      velocityScale.current - differenceScroll / 200,
      minimumScaleOffset
    );

    if (previousScale.current !== calcScale) {
      const scaleDirection = calcScale > previousScale.current ? 1 : -1;
      let scale = Math.max(
        Math.min(calcScale, maxScaleOffset),
        minimumScaleOffset
      );
      // if scaling up and scale is near maxScaleOffset, scale the grid items to 1
      // if (scaleDirection === 1 && scale > 0.9) {
      //   scale = 1;
      // }

      gsap.to(gridElement, {
        scale,
        duration: 1,
        transformOrigin: 'center center',
        ease: 'power2.out',
        overwrite: true,
        // onComplete: snapToGrid,
        snap: {
          snapTo: 1,
          duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
          delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
          ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
        },
      });

      previousScale.current = calcScale;
    }
  };

  let proxy = { y: 0 };
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const applySkewEffect = (velocity) => {
    // make a liquid effect
    const factor = velocityScale.current - Math.abs(velocity) / 200;
    const calcY = clamp(proxy.y - velocity / 200, -10, 10);
    const calcScale = clamp(1 + Math.abs(velocity) / 1000, 1, 1.1);

    const mainImages = document.querySelectorAll(`.${styles.projectMainImage}`);
    const mainImagesArray = Array.from(mainImages);

    mainImagesArray.forEach((ref) => {
      if (!ref) return;
      gsap.to(ref, {
        y: -calcY,
        // scale: calcScale,
        duration: 0.8,
        ease: 'power3',
      });
    });

    // Reset skew back to 0 gradually
    gsap.to(proxy, {
      y: 0,
      // scale: 1,
      duration: 0.8,
      ease: 'power3',
    });
  };

  const navProxy = { x: 0 }

  const moveNavToScrollVelocity = (velocity) => {
    const nav = document.querySelector('#verticalnav');
    if (!nav) return;
  
    // range from 0 to velocityScale.current * 10
    // const calcX = gsap.utils.mapRange(0, 10000, 0, document.body.clientWidth, Math.abs(velocity));
    // navProxy.x = calcX;

    // gsap.to(nav, {
    //   x: calcX,
    //   duration: 2,
    //   ease: 'power2.out',
    // });

    // gsap.to(navProxy, {
    //   x: 0,
    //   duration: 2,
    //   ease: 'power2.out',
    // });
  };

  const scrollToProject = (projectId) => {
    return new Promise((resolve) => {
      // Wait for the scroll and animation to complete
      gsap.to(gridRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'ease.out',
        onComplete: () => {
          const top = document.getElementById(`project-${projectId}`).offsetTop - 100;
          // Scroll to the project
          // window.scrollTo({ top, behavior: 'smooth' });
          gsap.to(window, {
            scrollTo: { y: top, autoKill: false },
            duration: 1,
            ease: 'power2.out',
            onComplete: resolve,
          });
          resolve();
        }
      });
    });
  };

  const toggleProject = async (projectId) => {
    await scrollToProject(projectId);

    if (openProjects.includes(projectId)) {
      return;
    }

    setOpenProjects((prev) => [...prev, projectId]);

    // Preload images in the project content
    const contentSelector = `#project-${projectId} .${styles.projectContent}`;
    const mainImageSelector = `#project-${projectId} .${styles.projectMainImage}`;
    const contentRef = projectRefs.current[projectId];
    const projectRef = projectRefs.current[projectId];

    if (contentRef && projectRef) {
      setLoadingContentImages((prev) => [...prev, projectId]);
      await preloadImages(`#project-${projectId} img`);
      const mainImage = projectRef.querySelector(`.${styles.projectMainImage}`);
      const mainImageWidth = mainImage ? mainImage.clientWidth : 0;

      gsap.set(`#project-${projectId} .${styles.projectContent}`, { x: mainImageWidth, opacity: 0 });
      gsap.set(`#project-${projectId}`, { overflow: 'visible' });

      ScrollTrigger.disable();
      const tl = gsap.timeline();
      tl.to(gridRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'ease.out',
      });
      tl.to(`#project-${projectId}`, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'ease.out',
      });
      tl.fromTo(contentSelector, {
        duration: 0.5,
        opacity: 0,
      }, {
        opacity: 1,
        ease: 'ease.out',
      });
      tl.delay(0.25);
      tl.fromTo(contentSelector, {
          x: mainImageWidth,
        },
        {
          x: mainImageWidth - 150,
          ease: 'power2.out',
          duration: 0.5,
          onComplete: () => {
            setLoadingContentImages((prev) => prev.filter((id) => id !== projectId));
            ScrollTrigger.enable();
          },
          onUpdate: () => {
            // Dynamically calculate the x position of the main image
            const contentX = gsap.getProperty(contentSelector, 'x'); // Content's current x position
            gsap.set(mainImageSelector, { x: contentX - mainImageWidth }); // Position main image accordingly
            const spinner = projectRef.querySelector(`.${styles.spinner}`);
            if (spinner) {
              gsap.set(spinner, { x: contentX - mainImageWidth });
            }
          },
        },
      );

      const projectContent = document.querySelector(`#project-${projectId} .${styles.projectContent}`);

      scrollToProject(projectId);
      ScrollTrigger.refresh();

      function handleScroll(e) {
        const scrollingSideWays = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (!scrollingSideWays) {
          console.log('Scrolling vertically');
          e.preventDefault();
          return;
        }

        gsap.to(
          gridRef.current,
          {
            scale: 1,
            duration: 0.5,
            ease: 'ease.out',
          },
        );

        const deltaX = e.deltaX;
        let contentX = gsap.getProperty(projectRef, 'x');
        contentX -= deltaX * 5.5; // Adjust scroll speed (0.5 is a multiplier)

        // Set new x position with bounds checking
        const maxScroll = projectContent.offsetWidth - projectRef.offsetWidth;
        contentX = Math.max(-maxScroll, Math.min(0, contentX));
        console.log('contentX', contentX);
        gsap.to(projectRef, { x: contentX, duration: 0.1,
          ease: 'power2.out',
        });
      }
    
      projectRef.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      projectRef.removeEventListener('wheel', handleScroll);
    };
  };

  useEffect(() => {
    openProjects.forEach(async (projectId) => {
      const scrollRef = projectRefs.current[projectId];
      if (!scrollRef) return;

      await preloadImages(`#project-${projectId} img`);

      const items = scrollRef.querySelectorAll(`.${styles.projectContentItem}`);
      // snappoints is the x position of projectContentHorizontal needs to be for each project
      // to be at the center of the window
      const snappoints = Array.from(items).reduce((acc, item, index) => {
        const x = -item.offsetLeft;
        acc.push(x);
        return acc;
      }, []);
      console.log('snappoints', snappoints);

      const moveMainImage = (self) => {
        // move main image in same direction
        // const contentX = gsap.getProperty(scrollRef, 'x');
        // const contentWidth = scrollRef.clientWidth;
        // // const mainImageSelector = `#project-${projectId} .projectMainImage`;
        // const contentItems = document.querySelector(`#project-${projectId} .projectContentHorizontal .projectContentItem`);
        // const lastProjectContent = contentItems[contentItems.length - 1];
        // const lastProjectContentX = gsap.getProperty(lastProjectContent, 'x');
        // console.log('lastProjectContentX', lastProjectContentX, contentWidth);

        // if (Math.abs(lastProjectContentX) > contentWidth) {
        //   gsap.set(scrollRef, { x: -contentWidth });
        // } else if (lastProjectContentX > 0) {
        //   gsap.set(scrollRef, { x: 0 });
        // } else {
        //   // gsap.set(mainImageSelector, { x: contentX - 150 });
        // }
      };

      // get width of the project content and scrollRef width
      const contentWidth = scrollRef.clientWidth;
      const projectContent = scrollRef.querySelector(`.${styles.projectContent}`);
      const projectContentWidth = projectContent.offsetWidth;
      const totalWidth = projectContentWidth + contentWidth;
      const minX = (totalWidth - window.innerWidth / 2) - 150;

      draggable = Draggable.create(scrollRef, {
        type: 'x',
        bounds: { minX: -minX, maxX: 0 },
        inertia: true,
        // edgeResistance: .1,
        onDrag: moveMainImage,
        onThrowUpdate: moveMainImage,
        onDragEnd: () => {
          // console.log('Drag end');
          const contentX = gsap.getProperty(scrollRef, 'x');
          const snap = gsap.utils.snap(snappoints);
          const snapX = snap(contentX);
          console.log('contentX', contentX);
          console.log(scrollRef.clientWidth);
          // gsap.to(scrollRef, {
          //   x: -snapX,
          //   duration: 0.5,
          //   ease: 'power2.out',
          // });
        },
      });

      // Draggable.create(scrollRef, {
      //   type: 'x',
      //   bounds: { minX: -scrollRef.offsetWidth, maxX: 0 },
      //   inertia: true,
      //   onDrag: () => {
      //     contentX = gsap.getProperty(scrollRef, 'x');
      //   },
      // });

    });
  }, [openProjects]);

  return (
    <div className={styles.projectList}>
      <div className={styles.projectListVertical} ref={gridRef}>
        {projects.map(
          (project) =>
            project.published && (
              <div
                key={project.id}
                className={styles.projectItem}
                id={`project-${project.id}`}
                ref={(el) => (projectRefs.current[project.id] = el)}
                onClick={() => toggleProject(project.id)}
              >
                <img
                  className={styles.projectMainImage}
                  src={project.mainImage}
                  alt={project.title}
                />

                {loadingContentImages.includes(project.id) && (
                  <div className={styles.spinner}></div>)}

                {openProjects.includes(project.id) && (
                  <div className={styles.projectContent}>
                    <div className={styles.projectContentHorizontal}>
                      <div className={styles.projectContentItem}>
                        <div className={styles.projectHeader}>
                          <h2>{project.title}</h2>
                          <p>{project.location}</p>
                        </div>
                      </div>

                      {project.content &&
                        project.content.map((content, index) => {
                          const uniqueKey =
                            content.id || content.url || `${content.type}-${index}`;

                          if (content.type === 'image' && content.description) {
                            return (
                              <div
                                key={uniqueKey}
                                className={styles.projectContentItem}
                              >
                                <img
                                  className={styles.projectImage}
                                  src={content.url}
                                  alt={content.title}
                                />
                                <p className={styles.projectImageDescription}>
                                  {content.description}
                                </p>
                              </div>
                            );
                          } else if (content.type === 'image') {
                            return (
                              <div
                                key={uniqueKey}
                                className={styles.projectContentItem}
                              >
                                <img
                                  className={styles.projectImage}
                                  src={content.url}
                                  alt={content.title}
                                />
                              </div>
                            );
                          } else if (content.type === 'text') {
                            return (
                              <div
                                key={uniqueKey}
                                className={styles.projectContentItem}
                              >
                                <div className={styles.projectText}>
                                  {content.text}
                                </div>
                              </div>
                            );
                          } else if (content.type === 'quote') {
                            return (
                              <blockquote
                                key={uniqueKey}
                                className={styles.projectQuote}
                              >
                                {content.text}
                              </blockquote>
                            );
                          }
                          return null;
                        })}
                    </div>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default HomeProjectList;