import React, { useRef, useEffect, useState, use } from 'react';
import { gsap } from 'gsap';
import * as styles from './Header.module.scss';
import HalfCircle from './HalfCircle';
import About from './About';
import { initSmoothScrolling } from '../js/smoothscroll';

const Header = ({ onAnimationEnd }) => {
  const navRef = useRef(null);
  const navInnerRef = useRef(null);
  const navListRef = useRef(null);
  const logoRef = useRef(null);

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

  const [isAboutVisible, setIsAboutVisible] = useState(false);

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
    setIsAboutVisible(true);

    // Disable Lenis for smooth scrolling
    if (window.lenis) {
      window.lenis.destroy();
    }

    setTimeout(() => {
      document.body.style.overflow = 'hidden'; // Lock scroll on body
      gsap.set(aboutRef.current, { overflowY: 'auto' }); // Ensure native scroll for About
      gsap.set(aboutRef.current, { opacity: 0 });
      gsap.set(closeButtonRef.current, { opacity: 0 });
      gsap.set(navListRef.current, {
        display: 'none',
      });
      gsap.set(document.querySelector('main'), {
        height: '100vh',
        overflow: 'hidden',
      });
    }, 0);

    setTimeout(() => {
      const tl = gsap.timeline();

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          if (isMobile) {
            tl.to(navRef.current, {
              height: '100vh',
              width: '100vw',
              duration: 0.4,
              ease: 'power2.out',
            });
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

          tl.to(contactLinkMobileRef.current, {
            opacity: 0,
            scale: .2,
            duration: 0.2,
            ease: 'power2.out',
          }, '<');

          tl.to(aboutRef.current, {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
          tl.to(closeButtonRef.current, {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
          }, '<');
        },
      );
    }, 100);
  };

  const handleCloseAbout = () => {

    const tl = gsap.timeline();

    function onComplete() {
      setIsAboutVisible(false);

      // Enable Lenis for smooth scrolling
      if (window.lenis) {
        initSmoothScrolling();
      }

      document.body.style.overflow = 'auto';

      setTimeout(() => {
        const mm = gsap.matchMedia();
        mm.add(
          {
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)",
          },
          (context) => {
            const { isMobile } = context.conditions;

            if (isMobile) {
              gsap.set(aboutLinkMobileRef.current, { opacity: 0, scale: .8 });
              gsap.to(aboutLinkMobileRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'bounce.out' }, '<');
            } else {
              gsap.set(aboutLinkRef.current, { opacity: 0, scale: .8 });
              gsap.to(aboutLinkRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'bounce.out' }, '<');
            }

            tl.to(logoRef.current, {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            }, '<');

            gsap.to(contactLinkMobileRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'bounce.out',
            }, '<');

            gsap.set(navListRef.current, {
              display: 'flex',
            });
            gsap.set(document.querySelector('main'), {
              height: 'auto',
              overflow: 'auto',
            });
          });
      }, 100);
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

        tl.to(closeButtonRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        }, '<');

        if (isMobile) {
          tl.to(navRef.current, {
            height: '60px',
            width: '120px',
            duration: 0.6,
            ease: 'ease.out',
            onComplete: onComplete,
          }, '<');
        } else {
          tl.to(navRef.current, {
            width: '120px',
            duration: 0.6,
            ease: 'ease.out',
            onComplete: onComplete,
          }, '<');
        }
      },
    );
  };

  useEffect(() => {
    // close about when resizing
    function closeAbout(e) {
      if (isAboutVisible) {
        e.preventDefault();
        handleCloseAbout();
      }
    }

    window.addEventListener('resize', closeAbout);
    return () => window.removeEventListener('resize', closeAbout);
  });

  return (
    <>
      <nav className={styles.nav} id="verticalnav" ref={navRef}>
        <div className={styles.nav__inner} ref={navInnerRef}>

          {isAboutVisible && (
            <button className={styles.closeButton} onClick={handleCloseAbout} ref={closeButtonRef}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 14" fill="none" className={styles.closeIcon}>
                <path d="M7.02441 0.2C7.02441 0.0895426 7.11396 0 7.22441 0H8.57441C8.68487 0 8.77441 0.0895431 8.77441 0.2V13.8C8.77441 13.9105 8.68487 14 8.57441 14H7.22441C7.11396 14 7.02441 13.9105 7.02441 13.8V0.2Z" fill="currentColor"></path><path d="M14.6994 6.125C14.8099 6.125 14.8994 6.21454 14.8994 6.325V7.675C14.8994 7.78546 14.8099 7.875 14.6994 7.875L1.09941 7.875C0.988957 7.875 0.899414 7.78546 0.899414 7.675L0.899414 6.325C0.899414 6.21454 0.988957 6.125 1.09941 6.125L14.6994 6.125Z" fill="currentColor"></path><path d="M8.77441 4.375V6.125H10.5244C9.55798 6.125 8.77441 5.34143 8.77441 4.375Z" fill="currentColor"></path><path d="M8.77441 9.625V7.875H10.5244C9.55798 7.875 8.77441 8.65857 8.77441 9.625Z" fill="currentColor"></path><path d="M7.02441 4.375V6.125H5.27441C6.24084 6.125 7.02441 5.34143 7.02441 4.375Z" fill="currentColor"></path><path d="M7.02441 9.625V7.875H5.27441C6.24084 7.875 7.02441 8.65857 7.02441 9.625Z" fill="currentColor"></path>
              </svg>
            </button>
          )}

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

          {isAboutVisible && (
            <div className={styles.nav__aboutContent} ref={aboutRef}>
              <About />
            </div>
          )}

          <div className={styles.nav__list} ref={navListRef}>
            {!isAboutVisible && (
              <div className={styles.nav__item}>
                <a href="#about" className={styles.aboutLink}>
                  <div className={styles.aboutCircleDesktop} ref={aboutLinkRef} data-content="About" onClick={handleShowAbout}>A</div></a>
              </div>
            )}

            <div className={styles.nav__item}>
              <a href="#contact" className={styles.aboutLink}>
                <div className={styles.contactCircleDesktop} ref={contactLinkRef} data-content="Contact">C</div></a>
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
          <div >A</div>
        </a>
      )}

      <a href="#contact" className={styles.contactCircleMobile} ref={contactLinkMobileRef} data-content="Contact">
        <div >C</div>
      </a>

    </>
  );
};

export default Header;