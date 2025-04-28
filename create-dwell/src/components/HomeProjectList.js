import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadImages } from '../js/utils';
import * as styles from './HomeProjectList.module.scss';
import Footer from './Footer';
import * as footerStyles from './Footer.module.scss';

const HomeProjectList = ({ projects, headerAnimationComplete, projectReset, projectFilter }) => {
  const listRef = useRef(null);
  const footerRef = useRef(null);
  const [openProjects, setOpenProjects] = useState([]);
  const [loadingContentImages, setLoadingContentImages] = useState([]);
  const [imageAspectRatios, setImageAspectRatios] = useState({});
  const gridRef = useRef(null);
  const projectRefs = useRef({});
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);

  const imageRefs = useRef({});
  const snapTimeout = useRef(null);
  const observerRef = useRef(null);
  // State to track the most visible image
  const [mostVisibleImage, setMostVisibleImage] = useState(null);
  const [fullScreenContent, setFullScreenContent] = useState(null);

  const previousScrollY = useRef(0);
  const velocityScale = useRef(1);
  const minimumScaleOffset = 0.88;
  const maxScaleOffset = 1;
  const previousScale = useRef(1);
  let scrollDirection;
  let contentFirstMoveX = 240;
  const scrollHintRefs = useRef({});

  useEffect(() => {
    if (!openProjects.length) return;

    openProjects.forEach(projectId => {
      const hint = scrollHintRefs.current[projectId];
      if (!hint) return;
      gsap.to(hint, { opacity: 1, duration: 0.5 });

      // const timeout = setTimeout(() => {
      //   gsap.to(hint, { opacity: 0, duration: 0.5 });
      // }, 10000);

      // return () => clearTimeout(timeout);
    });
  }, [openProjects]);

  const reset = () => {
    projects.forEach((project) => {
      if (openProjects.includes(project.id)) {
        closeProject(project.id);
      }
    });
    setupFooterAnimation();
  }

  useEffect(() => {
    if (projectReset) {
      reset();
    }
  }, [projectReset]);

  useEffect(() => {
    if (!projects) return;

    if (projectFilter) {
      setupFooterAnimation();
    }
  }, [projectFilter]);

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
      // setupDraggableToToggleProject(); // removed for now because it's causing issues

      setupFooterAnimation();
    }
  }, [headerAnimationComplete]);

  useEffect(() => {
    const calculateAspectRatios = async () => {
      if (!projects) return;

      const aspectRatios = {};
      for (const project of projects) {
        for (const content of project.content || []) {
          if (content.type === 'image') {
            const img = new Image();
            img.src = content.url;

            await new Promise((resolve) => {
              img.onload = () => {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                aspectRatios[content.url] = aspectRatio;
                resolve();
              };
              img.onerror = resolve; // Ignore errors
            });
          }
        }
      }

      setImageAspectRatios(aspectRatios);
    };

    calculateAspectRatios();
    console.log('Aspect ratios calculated:', imageAspectRatios);
  }, [projects]);

  const closeProject = async (projectId) => {
    const projectRef = projectRefs.current[projectId];
    if (!projectRef) return;

    const contentSelector = `#project-${projectId} .${styles.projectContent}`;
    const mainImageSelector = `#project-${projectId} .${styles.projectMainImage}`;
    const mainImageWrapper = `#project-${projectId} .${styles.mainImageWrapper}`;

    ScrollTrigger.disable();

    const tl = gsap.timeline();
    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: "(min-width: 768px)", // Desktop logic
        isMobile: "(max-width: 767px)", // Mobile logic
      },
      (context) => {
        const { isDesktop } = context.conditions;

        tl.to(gridRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
        });

        // Move content out
        tl.to(contentSelector, {
          opacity: 1,
          x: '100vw',
          duration: 0.5,
          ease: 'power3.out',
        }, '<');

        // Reset project image size
        tl.to(mainImageSelector, {
          scale: .5,
          filter: 'brightness(1)',
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(mainImageSelector, {
              width: '100%',
              height: 'auto',
              maxWidth: isDesktop ? '500px' : '268px',
              scale: 1,
            });
          },
        }, '<');

        // Reset position of the project
        tl.to(projectRef, {
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            setOpenProjects((prev) => prev.filter((id) => id !== projectId));
            ScrollTrigger.enable();
            ScrollTrigger.refresh();
          },
        });

      });

    // Remove wheel event listener
    // projectRef.removeEventListener('wheel', handleScroll);
  };

  const setupFooterAnimation = () => {
    if (!headerAnimationComplete) return;

    const footerItems = footerRef.current.querySelectorAll(`.${footerStyles.footerInner} > div`);

    gsap.fromTo(
      footerRef.current.querySelector(`.${footerStyles.footer}`),
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current.querySelector(`.${footerStyles.footer}`),
          start: 'top bottom', // Animation starts when footer is just about to enter the viewport
          end: 'center bottom', // Animation ends when the footer's center is in the viewport
          scrub: true, // Makes the animation smoother as the user scrolls
          toggleActions: 'play none none none', // Play once
        },
      }
    );

    // Stagger animation for child elements
    gsap.fromTo(
      footerItems,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: footerRef.current.querySelector(`.${footerStyles.footer}`),
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
      }
    );
  };

  const getAspectRatioClass = (ratio) => {
    if (ratio > 1.1) return styles.aspectLandscape; // Landscape
    if (ratio < 0.9) return styles.aspectPortrait;  // Portrait
    return styles.aspectSquare;                    // Square
  };

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

  const scaleListItems = () => {
    const listItems = Object.values(projectRefs.current);
    const listItemsArray = Array.from(listItems);

    listItemsArray.forEach((box, index) => {
      if (!box) return;

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
        scale: 1,
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

  const animation = async () => {
    await preloadImages(`.${styles.projectMainImage}`);

    gsap.set(gridRef.current, { y: '100vh' });
    gsap.set(footerRef.current, { opacity: 0 });

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
            // scaleBackWithScrollVelocity(velocity);
            applySkewEffect(velocity);
            moveNavToScrollVelocity(velocity);
          },
        });

        // scaleListItems();
      },
    });

    gsap.to(footerRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'ease',
    }, '<');

    window.addEventListener('wheel', (e) => {
      const scrollingSideWays = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (scrollingSideWays) {
        e.preventDefault();
      }
    }, { passive: false });

    // const gridItems = Object.values(projectRefs.current); // Collect all grid items

    animateMarqueeOnScroll();
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
        onUpdate: (self) => {
          // const progress = self.progress;
          // console.log(progress);
        },
      },
    }).fromTo(
      marqueeInnerRef.current,
      { x: '100vw' },
      { x: '-100%', ease: 'sine' }
    );
  };

  const resetScale = () => {
    const gridElement = gridRef.current;
    if (gridElement) {
      gsap.to(gridElement, {
        scale: 1,
        duration: 1.22,
        ease: 'power2.inOut',
      });
    }
  };

  let proxy = { y: 0 };
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const applySkewEffect = (velocity) => {
    // make a liquid effect
    // const factor = velocityScale.current - Math.abs(velocity) / 200;
    const calcY = clamp(proxy.y - velocity / 200, -10, 10);
    // const calcScale = clamp(1 + Math.abs(velocity) / 1000, 1, 1.1);

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

  // const navProxy = { x: 0 }

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
    if (openProjects.includes(projectId)) {
      scrollToProject(projectId);
      return;
    }

    const projectRef = projectRefs.current[projectId];

    if (!projectRef) return;

    setOpenProjects([...openProjects, projectId]);

    // Preload images in the project content
    const contentSelector = `#project-${projectId} .${styles.projectContent}`;
    const mainImageWrapper = `#project-${projectId} .${styles.mainImageWrapper}`;
    const mainImageSelector = `#project-${projectId} .${styles.projectMainImage}`;
    const mainImage = projectRef.querySelector(`.${styles.projectMainImage}`);

    gsap.set(mainImageSelector, {
      willChange: 'width, height', // Hint the browser to prepare for these changes
    });
    gsap.set(mainImageWrapper, {
      willChange: 'width, height', // Hint the browser to prepare for these changes
    });

    let updatedMainImageWidth = 0; // To store the updated width
    let updatedMainImageHeight = 0; // To store the updated height

    setLoadingContentImages((prev) => [...prev, projectId]);

    setTimeout(() => {
      gsap.set(contentSelector, { opacity: 0, x: '100vw' });

      ScrollTrigger.disable();

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)", // Desktop logic
          isMobile: "(max-width: 767px)", // Mobile logic
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions;

          const tl = gsap.timeline();

          tl.to(projectRef.querySelector(`.${styles.projectTitle}`), { y: '-100%', opacity: 0, duration: 0.1, ease: 'ease.inOut' }, '<');
          tl.to(projectRef.querySelector(`.${styles.projectTitle}`), { height: 0 });

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

          gsap.set(mainImageSelector, {
            maxWidth: `${targetWidth}px`,
            // maxHeight: `${targetHeight}px` 
          });

          tl.fromTo(mainImageSelector, {
            opacity: 1,
            width: mainImageWidth,
            height: mainImageHeight,
          }, {
            width: targetWidth,
            height: targetHeight,
            opacity: 1,
            duration: 0.5,
            ease: 'ease.out',
            onComplete: async () => {
              const updatedMainImage = projectRef.querySelector(`.${styles.projectMainImage}`);
              updatedMainImageWidth = updatedMainImage ? updatedMainImage.clientWidth : 0;
              updatedMainImageHeight = updatedMainImage ? updatedMainImage.clientHeight : 0;

              await preloadImages(`#project-${projectId} img`);

              gsap.set(contentSelector, { x: updatedMainImageWidth, opacity: 0 });
              gsap.set(`#project-${projectId}`, { overflow: 'visible' });
              gsap.set(projectRef.querySelectorAll(`.${styles.projectDescriptionIconButton}`), { display: 'flex' });

              tl.fromTo(contentSelector, {
                duration: 1,
                opacity: 0,
              }, {
                opacity: 1,
                ease: 'ease.out',
              });
              // tl.delay(0.25);
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

                    setTimeout(() => {
                      const projectImage = document.querySelectorAll(`#project-${projectId} .${styles.projectImage}`);
                      const projectItemInner = document.querySelectorAll(`#project-${projectId} .${styles.projectItemInner}`);
                      const projectItemInnerHeight = projectItemInner[0].clientHeight;
                      projectImage.forEach((img) => {
                        gsap.set(img, { height: projectItemInnerHeight });
                      });
                    }, 0);

                    ScrollTrigger.enable();
                    ScrollTrigger.refresh();

                    const isScrolling = Math.abs(velocityScale.current) > 40;
                    const isInView = ScrollTrigger.isInViewport(projectRef);
                    if (isInView && !isScrolling) {
                      scrollToProject(projectId);
                    }
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
                }, '<');

              const projectContent = document.querySelector(`#project-${projectId} .${styles.projectContent}`);

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

    }, 100);

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
        bounds: { minX: -50, maxX: 0, maxY: 0, minY: 0 }, // Limit the drag to the left
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

  const waitUntilElementExists = (selector, callback) => {
    const el = document.querySelector(selector);
    if (el) {
      callback(el);
    } else {
      setTimeout(() => {
        waitUntilElementExists(selector, callback);
      }, 100);
    }
  };

  const setupDraggable = (projectId) => {
    const scrollRef = projectRefs.current[projectId];
    if (!scrollRef) return;
    const items = scrollRef.querySelectorAll(`.${styles.projectContentItem}`);
    const snappoints = Array.from(items).map((item) => -item.offsetLeft);

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
          bounds: { minX: -minX, maxX: 0, maxY: 0, minY: 0 },
          inertia: true,
          // edgeResistance: .1,
          onDragEnd: () => {
            // console.log('Drag end');
            const contentX = gsap.getProperty(scrollRef, 'x');
            const snap = gsap.utils.snap(snappoints);
            const snapX = snap(contentX);
            // console.log(mostVisibleImage);
            // console.log('Snapping to', snapX);
            // gsap.to(scrollRef, {
            //   x: snapX,
            //   duration: 0.5,
            //   ease: 'power2.out',
            // });
          },
          onUpdate: () => {
            console.log('Dragging');
          },
          onPress: function (event) {
            if (event.preventDefault) {
              event.preventDefault(); // Stop default touch interaction
            }
          },
        });
      });
  };

  const handleScrollHintClick = (e, projectId) => {
    e.stopPropagation();
    debugger;
    const projectRef = projectRefs.current[projectId];
    if (!projectRef) return;

    // Scroll the project to the left a bit more
    gsap.to(projectRef, {
      x: gsap.getProperty(projectRef, "x") - 200, // scroll 200px further left
      duration: 0.8,
      ease: "power3.out",
    });

    // Hide the scroll hint
    const hint = scrollHintRefs.current[projectId];
    if (hint) {
      gsap.to(hint, { opacity: 0, duration: 0.5 });
    }
  };

  // const toggleProjectDescription = (projectId, event) => {
  //   event.stopPropagation();
  //   const projectRef = projectRefs.current[projectId];
  //   const projectDescription = projectRef.querySelector(`.${styles.projectDescription}`);
  //   const projectDescriptionButton = projectRef.querySelector(`.${styles.projectDescriptionButton}`);
  //   const projectDescriptionIconButton = projectRef.querySelector(`.${styles.projectDescriptionIconButton}`);
  //   if (!projectDescription) return;

  //   if (projectDescription.style.opacity === '1') {
  //     gsap.to(projectDescription, {
  //       y: '100%',
  //       opacity: 0,
  //       duration: 0.5,
  //       ease: 'power3.out',
  //       onComplete: () => {
  //         gsap.set(projectDescription, { display: 'none' });
  //       },
  //     });

  //     gsap.to(projectDescriptionButton, {
  //       scale: 1,
  //       duration: 0.5,
  //       ease: 'bounce.out',
  //     });
  //   } else {
  //     gsap.to(projectDescription, {
  //       y: 0,
  //       opacity: 1,
  //       duration: 0.5,
  //       ease: 'power3.out',
  //       onStart: () => {
  //         gsap.set(projectDescription, { display: 'block' });
  //       },
  //     });

  //     gsap.to(projectDescriptionButton, {
  //       scale: 1.1,
  //       duration: 0.5,
  //       ease: 'bounce.out',
  //     });
  //   }
  // };

  const toggleProjectContentDescription = (projectId, contentId, event) => {
    event.stopPropagation();

    // Detect if it's a mobile device
    const isMobile = window.innerWidth <= 768;

    // Find the correct project and content description
    const projectRef = projectRefs.current[projectId];
    const projectContentDescription = projectRef?.querySelector(
      `.${styles.projectDescription}[data-content-id="${contentId}"]`
    );

    if (!projectContentDescription) return;

    if (isMobile) {
      // Get content data
      const content = projects
        .find((p) => p.id === projectId)
        ?.content.find((c, index) => c.id === contentId || index === contentId);

      if (!content) return;

      // Trigger full-screen mode on mobile
      setFullScreenContent({
        projectId,
        contentId,
        imageUrl: content.url,
        description: content.description || '',
      });

    } else {
      // Default GSAP behavior for desktop
      if (projectContentDescription.style.opacity === '1') {
        gsap.to(projectContentDescription, {
          y: '100%',
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(projectContentDescription, { display: 'none' });
          },
        });
      } else {
        gsap.to(projectContentDescription, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          onStart: () => {
            gsap.set(projectContentDescription, { display: 'block' });
          },
        });
      }
    }
  };

  useEffect(() => {
    // if any projects are open, update the marquee z-index behind the projects
    if (openProjects.length) {
      gsap.set(marqueeRef.current, { opacity: 0 });
    } else {
      gsap.set(marqueeRef.current, { opacity: 1 });
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

  const scrollProjectHeader = (event, projectId) => {
    event.stopPropagation();
    const projectHeader = document.querySelector(`#project-${projectId} .${styles.projectHeader}`);
    const projectHeaderInner = document.querySelector(`#project-${projectId} .${styles.projectHeaderInner}`);
    const currentTransform = projectHeaderInner.style.transform; // "" or ""translate(0px, -50px)" or "translate(0px, -100px)", etc ..
    const currentTransformY = currentTransform ? parseInt(currentTransform.split(',')[1].replace('px', '').trim()) : 0;
    const maxTransformY = projectHeaderInner.clientHeight - projectHeader.clientHeight;

    if (Math.abs(currentTransformY) <= maxTransformY) {
      gsap.to(projectHeaderInner, {
        y: currentTransformY - 100,
        duration: 1,
        ease: 'power2.out',
      });
    }
  };

  const scrollProjectHeaderUp = (event, projectId) => {
    event.stopPropagation();
    const projectHeaderInner = document.querySelector(`#project-${projectId} .${styles.projectHeaderInner}`);
    const currentTransform = projectHeaderInner.style.transform; // "" or ""translate(0px, -50px)" or "translate(0px, -100px)", etc ..
    const currentTransformY = currentTransform ? parseInt(currentTransform.split(',')[1].replace('px', '').trim()) : 0;

    if (currentTransformY < 0) {
      const y = currentTransformY + 100;
      if (y > 0) {
        gsap.to(projectHeaderInner, {
          y: 0,
          duration: 1,
          ease: 'power2.out',
        });
        return;
      }
      gsap.to(projectHeaderInner, {
        y: currentTransformY + 100,
        duration: 1,
        ease: 'power2.out',
      });
    }
  };

  const isProjectHeaderInnerHeightBiggerThanProjectHeaderHeight = (projectId) => {
    const projectHeader = document.querySelector(`#project-${projectId} .${styles.projectHeader}`);
    const projectHeaderInner = document.querySelector(`#project-${projectId} .${styles.projectHeaderInner}`);
    if (!projectHeader || !projectHeaderInner) return false;
    return projectHeaderInner.clientHeight > projectHeader.clientHeight;
  };

  const formatTextToNumberedList = (text) => {
    const regex = /\d+\.\s+/g;
    const firstMatchIndex = text.search(regex);

    let paragraph = text;
    let listItems = [];

    if (firstMatchIndex !== -1) {
      paragraph = text.slice(0, firstMatchIndex).trim(); // Extract text before the first numbered item
      listItems = text.slice(firstMatchIndex).split(regex).filter(Boolean); // Extract numbered items
    }

    return (
      <div>
        {paragraph && <p>{paragraph}</p>}
        {listItems.length > 0 && (
          <ol>
            {listItems.map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
          </ol>
        )}
      </div>
    );
  };

  const projectHasDescriptions = (project) => {
    const hasContent = (text) => text?.trim().length > 256;

    return (
      hasContent(project.description) ||
      hasContent(project.clientDescription) ||
      hasContent(project.challenge) ||
      hasContent(project.solution)
    );
  };

  const prettySqft = (sqft) => {
    if (!sqft) return '';
    return `${sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} sqft`;
  }

  const handleHeaderClick = (e, projectId) => {
    e.stopPropagation();
    const header = e.currentTarget;
    const container = header.closest(`.${styles.projectContentHorizontal}`);
    if (!container) return;

    const containerCenter = container.offsetWidth / 2;
    const headerCenter = header.offsetLeft + (header.offsetWidth / 2);

    const scrollTo = headerCenter - containerCenter;

    gsap.to(container, {
      scrollTo: {
        left: scrollTo,
      },
      duration: 1,
      ease: 'power3.out',
    });
  };

  return (
    <>
      <div className={styles.projectList} ref={listRef}>
        <div className={styles.projectListVertical} ref={gridRef}>
          {projects
            .sort((a, b) => a.order - b.order) // Sort projects by their order
            .map(
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
                    <div className={styles.projectItemInner}>
                      <div className={styles.mainImageWrapper} ref={(el) => el && imageRefs.current[project.id].push(el)}>
                        <img
                          className={styles.projectMainImage}
                          src={project.mainImage}
                          alt={project.title}
                        />

                        {/* {project.description && openProjects.includes(project.id) && (
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
                    )} */}

                        {loadingContentImages.includes(project.id) && (
                          <div className={styles.spinner}></div>)}
                      </div>

                      {/* {(!openProjects.includes(project.id) && !loadingContentImages.includes(project.id)) && ( */}
                      <div className={styles.projectTitle}>
                        <h2>{project.title}</h2>
                      </div>
                      {/* )} */}
                    </div>

                    {openProjects.includes(project.id) && (
                      <div className={styles.projectContent}>
                        <div className={styles.projectContentHorizontal}>
                          <div className={styles.projectContentItem}>
                            <div
                              className={`${styles.projectHeader}`}
                              onClick={(e) => handleHeaderClick(e, project.id)}
                            >
                              <div className={styles.projectHeaderTop}>
                                <h2>{project.title}</h2>
                                <p className={styles.projectLocation}>{project.location}</p>
                                {project.type && <p className={styles.type}>{project.type}</p>}
                                {project.status && <p className={styles.status}>{project.status}</p>}
                                {project.area && <p className={styles.area}>{prettySqft(project.area)}</p>}
                              </div>
                            </div>
                          </div>

                          {project.content &&
                            project.content.map((content, index) => {
                              if (!content) return null;
                              if (!content.published) return null;

                              const uniqueKey =
                                content.id || content.url || `${content.type}-${index}`;

                              if (content.type === 'image' && content.description) {
                                const aspectRatio = imageAspectRatios[content.url];
                                const aspectClass = getAspectRatioClass(aspectRatio);

                                return (
                                  <div
                                    key={uniqueKey}
                                    data-aspect-ratio={aspectRatio}
                                    className={`${styles.projectContentItem} ${aspectClass}`}
                                    ref={(el) => el && imageRefs.current[project.id].push(el)} // Add content to refs
                                  >
                                    <div className={styles.projectImageWrapper}>
                                      <img
                                        className={styles.projectImage}
                                        src={content.url}
                                        alt={content.title}
                                      />
                                      {(content.description && openProjects.includes(project.id)) && (
                                        <>
                                          <div className={styles.projectDescriptionIconButton}>
                                            <button
                                              className={styles.projectDescriptionButton}
                                              onClick={(e) =>
                                                toggleProjectContentDescription(project.id, content.id || index, e)
                                              }
                                            >
                                              <span>i</span>
                                            </button>
                                          </div>
                                          <div
                                            className={styles.projectDescription}
                                            data-content-id={content.id || index} // Add identifier here as well
                                            onClick={(e) =>
                                              toggleProjectContentDescription(project.id, content.id || index, e)
                                            }
                                          >
                                            <p>{content.description}</p>
                                          </div>
                                        </>
                                      )}
                                    </div>

                                  </div>
                                );
                              } else if (content.type === 'image') {
                                const aspectRatio = imageAspectRatios[content.url];
                                const aspectClass = getAspectRatioClass(aspectRatio);

                                return (
                                  <div
                                    key={uniqueKey}
                                    data-aspect-ratio={aspectRatio}
                                    className={`${styles.projectContentItem} ${aspectClass}`}
                                    ref={(el) => el && imageRefs.current[project.id].push(el)} // Add content to refs
                                  >
                                    <div className={styles.projectImageWrapper}>
                                      <img
                                        className={styles.projectImage}
                                        src={content.url}
                                        alt={content.title}
                                      />
                                    </div>
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

                          <div className={styles.projectContentItem}>
                            <div className={`${styles.projectHeader} ${styles.projectHeaderDescription} ${projectHasDescriptions(project) ? styles.hasAdditionalContent : ''}`}>
                              <div className={styles.projectHeaderInner}>
                                {project.description && (
                                  <div className={styles.projectGeneralDescription}>
                                    {formatTextToNumberedList(project.description)}
                                  </div>
                                )}
                                {project.clientDescription && (
                                  <div className={styles.projectGeneralDescription}>
                                    {formatTextToNumberedList(project.clientDescription)}
                                  </div>
                                )}
                                {project.challenge && (
                                  <div className={styles.projectGeneralDescription}>
                                    {formatTextToNumberedList(project.challenge)}
                                  </div>
                                )}
                                {project.solution && (
                                  <div className={styles.projectGeneralDescription}>
                                    {formatTextToNumberedList(project.solution)}
                                  </div>
                                )}
                              </div>

                              {isProjectHeaderInnerHeightBiggerThanProjectHeaderHeight(project.id) && (
                                <button className={styles.scrollUpButton} onClick={(e) => scrollProjectHeaderUp(e, project.id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f6ab0b">
                                    <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                                  </svg>
                                </button>
                              )}

                              {isProjectHeaderInnerHeightBiggerThanProjectHeaderHeight(project.id) && (
                                <button className={styles.scrollDownButton} onClick={(e) => scrollProjectHeader(e, project.id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f6ab0b">
                                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>

                          {/* add publications as content items: { title: '', link: '', date: '', imageUrl: '' } */}
                          {project.publications && project.publications.length > 0 && (
                            project.publications.map((publication, index) => (
                              <div key={'publication_' + index} className={`${styles.projectContentItem} ${styles.projectPublicationItem}`}>


                                <a href={publication.link} target="_blank" rel="noopener noreferrer">
                                  <button className={styles.projectPublicationButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" /></svg>
                                  </button>
                                </a>

                                <div className={styles.projectPublication}>
                                  <img src={publication.imageUrl} alt={publication.title} />
                                </div>

                                <div className={styles.projectPublicationDescription}>
                                  <a href={publication.link} target="_blank" rel="noopener noreferrer">
                                    <h3>{publication.title}</h3>
                                  </a>
                                  <p>{publication.date}</p>
                                </div>
                              </div>
                            ))
                          )}


                          {/* add last section of content for project.teams: Team (discipline listed first and company names second) */}
                          {project.teams && project.teams.length > 0 && (
                            <div className={styles.projectContentItem}>
                              <div className={styles.projectTeamText}>
                                {project.teams.map((team, index) => (
                                  <div key={'team_' + index}>
                                    <p className={styles.projectTeamRole}>{team.role}</p>
                                    <p className={styles.projectTeamName}>{team.name}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className={styles.scrollHint}
                      ref={(el) => { if (el) scrollHintRefs.current[project.id] = el; }}
                      onClick={(e) => handleScrollHintClick(e, project.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(246, 171, 11)">
                        <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                      </svg>
                    </div>
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

      <div ref={footerRef}>
        <Footer showCredits={true} />
      </div>

      {fullScreenContent && (
        <div
          className={styles.fullScreenOverlay}
          onClick={() => setFullScreenContent(null)} // Tap to close
        >
          <div className={styles.fullScreenImageWrapper}>
            <img
              className={styles.fullScreenImage}
              src={fullScreenContent.imageUrl}
              alt="Full screen preview"
            />
          </div>
          <div
            className={styles.fullScreenDescription}
            onClick={(e) => e.stopPropagation()} // Prevent closing when scrolling
          >
            <p>{fullScreenContent.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeProjectList;