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

  const imageRefs = useRef({});
  const snapTimeout = useRef(null);
  const observerRef = useRef(null);
  // State to track the most visible image
  const [mostVisibleImage, setMostVisibleImage] = useState(null);

  const previousScrollY = useRef(0);
  const velocityScale = useRef(1);
  const minimumScaleOffset = 0.88;
  const maxScaleOffset = 1;
  const previousScale = useRef(1);
  let scrollDirection;
  let contentFirstMoveX = 240;

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

      // Set up the draggable effect for the project list
      setupDraggableToToggleProject();
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
      duration: 2,
      ease: 'ease',
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

    setOpenProjects([...openProjects, projectId]);

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
        const mm = gsap.matchMedia();
        mm.add(
          {
            isDesktop: "(min-width: 768px)", // Desktop logic
            isMobile: "(max-width: 767px)", // Mobile logic
          },
          (context) => {
            const { isDesktop, isMobile } = context.conditions;

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
            const maxWidth = isMobile ? window.innerWidth * 0.98 : window.innerWidth * 0.75; // 75vw on desktop and 98vw on mobile
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
                tl.to(projectRef,
                  {
                    x: -contentFirstMoveX,
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
                      ScrollTrigger.refresh();
                    },
                    onUpdate: () => {
                      // // Dynamically calculate the x position of the main image
                      // const contentX = gsap.getProperty(contentSelector, 'x'); // Content's current x position
                      // // gsap.set(mainImageSelector, { x: contentX - updatedMainImageWidth }); // Position main image accordingly
                      // gsap.set(mainImageWrapper, { x: contentX - updatedMainImageWidth }); // Position main image wrapper accordingly
                      // const spinner = projectRef.querySelector(`.${styles.spinner}`);
                      // if (spinner) {
                      //   gsap.set(spinner, { x: contentX - updatedMainImageWidth });
                      // }
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
                  // const mainImageWrapperEl =  projectRef.querySelector(`.${styles.mainImageWrapper}`);
                  // const mainIMageWrapperRect = mainImageWrapperEl.getBoundingClientRect();
                  const maxScroll = isMobile ? projectContent.offsetWidth + 20 : projectContent.offsetWidth;
                  contentX = Math.max(-maxScroll, Math.min(0, contentX));
                  // console.log('contentX', contentX);

                  gsap.to(projectRef, {
                    x: contentX,
                    duration: 0.1,
                    ease: 'power2.out',
                  });
                }

                projectRef.addEventListener('wheel', handleScroll, { passive: false });
              },
            });

          });

      }, 0);
    }

    return () => {
      projectRef.removeEventListener('wheel', handleScroll);
    };
  };

  const setupDraggableToToggleProject = () => {
    const projectIds = Object.keys(projectRefs.current);
    projectIds.forEach((projectId) => {
      const scrollRef = projectRefs.current[projectId];
      if (!scrollRef) return;


      // open project if dragged to the left

      let dragStartX = 0;
      let dragDistance = 0;
      let isOpen = false;

      Draggable.create(scrollRef, {
        type: 'x',
        bounds: { minX: -50, maxX: 0 }, // Limit the drag to the left
        inertia: true,
        edgeResistance: 0.5,
        onDragStart: function () {
          dragStartX = this.x; // Store the initial drag position
        },
        onDragEnd: function () {
          isOpen = openProjects.includes(projectId);
          dragDistance = this.x - dragStartX;
          // do nothing if project is already open
          if (openProjects.includes(projectId)) return;

          // toggle project if dragged to the left only
          if (dragDistance < -50) {
            toggleProject(projectId);
          }
        },
      });
    });
  };

  const setupDraggable = (projectId) => {
    const scrollRef = projectRefs.current[projectId];
    if (!scrollRef) return;
    const items = scrollRef.querySelectorAll(`.${styles.projectContentItem}`);
    const snappoints = Array.from(items).map((item) => -item.offsetLeft);

    // console.log('snappoints', snappoints);

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)", // Desktop logic
        isMobile: "(max-width: 767px)", // Mobile logic
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        // get width of the project content and scrollRef width
        const gridItemWidth = scrollRef.clientWidth;
        const projectContent = scrollRef.querySelector(`.${styles.projectContent}`);
        const projectContentWidth = projectContent.offsetWidth;
        const totalWidth = projectContentWidth + gridItemWidth;
        let minX = (totalWidth - window.innerWidth / 2) - (gridItemWidth / 2) + 24;
        if (isDesktop) {
          minX = (totalWidth - window.innerWidth / 2) - contentFirstMoveX;
        }

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
            console.log(mostVisibleImage);
            console.log('Snapping to', snapX);
            // gsap.to(scrollRef, {
            //   x: snapX,
            //   duration: 0.5,
            //   ease: 'power2.out',
            // });
          },
          onPress: function (event) {
            if (event.preventDefault) {
              event.preventDefault(); // Stop default touch interaction
            }
          },
        });
      });
  };

  const toggleProjectDescription = (projectId, event) => {
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

  useEffect(() => {
    // if any projects are open, update the marquee z-index behind the projects
    if (openProjects.length) {
      gsap.set(marqueeRef.current, { zIndex: 1 });
    } else {
      gsap.set(marqueeRef.current, { zIndex: 3 });
    }
  }, [openProjects]);

  // Setup IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const mostVisible = entries.reduce(
          (max, entry) =>
            entry.intersectionRatio > (max?.intersectionRatio || 0) ? entry : max,
          null
        );

        if (mostVisible) {
          setMostVisibleImage(mostVisible.target);
        }
      },
      {
        root: null, // Viewport
        threshold: [0.1, 0.5, 1], // Observe different visibility thresholds
      }
    );

    // Attach observer to all images
    Object.values(imageRefs.current).forEach((imageArray) => {
      imageArray.forEach((img) => {
        if (img) observerRef.current.observe(img);
      });
    });

    return () => {
      // Cleanup observer
      observerRef.current.disconnect();
    };
  }, [projects]);

  return (
    <>
      <div className={styles.projectList}>
        <div className={styles.projectListVertical} ref={gridRef}>
          {projects.map(
            (project) => {

              // Initialize an array for each project's images in `imageRefs`
              if (!imageRefs.current[project.id]) {
                imageRefs.current[project.id] = [];
              }

              return project.published && (
                <div
                  key={project.id}
                  className={styles.projectItem}
                  id={`project-${project.id}`}
                  ref={(el) => (projectRefs.current[project.id] = el)}
                  onClick={() => toggleProject(project.id)}
                >
                  <div className={styles.mainImageWrapper} ref={(el) => el && imageRefs.current[project.id].push(el)}>
                    <img
                      className={styles.projectMainImage}
                      src={project.mainImage}
                      alt={project.title}
                    />

                    {project.description && openProjects.includes(project.id) && (
                      <>
                        <div className={styles.projectDescriptionIconButton}>
                          <button className={styles.projectDescriptionButton} onClick={(e) => toggleProjectDescription(project.id, e)}>
                            <span>i</span>
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
                                  ref={(el) => el && imageRefs.current[project.id].push(el)} // Add content to refs
                                >
                                  <img
                                    className={styles.projectImage}
                                    src={content.url}
                                    alt={content.title}
                                  />
                                  {/* <p className={styles.projectImageDescription}>
                                    {content.description}
                                  </p> */}
                                </div>
                              );
                            } else if (content.type === 'image') {
                              return (
                                <div
                                  key={uniqueKey}
                                  className={styles.projectContentItem}
                                  ref={(el) => el && imageRefs.current[project.id].push(el)} // Add content to refs
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
                                  ref={(el) => el && imageRefs.current[project.id].push(el)} // Add content to refs
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
            }
          )}
        </div>
      </div>

      <div className={styles.mark} ref={marqueeRef}>
        <div className={styles.mark__inner} ref={marqueeInnerRef}>

          {
            ['Architecture', 'spacer', 'Interior Design', 'spacer', 'Planning', 'spacer',
              'Architecture', 'spacer', 'Interior Design', 'spacer', 'Planning', 'spacer',
              'Architecture', 'spacer', 'Interior Design', 'spacer', 'Planning',
            ]
              .map((item, index) => (
                item === 'spacer' ?
                  <div key={`spacer-${index}`} className={styles.spacer}></div>
                  :
                  <span key={`item-${index}`}>{item}</span>
              ))}

          {/* <span>Architecture</span>
          <div className={styles.spacer}></div>
          <span>Interior Design</span>
          <div className={styles.spacer}></div>
          <span>Planning</span> */}
        </div>
      </div>
    </>
  );
};

export default HomeProjectList;