import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadImages } from '../js/utils';
import * as styles from './HomeProjectList.module.scss';

const HomeProjectList = ({ projects, headerAnimationComplete }) => {
  const [openProjects, setOpenProjects] = useState([]);
  const [loadingContentImages, setLoadingContentImages] = useState([]);
  const gridRef = useRef(null);
  const projectRefs = useRef({});
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);

  const previousScrollY = useRef(0);
  const velocityScale = useRef(1);
  const minimumScaleOffset = 0.88;
  const maxScaleOffset = 1;
  const previousScale = useRef(1);
  let lenis;
  let scrollDirection;
  let currentProjectId;
  let snapping = false;
  let contentFirstMoveX = 160;


  useEffect(() => {
    gsap.set(gridRef.current, { scale: 1, opacity: 0, y: '10vh' });
    document.body.style.overflow = 'hidden';

    gsap.set(window, {
      scrollTo: 0,
    });

    if (headerAnimationComplete) {
      console.log('Header animation completed, starting project list animations');
      // Trigger any animations or effects for the project list here
      animation();
    }
  }, [headerAnimationComplete]);

  useEffect(() => {
    const loadResources = async () => {
      if (!projects?.length) return;
      await preloadImages(`.${styles.projectMainImage}`);

      if (headerAnimationComplete) {
        animation();
      }
    };

    loadResources();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('wheel', () => { });
    };
  }, [projects, headerAnimationComplete]);

  useEffect(() => {
    // scaleListItems();
  }, [openProjects]);

  const animation = async () => {
    await preloadImages(`.${styles.projectMainImage}`);

    gsap.set(gridRef.current, { y: '100vh' });

    gsap.to(gridRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.6,
      ease: 'power2.out',
      onComplete: () => {
        document.body.classList.remove('loading');
        // allow scrolling
        document.body.style.overflow = 'auto';

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
      },
    });

    // repeat the items in the grid to create a seamless loop
    const grid = gridRef.current;
    const gridItems = Array.from(grid.querySelectorAll('.projectItem'));
    const gridItemsLength = gridItems.length;
    const cloneItems = gridItems.map((item) => item.cloneNode(true));
    cloneItems.forEach((clone, index) => {
      clone.classList.add('clone');
      clone.dataset.projectId = gridItems[index % gridItemsLength].dataset.projectId;
      grid.appendChild(clone);
    });

    window.addEventListener('wheel', (e) => {
      const scrollingSideWays = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (scrollingSideWays) {
        e.preventDefault();
      }
    }, { passive: false });

    // const gridItems = Object.values(projectRefs.current); // Collect all grid items

    // scaleListItems();
    // infiniteLoopMarquee();
    animateMarqueeOnScroll();
  };

  const infiniteLoopMarquee = () => {
    const marquee = marqueeRef.current;
    const marqueeInner = marqueeInnerRef.current;
    const marqueeItems = Array.from(marqueeInner.children);
    const getMarqueeInnerWidth = () => marqueeInner.scrollWidth;
    const ensureSufficientWidth = () => {
      const windowScrollHeight = document.documentElement.scrollHeight;
      let currentWidth = getMarqueeInnerWidth();
      while (currentWidth < windowScrollHeight) {
        const cloneItems = marqueeItems.map((item) => item.cloneNode(true));
        cloneItems.forEach((clone) => {
          clone.classList.add('clone');
          marqueeInner.appendChild(clone);
        });
        currentWidth = getMarqueeInnerWidth();
      }
    };
    ensureSufficientWidth();
    gsap.set(marqueeInner, { x: '100%' });
  };

  const animateMarqueeOnScroll = () => {
    gsap.to(marqueeInnerRef.current, {
      opacity: 1,
      duration: 1,
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top=+25% center',
        end: 'bottom center+=50%',
        scrub: true,
      },
    }).fromTo(
      marqueeInnerRef.current,
      { x: '100vw' },
      { x: '-100%', ease: 'sine' }
    );
  };

  const scaleListItems = () => {
    const listItems = Object.values(projectRefs.current);
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
    const mainImageWrapper = `#project-${projectId} .${styles.mainImageWrapper}`;
    const mainImageSelector = `#project-${projectId} .${styles.projectMainImage}`;
    const contentRef = projectRefs.current[projectId];
    const projectRef = projectRefs.current[projectId];

    const mainImage = projectRef.querySelector(`.${styles.projectMainImage}`);
    gsap.set(mainImageSelector, {
      willChange: 'width, height', // Hint the browser to prepare for these changes
    });
    gsap.set(mainImageWrapper, {
      willChange: 'width, height', // Hint the browser to prepare for these changes
    });

    let updatedMainImageWidth = 0; // To store the updated width
    let updatedMainImageHeight = 0; // To store the updated height

    if (contentRef && projectRef) {
      setLoadingContentImages((prev) => [...prev, projectId]);

      ScrollTrigger.disable();

      setTimeout(() => {

        const tl = gsap.timeline();

        tl.to(mainImageSelector, {
          filter: 'brightness(0.5)',
          duration: 0.5,
          ease: 'ease.out',
        }, '<');

        tl.to(gridRef.current, {
          scale: 1,
          duration: 0.5,
          ease: 'ease.out',
        }, '<');

        tl.to(`#project-${projectId}`, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'ease.out',
        }, '<');

        gsap.set(contentSelector, { opacity: 0 });
        const maxWidth = window.innerWidth * 0.75; // 75vw
        const maxHeight = window.innerHeight * 0.75; // 75vh
        const mainImageWidth = mainImage ? mainImage.clientWidth : 0;
        const mainImageHeight = mainImage ? mainImage.clientHeight : 0;
        const aspectRatio = mainImageWidth / mainImageHeight;
        let targetWidth = maxWidth;
        let targetHeight = maxWidth / aspectRatio;

        if (targetHeight > maxHeight) {
          targetHeight = maxHeight;
          targetWidth = maxHeight * aspectRatio;
        }

        // Use transform: scale for smoother animation
        const scaleX = targetWidth / mainImageWidth;
        const scaleY = targetHeight / mainImageHeight;
        const scale = Math.min(scaleX, scaleY);

        // gsap.set(mainImageSelector, { maxWidth: '100%' });

        tl.fromTo(mainImageSelector, {
          width: mainImageWidth,
        }, {
          width: targetWidth,
          maxWidth: `${targetWidth}px`,
          duration: 0.5,
          ease: 'ease.out',
          onComplete: async () => {
            const updatedMainImage = projectRef.querySelector(`.${styles.projectMainImage}`);
            updatedMainImageWidth = updatedMainImage ? updatedMainImage.clientWidth : 0;
            updatedMainImageHeight = updatedMainImage ? updatedMainImage.clientHeight : 0;

            await preloadImages(`#project-${projectId} img`);
            gsap.set(`#project-${projectId} .${styles.projectContent}`, { x: updatedMainImageWidth, opacity: 0 });
            gsap.set(`#project-${projectId}`, { overflow: 'visible' });
            gsap.set(contentSelector, { x: updatedMainImageWidth, opacity: 0 });
            gsap.set(projectRef.querySelector(`.${styles.projectDescriptionIconButton}`), { display: 'flex' });

            tl.fromTo(contentSelector, {
              duration: 0.5,
              opacity: 0,
            }, {
              opacity: 1,
              ease: 'ease.out',
            });
            tl.delay(0.25);
            tl.to(contentSelector,
              {
                x: updatedMainImageWidth - contentFirstMoveX,
                ease: 'power2.out',
                duration: 0.5,
                onComplete: () => {
                  tl.to(mainImageSelector, {
                    filter: 'brightness(1)',
                    duration: 0.1,
                    ease: 'ease.out',
                  });
                  setLoadingContentImages((prev) => prev.filter((id) => id !== projectId));
                  ScrollTrigger.enable();
                },
                onUpdate: () => {
                  // Dynamically calculate the x position of the main image
                  const contentX = gsap.getProperty(contentSelector, 'x'); // Content's current x position
                  // gsap.set(mainImageSelector, { x: contentX - updatedMainImageWidth }); // Position main image accordingly
                  gsap.set(mainImageWrapper, { x: contentX - updatedMainImageWidth }); // Position main image wrapper accordingly
                  const spinner = projectRef.querySelector(`.${styles.spinner}`);
                  if (spinner) {
                    gsap.set(spinner, { x: contentX - updatedMainImageWidth });
                  }
                },
              },
            );

            const projectContent = document.querySelector(`#project-${projectId} .${styles.projectContent}`);

            scrollToProject(projectId);
            ScrollTrigger.refresh();
            setupDraggable(projectId);

            function handleScroll(e) {
              const scrollingSideWays = Math.abs(e.deltaX) > Math.abs(e.deltaY);
              if (!scrollingSideWays) {
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
              const maxScroll = projectContent.offsetWidth - projectRef.offsetWidth + (window.innerWidth - 100);
              contentX = Math.max(-maxScroll, Math.min(0, contentX));

              gsap.to(projectRef, {
                x: contentX, duration: 0.1,
                ease: 'power2.out',
              });
            }

            projectRef.addEventListener('wheel', handleScroll, { passive: false });
          },
        });

      }, 0);
    }

    return () => {
      projectRef.removeEventListener('wheel', handleScroll);
    };
  };

  const setupDraggable = (projectId) => {
    const scrollRef = projectRefs.current[projectId];
    if (!scrollRef) return;
    const items = scrollRef.querySelectorAll(`.${styles.projectContentItem}`);
      // snappoints is the x position of projectContentHorizontal needs to be for each project
      // to be at the center of the window
      const snappoints = Array.from(items).reduce((acc, item, index) => {
        const x = -item.offsetLeft;
        acc.push(x);
        return acc;
      }, []);
      console.log('snappoints', snappoints);

      // get width of the project content and scrollRef width
      const contentWidth = scrollRef.clientWidth;
      const projectContent = scrollRef.querySelector(`.${styles.projectContent}`);
      const projectContentWidth = projectContent.offsetWidth;
      const totalWidth = projectContentWidth + contentWidth;
      const minX = (totalWidth - window.innerWidth / 2) - contentFirstMoveX;

      Draggable.create(scrollRef, {
        type: 'x',
        bounds: { minX: -minX, maxX: 0 },
        inertia: true,
        // edgeResistance: .1,
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
  };

  toggleProjectDescription = (projectId, event) => {
    event.stopPropagation();
    const projectRef = projectRefs.current[projectId];
    const projectDescription = projectRef.querySelector(`.${styles.projectDescription}`);
    const projectDescriptionButton = projectRef.querySelector(`.${styles.projectDescriptionButton}`);
    const projectDescriptionIconButton = projectRef.querySelector(`.${styles.projectDescriptionIconButton}`);
    if (!projectDescription) return;

    if (projectDescription.style.opacity === '1') {
      gsap.to(projectDescription, {
        y: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      });

      gsap.to(projectDescriptionButton, {
        scale: 1,
        duration: 0.5,
        ease: 'bounce.out',
      });
    } else {
      gsap.to(projectDescription, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        yoyo: true,
      });

      gsap.to(projectDescriptionButton, {
        scale: 1.1,
        duration: 0.5,
        ease: 'bounce.out',
      });
    }
  };

  return (
    <>
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
                  <div className={styles.mainImageWrapper}>
                    <img
                      className={styles.projectMainImage}
                      src={project.mainImage}
                      alt={project.title}
                    />

                    {project.description && (
                      <>
                        <div className={styles.projectDescriptionIconButton}>
                          <button className={styles.projectDescriptionButton} onClick={(e) => toggleProjectDescription(project.id, e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                          </button>
                        </div>
                        <div className={styles.projectDescription} onClick={(e) => toggleProjectDescription(project.id, e)}>
                          <p>{project.description}</p>
                        </div>
                      </>
                    )}

                    {loadingContentImages.includes(project.id) && (
                      <div className={styles.spinner}></div>)}
                  </div>

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

      <div className={styles.mark} ref={marqueeRef}>
        <div className={styles.mark__inner} ref={marqueeInnerRef}>
          <span>Architecture</span>
          <span>Interior Design</span>
          <a href={'#residential-0'}><span>Residential</span></a>
          <span>Commercial</span>
          <span>Cultural</span>
          <div className={styles.spacer}></div>
        </div>
      </div>
    </>
  );
};

export default HomeProjectList;