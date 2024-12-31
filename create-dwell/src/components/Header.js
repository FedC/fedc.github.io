import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import * as styles from './Header.module.scss';
import HalfCircle from './HalfCircle';
import About from './About';

const Header = ({ onAnimationEnd }) => {
  const navRef = useRef(null);
  const navInnerRef = useRef(null);
  const logoRef = useRef(null);

  const letterRefsCreate = useRef([]);
  const letterRefsDwell = useRef([]);

  const topbarRef = useRef(null);
  const navTopBarEls = useRef([]);
  const aboutLinkRef = useRef(null);
  const aboutLinkMobileRef = useRef(null);
  const contactLinkRef = useRef(null);
  const contactLinkMobileRef = useRef(null);

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
          x: isMobile ? 25 : 12.5,
          scale: isDesktop ? 3 : 1.8,
          transformOrigin: '50% 50%',
        });

        gsap.to(letterRefsCreate.current, { opacity: 1, duration: .5 });
        gsap.set(letterRefsDwell.current, { x: 0, color: 'rgba(246, 171, 11, 0.65)' });
        const orangeHalf = document.querySelector('.orangeHalf');
        gsap.set(orangeHalf, { fill: 'rgba(246, 171, 11, 0.65)' });
        gsap.to(letterRefsDwell.current, { opacity: 1, duration: .5 });

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

        tl.delay(2.5); // Delay the animation

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
            duration: 1.2,
            ease: 'ease',
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

  const handleShowAbout = () => {
    setIsAboutVisible(true);

    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions;

        if (isMobile) {
          gsap.to(navRef.current, {
            height: '100vh',
            width: '80vw',
            duration: 0.8,
            ease: 'power2.out',
          });
        } else {
          gsap.to(navRef.current, {
            width: '90vw',
            duration: 0.8,
            ease: 'power2.out',
          });
        }
      },
    );
  };

  const handleCloseAbout = () => {

    function onComplete() {
      setIsAboutVisible(false);
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
          });
      }, 500);
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
          gsap.to(navRef.current, {
            height: '60px',
            width: '120px',
            duration: 0.8,
            ease: 'power2.in',
            onComplete: onComplete,
          });
        } else {
          gsap.to(navRef.current, {
            width: '120px',
            duration: 0.8,
            ease: 'power2.in',
            onComplete: onComplete,
          });
        }
      },
    );
  };

  return (
    <>
      <nav className={styles.nav} id="verticalnav" ref={navRef}>
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

          {isAboutVisible && (
            <div className={styles.nav__aboutContent}>
              <button className={styles.closeButton} onClick={handleCloseAbout}>
                ✕
              </button>
              <About />
            </div>
          )}

          <div className={styles.nav__list}>
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