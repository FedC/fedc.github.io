import React, { useRef, useEffect, useState, use } from 'react';
import { gsap } from 'gsap';
import * as styles from './Header.module.scss';
import HalfCircle from './HalfCircle';
import About from './About';
import Contact from './Contact';
import { initSmoothScrolling } from '../js/smoothscroll';

const Header = ({ onAnimationEnd, projects }) => {
  const navRef = useRef(null);
  const navInnerRef = useRef(null);
  const navListRef = useRef(null);
  const logoRef = useRef(null);
  const contactRef = useRef(null);

  const letterRefsCreate = useRef([]);
  const letterRefsDwell = useRef([]);

  const topbarRef = useRef(null);
  const navTopBarEls = useRef([]);
  const aboutLinkRef = useRef(null);
  const aboutLinkMobileRef = useRef(null);
  const contactLinkRef = useRef(null);
  const contactLinkMobileRef = useRef(null);
  const aboutRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closeButtonMobileRef = useRef(null);

  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  let hasFired = false;
  let entryAnimation = false;

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
          tl.to(aboutLinkMobileRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'bounce.out' }, '<');
          tl.to(contactLinkMobileRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'bounce.out', delay: 0.15 }, '<');
        } else {
          gsap.set(aboutLinkRef.current, { opacity: 0, scale: .8 });
          gsap.set(contactLinkRef.current, { opacity: 0, scale: .8 });
          tl.to(aboutLinkRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'bounce.out' }, '<');
          tl.to(contactLinkRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'bounce.out', delay: 0.15 }, '<');
        }

      }
    );

    // Cleanup
    return () => mm.revert();
  }, []);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (isAboutVisible && aboutRef.current && !aboutRef.current.contains(e.target)) {
        handleCloseAbout();
      }
    });
  }, [isAboutVisible]);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (isContactVisible && contactRef.current && !contactRef.current.contains(e.target)) {
        closeContact();
      }
    });
  }, [isContactVisible]);

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

          gsap.set(aboutLinkMobileRef.current, { opacity: 1 });
          gsap.set(contactLinkMobileRef.current, { opacity: 1 });

          gsap.set(navRef.current, { height: '60px' });
          gsap.set(topbarRef.current, { opacity: 1 });
        } else {
          gsap.set(aboutLinkMobileRef.current, { opacity: 0 });
          gsap.set(contactLinkMobileRef.current, { opacity: 0 });

          gsap.set(aboutLinkRef.current, { opacity: 1 });
          gsap.set(contactLinkRef.current, { opacity: 1 });

          gsap.set(navRef.current, { height: '100vh' });
          gsap.set(topbarRef.current, { opacity: 1 });
        }
      }
    );

    return () => mm.revert();
  };

  const handleShowAbout = (e) => {
    e.stopPropagation();
    closeContact(true);
    setIsAboutVisible(true);

    // Disable Lenis for smooth scrolling
    if (window.lenis) {
      window.lenis.destroy();
    }

    gsap.set(navListRef.current, { opacity: 0 });

    setTimeout(() => {
      gsap.set(aboutRef.current, { opacity: 0 });
      gsap.set(closeButtonRef.current, { opacity: 0 });
      gsap.set(closeButtonMobileRef.current, { opacity: 0 });
      // gsap.set(navListRef.current, {
      //   display: 'none',
      // });
    });

    setTimeout(() => {
      gsap.set(aboutRef.current, { overflowY: 'auto' }); // Ensure native scroll for About
    }, 100);

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
            tl.to(closeButtonRef.current, {
              opacity: 1,
              duration: 0.2,
              ease: 'power2.out',
            }, '<');
            tl.to(navRef.current, {
              width: '90vw',
              duration: 0.8,
              ease: 'power2.out',
            });
          }

          // tl.to(contactLinkMobileRef.current, {
          //   opacity: 0,
          //   scale: .2,
          //   duration: 0.2,
          //   ease: 'power2.out',
          // }, '<');

          tl.to(aboutRef.current, {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
          });

          tl.to(navListRef.current, {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
          });

        }, 200);

      },
    );
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
          tl.to(closeButtonRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
          }, '<');
        }


      },
    );
  };

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

  const handleShowContact = (e) => {
    e.stopPropagation();
    handleCloseAbout(true);
    setIsContactVisible(true);

    // Disable Lenis for smooth scrolling
    if (window.lenis) {
      window.lenis.destroy();
    }

    gsap.set(navListRef.current, { opacity: 0 });

    setTimeout(() => {
      gsap.set(contactRef.current, { opacity: 0 });
    });

    setTimeout(() => {
      gsap.set(contactRef.current, { overflowY: 'auto' }); // Ensure native scroll for Contact
    }, 100);

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
            tl.to(closeButtonRef.current, {
              opacity: 1,
              duration: 0.2,
              ease: 'power2.out',
            }, '<');
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

          tl.to(navListRef.current, {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
        }, 200);
      },
    );
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
          tl.to(closeButtonRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
          }, '<');
        }
      }
    );
  }

  return (
    <>
      <nav className={styles.nav} id="verticalnav" ref={navRef}>

        {isAboutVisible && (
          <button className={`${styles.closeButton} ${styles.closeButtonMobile}`} onClick={handleCloseAbout} ref={closeButtonMobileRef}>
            <svg className={styles.closeIcon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
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

          <div className={`${styles.nav__content} ${isAboutVisible || isContactVisible ? styles.nav__contentAboutVisible : ''}`}>

            {isAboutVisible && (
              <div className={`${styles.nav__aboutContent} js-about-scroll-container`} ref={aboutRef}>
                <About parentScroller={aboutRef.current} />
              </div>
            )}

            {isContactVisible && (
              <div className={`${styles.nav__contactContent} js-contact-scroll-container`} ref={contactRef}>
                <Contact parentScroller={contactRef.current} projects={projects} />
              </div>
            )}

            <div className={styles.nav__list} ref={navListRef}>
              {!isAboutVisible && (
                <div className={styles.nav__item}>
                  <a href="#about" className={styles.aboutLink}>
                    <div className={styles.aboutCircleDesktop} ref={aboutLinkRef} data-content="About" onClick={handleShowAbout}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="32px" fill="rgb(246, 171, 11)"><path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" /></svg>
                    </div></a>
                </div>
              )}

              {isAboutVisible && (
                <div className={styles.nav__item}>
                  <button className={styles.closeButton} onClick={handleCloseAbout} ref={closeButtonRef}>
                    <svg className={styles.closeIcon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                  </button>
                </div>
              )}

              {isContactVisible && (
                <div className={styles.nav__item}>
                  <button className={styles.closeButton} onClick={closeContact} ref={closeButtonRef}>
                    <svg className={styles.closeIcon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                  </button>
                </div>
              )}

              {!isContactVisible && (
                <div className={styles.nav__item}>
                  <a href="#contact" className={styles.aboutLink}>
                    <div className={styles.contactCircleDesktop} ref={contactLinkRef} data-content="Contact" onClick={handleShowContact}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="34px" fill="rgb(246, 171, 11)"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                    </div></a>
                </div>
              )}
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="32px" fill="white"><path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" /></svg>
          </div>
        </a>
      )}

      {!isContactVisible && (
        <a href="#contact"
          className={`${styles.contactCircleMobile} ${isAboutVisible || isContactVisible ? styles.contactCircleMobileWhite : ''}`}
          ref={contactLinkMobileRef}
          data-content="Contact"
          onClick={handleShowContact}>
          <div >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="34px" fill="white"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
          </div>
        </a>
      )}

    </>
  );
};

export default Header;