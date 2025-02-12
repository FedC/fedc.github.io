import React, { useRef, useEffect, useState, use } from 'react';
import { gsap } from 'gsap';
import { initSmoothScrolling } from '../js/smoothscroll';
import * as styles from './Header.module.scss';
import HalfCircle from './HalfCircle';
import AboutIcon from './AboutIcon';
import ContactIcon from './ContactIcon';
import ServicesIcon from './ServicesIcon';
import CloseIcon from './CloseIcon';
import HomeIcon from './HomeIcon';
import About from './About';
import Contact from './Contact';
import Services from './Services';

const Header = ({ onAnimationEnd, projects, resetProjects }) => {

  const orange = 'rgb(246, 171, 11)';

  const navRef = useRef(null);
  const navInnerRef = useRef(null);
  const navListRef = useRef(null);
  const logoRef = useRef(null);
  const contactRef = useRef(null);
  const servicesRef = useRef(null);

  const letterRefsCreate = useRef([]);
  const letterRefsDwell = useRef([]);

  const topbarRef = useRef(null);
  const navTopBarEls = useRef([]);
  const aboutLinkRef = useRef(null);
  const aboutLinkMobileRef = useRef(null);
  const contactLinkRef = useRef(null);
  const contactLinkMobileRef = useRef(null);
  const servicesLinkRef = useRef(null);
  const servicesLinkMobileRef = useRef(null);
  const aboutRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closeButtonMobileRef = useRef(null);

  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);

  let hasFired = false;
  let entryAnimation = false;

  // useEffect(() => {
  //   // close about when resizing
  //   function closeAbout(e) {
  //     if (isAboutVisible) {
  //       e.preventDefault();
  //       handleCloseAbout();
  //     }
  //   }

  //   window.addEventListener('resize', closeAbout);
  //   return () => window.removeEventListener('resize', closeAbout);
  // });

  useEffect(() => {
    if (entryAnimation) {
      return;
    }
    entryAnimation = true;
    const originalInnerNavWidth = navRef.current.offsetWidth;

    gsap.set(topbarRef.current, { opacity: 0 });

    gsap.set(aboutLinkRef.current, { opacity: 0 });
    gsap.set(aboutLinkMobileRef.current, { opacity: 0 });

    gsap.set(contactLinkRef.current, { opacity: 0 });
    gsap.set(contactLinkMobileRef.current, { opacity: 0 });

    gsap.set(servicesLinkRef.current, { opacity: 0 });
    gsap.set(servicesLinkMobileRef.current, { opacity: 0 });

    gsap.set(closeButtonRef.current, { opacity: 0 });


    const tl = gsap.timeline({
      onUpdate: function () {
        // Fire onAnimationEnd when progress reaches 95%
        if (tl.currentLabel() === 'logoUp' && !hasFired) {
          onAnimationEnd();
          hasFired = true; // Ensure it only fires once
        }
        // debugger;
      },
      onComplete: () => {
        gsap.set(logoRef.current, { transformOrigin: 'center center' });
        mm.kill();
        setElementsVisibility();
      },
    });
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)", // Desktop logic
        isMobile: "(max-width: 767px)", // Mobile logic
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        gsap.set(navRef.current, {
          width: '50%',
        });

        if (isMobile) {
          gsap.set(navRef.current, { height: '100vh' });
        }

        gsap.set(logoRef.current, {
          y: window.innerHeight * 8 / 10, // Start at the bottom
          x: isMobile ? 20 : 12.5,
          scale: isDesktop ? 3 : 1.8,
          transformOrigin: '50% 50%',
        });

        gsap.set(letterRefsDwell.current, { x: 0, color: 'rgba(246, 171, 11, 0.65)', opacity: 1 });
        const orangeHalf = document.querySelector('.orangeHalf');
        gsap.set(orangeHalf, { fill: 'rgba(246, 171, 11, 0.65)' });
        gsap.set(letterRefsCreate.current, { opacity: 1 });

        // Animate "CREATE"
        // tl.to(letterRefsCreate.current, {
        //   opacity: 1,
        //   y: 0,
        //   x: 0,
        //   duration: .5,
        //   stagger: .1,
        //   ease: 'power2.out',
        // });

        // Animate "DWELL"
        // tl.to(letterRefsDwell.current, {
        //   opacity: 1,
        //   x: 0,
        //   y: 0,
        //   duration: .5,
        //   ease: 'power2.out',
        //   stagger: 0.1,
        // }, '-=0');

        // wait for 2 seconds
        tl.to(letterRefsDwell.current, { color: 'rgba(246, 171, 11, 0.65)', delay: 1.5 });

        tl.to(
          logoRef.current,
          {
            y: 20,
            duration: 2,
            ease: 'power2.out',
          },
        ).addLabel('logoUp', '-=1.4');

        if (isMobile) {
          tl.to(navRef.current, {
            y: 0,
            height: '100px',
            backgroundColor: '#f6ab0b',
            backdropFilter: 'blur(0px)',
            duration: 2,
            ease: 'power2.out',
          }, '<');
        }

        tl.to(navRef.current, {
          y: 0,
          x: 0,
          height: isMobile ? '60px' : '100vh',
          width: originalInnerNavWidth,
          backgroundColor: '#f6ab0b',
          backdropFilter: 'blur(0px)',
          duration: 2,
          ease: 'power2.out',
        })
          .to(
            logoRef.current,
            {
              y: 0,
              // x: 45 / 3,
              x: 25.5,
              scale: 1,
              duration: 1.5,
              ease: 'power2.out',
            },
            '<'
          );

        tl.to(letterRefsDwell.current, { color: '#f6ab0b)' }, '<');
        tl.to(orangeHalf, { fill: '#f6ab0b' }, '<');

        tl.to(topbarRef.current,
          { opacity: 1, duration: 0.5 },
        );

        if (isDesktop) {
          gsap.set(navTopBarEls.current, { opacity: 0, x: 100 });
          tl.to(navTopBarEls.current,
            { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', stagger: 0.1 },
            '<'
          );
        }

        tl.delay(.5);

        if (isMobile) {
          gsap.set(aboutLinkMobileRef.current, { opacity: 0, scale: .8 });
          gsap.set(contactLinkMobileRef.current, { opacity: 0, scale: .8 });
          gsap.set(servicesLinkMobileRef.current, { opacity: 0, scale: .8 });

          tl.to(aboutLinkMobileRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'bounce.out' }, '<');
          tl.to(contactLinkMobileRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'bounce.out', delay: 0.15 }, '<');
          tl.to(servicesLinkMobileRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'bounce.out', delay: 0.3 }, '<');

        } else {
          gsap.set(closeButtonRef.current, { opacity: 0, scale: 0, y: -10 });
          gsap.set(aboutLinkRef.current, { opacity: 0, scale: 0, y: -10 });
          gsap.set(contactLinkRef.current, { opacity: 0, scale: 0, y: -10 });
          gsap.set(servicesLinkRef.current, { opacity: 0, scale: 0, y: -10 });

          const navLinks = [closeButtonRef.current, aboutLinkRef.current, servicesLinkRef.current, contactLinkRef.current];
          tl.to(navLinks, { opacity: 1, scale: 1, y: 0, duration: .22, ease: 'power2.out', stagger: .1 }, '<');
        }

      }
    );

    // Cleanup
    return () => mm.revert();
  }, []);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (isAboutVisible && aboutRef.current && !aboutRef.current.contains(e.target)) {
        handleCloseAll();
      }
      if (isContactVisible && contactRef.current && !contactRef.current.contains(e.target)) {
        handleCloseAll();
      }
      if (isServicesVisible && servicesRef.current && !servicesRef.current.contains(e.target)) {
        handleCloseAll();
      }
    });

  }, [isAboutVisible, isContactVisible, isServicesVisible]);

  const handleCloseAll = () => {
    setIsAboutVisible(false);
    setIsContactVisible(false);
    setIsServicesVisible(false);

    if (isAboutVisible) {
      handleCloseAbout(true);
    } else if (isContactVisible) {
      closeContact(true);
    } else if (isServicesVisible) {
      handleCloseServices();
    } else {
      resetProjects();
    }
  };

  const setElementsVisibility = () => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: "(min-width: 768px)", // Desktop logic
        isMobile: "(max-width: 767px)", // Mobile logic
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        if (isMobile) {
          gsap.set(aboutLinkRef.current, { opacity: 0 });
          gsap.set(contactLinkRef.current, { opacity: 0 });
          gsap.set(servicesLinkRef.current, { opacity: 0 });

          gsap.set(aboutLinkMobileRef.current, { opacity: 1 });
          gsap.set(contactLinkMobileRef.current, { opacity: 1 });
          gsap.set(servicesLinkMobileRef.current, { opacity: 1 });

          gsap.set(navRef.current, { height: '60px' });
          gsap.set(topbarRef.current, { opacity: 1 });
        } else {
          gsap.set(aboutLinkMobileRef.current, { opacity: 0 });
          gsap.set(contactLinkMobileRef.current, { opacity: 0 });
          gsap.set(servicesLinkMobileRef.current, { opacity: 0 });

          gsap.set(aboutLinkRef.current, { opacity: 1 });
          gsap.set(contactLinkRef.current, { opacity: 1 });
          gsap.set(servicesLinkRef.current, { opacity: 1 });

          gsap.set(navRef.current, { height: '100vh' });
          gsap.set(topbarRef.current, { opacity: 1 });
        }
      }
    );

    return () => mm.revert();
  };

  const handleShowContent = (e) => {
    e.stopPropagation();
    // Disable Lenis for smooth scrolling
    if (window.lenis) {
      window.lenis.destroy();
    }

    if (isAboutVisible || isContactVisible || isServicesVisible) {
      const openedRef = isAboutVisible ? aboutRef : isContactVisible ? contactRef : servicesRef;
      gsap.to(openedRef, {
        y: '-100vh',
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  }


  const handleShowAbout = (e) => {
    handleShowContent(e);

    const hasOpened = noneAreOpen ? false : true;

    setIsContactVisible(false);
    setIsServicesVisible(false);
    setIsAboutVisible(true);

    setTimeout(() => {
      gsap.set(aboutRef.current, { overflowY: 'auto' }); // Ensure native scroll for About
    }, 100);

    if (!hasOpened) {

      setTimeout(() => {
        gsap.set(aboutRef.current, { opacity: 0 });
      });

      const tl = gsap.timeline();
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile, isDesktop } = context.conditions;

          setTimeout(() => {
            if (isMobile) {
              tl.to(navRef.current, {
                height: '100vh',
                width: '100vw',
                duration: 0.4,
                ease: 'power2.out',
              });
              tl.to(closeButtonMobileRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out',
              }, '<');
              tl.to(logoRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
              }, '<');
            }

            if (isDesktop) {
              tl.to(navRef.current, {
                width: '90vw',
                duration: 0.8,
                ease: 'power2.out',
              });
            }

            tl.to(aboutRef.current, {
              opacity: 1,
              duration: 0.2,
              ease: 'power2.out',
            });
          }, 200);

        },
      );
    }
  };

  const handleCloseAbout = (preventLenis) => {

    const tl = gsap.timeline();

    function onComplete() {
      setIsAboutVisible(false);

      // Enable Lenis for smooth scrolling
      if (window.lenis && !preventLenis) {
        initSmoothScrolling();
      }

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          if (isMobile) {
            gsap.set(aboutLinkMobileRef.current, { opacity: .9, scale: .8 });
          } else {
            gsap.set(aboutLinkRef.current, { opacity: .9, scale: .8 });
          }

          setTimeout(() => {
            if (isMobile) {
              gsap.to(aboutLinkMobileRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'bounce.out' }, '<');
            } else {
              gsap.to(aboutLinkRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'bounce.out' }, '<');
            }

            tl.to(logoRef.current, {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            }, '<');

            // gsap.to(contactLinkMobileRef.current, {
            //   opacity: 1,
            //   scale: 1,
            //   duration: 0.5,
            //   ease: 'bounce.out',
            // }, '<');

            // gsap.set(navListRef.current, {
            //   display: 'flex',
            // });
          }, 100);
        });
    }

    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions;

        tl.to(aboutRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        });

        if (isMobile) {
          tl.to(navRef.current, {
            height: '60px',
            width: '120px',
            duration: 0.6,
            ease: 'ease.out',
            onComplete: onComplete,
          }, '<');
          tl.to(closeButtonMobileRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
          }, '<');
        } else {
          tl.to(navRef.current, {
            width: '120px',
            duration: 0.6,
            ease: 'ease.out',
            onComplete: onComplete,
          }, '<');
          // tl.to(closeButtonRef.current, {
          //   opacity: 0,
          //   duration: 0.2,
          //   ease: 'power2.out',
          // }, '<');
        }


      },
    );
  };

  const handleShowContact = (e) => {
    handleShowContent(e);

    const hasOpened = noneAreOpen ? false : true;

    setIsServicesVisible(false);
    setIsAboutVisible(false);
    setIsContactVisible(true);

    setTimeout(() => {
      gsap.set(contactRef.current, { overflowY: 'auto' }); // Ensure native scroll for Contact
    }, 100);

    if (!hasOpened) {

      setTimeout(() => {
        gsap.set(contactRef.current, { opacity: 0 });
      });

      const tl = gsap.timeline();

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          setTimeout(() => {
            if (isMobile) {
              tl.to(navRef.current, {
                height: '100vh',
                width: '100vw',
                duration: 0.4,
                ease: 'power2.out',
              });
              tl.to(closeButtonMobileRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out',
              }, '<');
              tl.to(logoRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
              }, '<');
            } else {
              tl.to(navRef.current, {
                width: '90vw',
                duration: 0.8,
                ease: 'power2.out',
              });
            }

            tl.to(contactRef.current, {
              opacity: 1,
              duration: 0.2,
              ease: 'power2.out',
            });
          }, 200);
        },
      );
    }
  };

  const closeContact = (preventLenis) => {
    const tl = gsap.timeline();

    function onComplete() {
      setIsContactVisible(false);

      // Enable Lenis for smooth scrolling
      if (window.lenis && !preventLenis) {
        initSmoothScrolling();
      }

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          if (isMobile) {
            gsap.set(contactLinkMobileRef.current, { opacity: .9, scale: .8 });
          } else {
            gsap.set(contactLinkRef.current, { opacity: .9, scale: .8 });
          }

          setTimeout(() => {
            if (isMobile) {
              gsap.to(contactLinkMobileRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'bounce.out' }, '<');
            } else {
              gsap.to(contactLinkRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'bounce.out' }, '<');
            }

            tl.to(logoRef.current, {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            }, '<');
          }, 100);
        });
    }

    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions;

        tl.to(contactRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        });

        if (isMobile) {
          tl.to(navRef.current, {
            height: '60px',
            width: '120px',
            duration: 0.6,
            ease: 'ease.out',
            onComplete: onComplete,
          }, '<');
          tl.to(closeButtonMobileRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
          }, '<');
        } else {
          tl.to(navRef.current, {
            width: '120px',
            duration: 0.6,
            ease: 'ease.out',
            onComplete: onComplete,
          }, '<');
          // tl.to(closeButtonRef.current, {
          //   opacity: 0,
          //   duration: 0.2,
          //   ease: 'power2.out',
          // }, '<');
        }
      }
    );
  }

  const handleShowServices = (e) => {
    handleShowContent(e);
    const hasOpened = noneAreOpen ? false : true;

    setIsContactVisible(false);
    setIsAboutVisible(false);
    setIsServicesVisible(true);

    setTimeout(() => {
      gsap.set(servicesRef.current, { overflowY: 'auto' }); // Ensure native scroll for Services
    }, 100);

    if (!hasOpened) {

      setTimeout(() => {
        gsap.set(servicesRef.current, { opacity: 0 });
      });

      const tl = gsap.timeline();

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          setTimeout(() => {
            if (isMobile) {
              tl.to(navRef.current, {
                height: '100vh',
                width: '100vw',
                duration: 0.4,
                ease: 'power2.out',
              });
              tl.to(closeButtonMobileRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out',
              }, '<');
              tl.to(logoRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
              }, '<');
            } else {
              tl.to(navRef.current, {
                width: '90vw',
                duration: 0.8,
                ease: 'power2.out',
              });
            }

            tl.to(servicesRef.current, {
              opacity: 1,
              duration: 0.2,
              ease: 'power2.out',
            });
          }, 200);
        },
      );
    }
  };

  const handleCloseServices = (e) => {
    if (e) {
      e.stopPropagation();
    }

    const tl = gsap.timeline();

    function onComplete() {
      setIsServicesVisible(false);

      // Enable Lenis for smooth scrolling
      if (window.lenis) {
        initSmoothScrolling();
      }

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          if (isMobile) {
            gsap.set(servicesLinkMobileRef.current, { opacity: .9, scale: .8 });
          } else {
            gsap.set(servicesLinkRef.current, { opacity: .9, scale: .8 });
          }

          setTimeout(() => {
            if (isMobile) {
              gsap.to(servicesLinkMobileRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'bounce.out' }, '<');
            } else {
              gsap.to(servicesLinkRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'bounce.out' }, '<');
            }

            tl.to(logoRef.current, {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            }, '<');
          }, 100);
        });
    }

    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions;

        tl.to(servicesRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        });

        if (isMobile) {
          tl.to(navRef.current, {
            height: '60px',
            width: '120px',
            duration: 0.6,
            ease: 'ease.out',
            onComplete: onComplete,
          }, '<');
          tl.to(closeButtonMobileRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
          }, '<');
        } else {
          tl.to(navRef.current, {
            width: '120px',
            duration: 0.6,
            ease: 'ease.out',
            onComplete: onComplete,
          }, '<');
        }
      }
    );
  }

  const noneAreOpen = !isAboutVisible && !isContactVisible && !isServicesVisible;

  return (
    <>
      <nav className={styles.nav} id="verticalnav" ref={navRef}>

        {(isAboutVisible || isServicesVisible || isContactVisible) && (
          <button className={`${styles.closeButton} ${styles.closeButtonMobile}`} onClick={handleCloseAll} ref={closeButtonMobileRef}>
            <CloseIcon fill="#e8eaed" size={24} className={styles.closeIcon} />
          </button>
        )}

        <div className={styles.nav__inner} ref={navInnerRef}>

          <div className={styles.nav__logo}>
            <div ref={logoRef} className={styles.logoSvg}>
              {['C', 'R', 'E', 'A', 'T', 'E'].map((letter, index) => (
                <span
                  key={`create-${letter}-${index}`}
                  ref={(el) => (letterRefsCreate.current[index] = el)}
                  className={styles.logoWhiteLetter}
                  style={{ opacity: 0, transform: 'translateX(0)' }}
                >
                  {letter}
                </span>
              ))}
              <HalfCircle />
              {['D', 'W', 'E', 'L', 'L'].map((letter, index) => (
                <span
                  key={`dwell-${letter}-${index}`}
                  ref={(el) => (letterRefsDwell.current[index] = el)}
                  className={styles.logoOrageLetter}
                  style={{ opacity: 0, transform: 'translateX(3px)' }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          <div className={`${styles.nav__content} ${(isAboutVisible || isContactVisible || isServicesVisible) ? styles.nav__contentVisible : ''}`}>
            
            {isAboutVisible && (
              <div className={`${styles.nav__scrollContent} js-about-scroll-container`} ref={aboutRef}>
                <About parentScroller={aboutRef.current} openServices={handleShowServices} />
              </div>
            )}

            {isContactVisible && (
              <div className={`${styles.nav__scrollContent} js-contact-scroll-container`} ref={contactRef}>
                <Contact parentScroller={contactRef.current} projects={projects} />
              </div>
            )}

            {isServicesVisible && (
              <div className={`${styles.nav__scrollContent} js-services-scroll-container`} ref={servicesRef}>
                <Services parentScroller={servicesRef.current} />
              </div>
            )}

            <div className={styles.nav__list} ref={navListRef}>

              <div className={`${styles.nav__item} ${noneAreOpen ? styles.active : ''}`}>
                <a href="#">
                  <div className={`${styles.aboutCircleDesktop} ${noneAreOpen ? styles.active : ''}`}
                    onClick={handleCloseAll} ref={closeButtonRef} data-content="Home">
                    <HomeIcon fill={orange} size={34} />
                  </div>
                </a>
              </div>

              <div className={`${styles.nav__item} ${isAboutVisible ? styles.active : ''}`}>
                <a href="#about" className={styles.aboutLink}>
                  <div
                    className={`${styles.aboutCircleDesktop} ${isAboutVisible ? styles.active : ''}`}
                    ref={aboutLinkRef} data-content="About" onClick={handleShowAbout}>
                    <AboutIcon stroke={orange} />
                  </div>
                </a>
              </div>

              <div className={`${styles.nav__item} ${isServicesVisible ? styles.active : ''}`}>
                <a href="#services"
                  className={`${styles.servicesLink}`}>
                  <div 
                    className={`${styles.servicesCircleDesktop} ${isServicesVisible ? styles.active : ''}`}
                    data-content="Services" onClick={handleShowServices} ref={servicesLinkRef}>
                    <ServicesIcon stroke={orange} fill="white" />
                  </div>
                </a>
              </div>

              <div className={`${styles.nav__item} ${isContactVisible ? styles.active : ''}`}>
                <a href="#contact" className={`${styles.contactLink}`}>
                  <div 
                    className={`${styles.contactCircleDesktop} ${isContactVisible ? styles.active : ''}`}
                    ref={contactLinkRef} data-content="Contact" onClick={handleShowContact}>
                    <ContactIcon fill={orange} />
                  </div>
                </a>
              </div>

            </div>

          </div>

        </div>
      </nav>

      <nav className={styles.nav__topbar} id="topbar" ref={topbarRef}>
        <div className={styles.nav__topbarInner}>
          <a href="#" className={styles.nav__link} ref={(el) => navTopBarEls.current[1] = el}>All</a>
          <a href="#" className={styles.nav__link} ref={(el) => navTopBarEls.current[2] = el}>Residential</a>
          <a href="#" className={styles.nav__link} ref={(el) => navTopBarEls.current[3] = el}>Commercial</a>
        </div>
      </nav>

      {!isAboutVisible && (
        <a href="#about" className={styles.aboutCircleMobile} ref={aboutLinkMobileRef} data-content="About" onClick={handleShowAbout}>
          <div>
            <AboutIcon stroke="white" />
          </div>
        </a>
      )}

      {!isContactVisible && (
        <a href="#contact"
          className={`${styles.contactCircleMobile} ${(isAboutVisible || isServicesVisible) ? styles.contactCircleMobileWhite : ''}`}
          ref={contactLinkMobileRef}
          data-content="Contact"
          onClick={handleShowContact}>
          <ContactIcon fill="white" />
        </a>
      )}

      {!isServicesVisible && (
        <a href="#services"
          className={`${styles.servicesCircleMobile} ${(isAboutVisible || isContactVisible) ? styles.servicesCircleMobileWhite : ''}`}
          ref={servicesLinkMobileRef} data-content="Services" onClick={handleShowServices}>
          <div >
            <ServicesIcon stroke="white" fill={orange} />
          </div>
        </a>
      )}

    </>
  );
};

export default Header;