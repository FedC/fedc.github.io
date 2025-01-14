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
      window.lenis.stop();
      window.lenis.destroy();
    }

    setTimeout(() => {
      gsap.set(aboutRef.current, { opacity: 0 });
      gsap.set(closeButtonRef.current, { opacity: 0 });
      gsap.set(navListRef.current, {
        display: 'none',
      });
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

        }, 200);

      },
    );
  };

  const handleCloseAbout = () => {

    const tl = gsap.timeline();

    function onComplete() {
      setIsAboutVisible(false);

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

            gsap.to(contactLinkMobileRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'bounce.out',
            }, '<');

            gsap.set(navListRef.current, {
              display: 'flex',
            });
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
              <svg className={styles.closeIcon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
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
                  <div className={styles.aboutCircleDesktop} ref={aboutLinkRef} data-content="About" onClick={handleShowAbout}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(246, 171, 11)"><path d="M360-320q33 0 56.5-23.5T440-400q0-33-23.5-56.5T360-480q-33 0-56.5 23.5T280-400q0 33 23.5 56.5T360-320Zm240 0q33 0 56.5-23.5T680-400q0-33-23.5-56.5T600-480q-33 0-56.5 23.5T520-400q0 33 23.5 56.5T600-320ZM480-520q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0 440q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                  </div></a>
              </div>
            )}

            <div className={styles.nav__item}>
              <a href="#contact" className={styles.aboutLink}>
                <div className={styles.contactCircleDesktop} ref={contactLinkRef} data-content="Contact">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(246, 171, 11)"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" /></svg></div></a>
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
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M360-320q33 0 56.5-23.5T440-400q0-33-23.5-56.5T360-480q-33 0-56.5 23.5T280-400q0 33 23.5 56.5T360-320Zm240 0q33 0 56.5-23.5T680-400q0-33-23.5-56.5T600-480q-33 0-56.5 23.5T520-400q0 33 23.5 56.5T600-320ZM480-520q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0 440q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
          </div>
        </a>
      )}

      <a href="#contact" className={styles.contactCircleMobile} ref={contactLinkMobileRef} data-content="Contact">
        <div >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" /></svg>
        </div>
      </a>

    </>
  );
};

export default Header;