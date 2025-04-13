import React, { useRef, useEffect, useState, use } from 'react';
import { gsap } from 'gsap';
import { initSmoothScrolling } from '../js/smoothscroll';
import * as styles from './Header.module.scss';
// import HalfCircle from './HalfCircle';
import AboutIcon from './AboutIcon';
import ContactIcon from './ContactIcon';
import ServicesIcon from './ServicesIcon';
// import CloseIcon from './CloseIcon';
import HomeIcon from './HomeIcon';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import MobileMenu from './MobileMenu';
import Logo from './Logo';

const Header = ({ onAnimationEnd, projects, resetProjects, filterProjects }) => {

  const orange = 'rgb(246, 171, 11)';

  const navRef = useRef(null);
  const navInnerRef = useRef(null);
  const navListRef = useRef(null);
  const logoRef = useRef(null);
  const contactRef = useRef(null);
  const servicesRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // const letterRefsCreate = useRef([]);
  // const letterRefsDwell = useRef([]);

  const topbarRef = useRef(null);
  const navTopBarEls = useRef([]);
  const aboutLinkRef = useRef(null);
  const contactLinkRef = useRef(null);
  const servicesLinkRef = useRef(null);
  const aboutRef = useRef(null);
  const homeButtonRef = useRef(null);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);

  let hasFired = false;
  let entryAnimation = false;

  const breakpoints = { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" };

  useEffect(() => {
    if (entryAnimation) {
      return;
    }
    entryAnimation = true;
    const originalInnerNavWidth = navRef.current.offsetWidth;
    const navLinks = [homeButtonRef.current, aboutLinkRef.current, servicesLinkRef.current, contactLinkRef.current];

    gsap.set(topbarRef.current, { opacity: 0 });
    gsap.set(navLinks, { opacity: 0 });

    if (window.matchMedia('(max-width: 767px)').matches) {
      gsap.set(mobileMenuRef.current, { opacity: 0, x: 100 });
    }

    const tl = gsap.timeline({
      onUpdate: function () {
        if (tl.currentLabel() === 'logoUp' && !hasFired) {
          onAnimationEnd();
          hasFired = true; // Ensure it only fires once
        }
      },
      onComplete: () => {
        // gsap.set(logoRef.current, { transformOrigin: 'center center' });
        mm.kill();
        setElementsVisibility();
      },
    });

    const mm = gsap.matchMedia();

    mm.add(breakpoints, (context) => {
      const { isDesktop, isMobile } = context.conditions;

      const orangeHalf = document.querySelector('.js-orange-half');
      const logoDwell = document.querySelector('.js-logo-dwell');

      gsap.set(navRef.current, {
        width: isMobile ? '90px' : '50%',
      });

      if (isMobile) {
        gsap.set(navRef.current, { height: '100vh' });
      }

      gsap.set(logoRef.current, {
        y: window.innerHeight * 8 / 10, // Start at the bottom
        // x: isMobile ? -11 : 0,
        // scale: isDesktop ? 3 : 1.8,
        // transformOrigin: '50% 50%',
      });
      gsap.set(logoRef.current.querySelectorAll('svg'), { scale: isDesktop ? 2.5 : 1, x: isMobile ? 0 : 105 });

      // debugger;

      gsap.set(logoDwell, { fill: 'rgba(246, 171, 11, 0.65)', opacity: 1 });
      gsap.set(orangeHalf, { fill: 'rgba(246, 171, 11, 0.65)' });

      tl.to(logoDwell, { fill: 'rgba(246, 171, 11, 0.65)', delay: 1.5 });
      tl.to(
        logoRef.current,
        {
          y: isMobile ? 0 : 20,
          x: 0,
          duration: 2,
          ease: 'power2.out',
        },
      ).addLabel('logoUp', '-=1.4');

      if (isMobile) {
        tl.to(navRef.current, {
          y: 0,
          height: '75px',
          backgroundColor: '#f6ab0b',
          backdropFilter: 'blur(0px)',
          duration: 2,
          ease: 'power2.out',
        }, '<');
      }

      tl.to(navRef.current, {
        y: 0,
        x: 0,
        height: isMobile ? '75px' : '100vh',
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
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          logoRef.current.querySelectorAll('svg'),
          {
            scale: 1,
            x: 0,
            duration: 1.5,
            ease: 'power2.out',
          },
          '<'
        );

      tl.to(logoDwell, { fill: '#f6ab0b)' }, '<');
      tl.to(orangeHalf, { fill: '#f6ab0b' }, '<');
      tl.to(topbarRef.current,
        { opacity: 1, duration: 0.5 },
      );

      if (isDesktop) {
        gsap.set(navTopBarEls.current, { opacity: 0, x: 100 });
        gsap.set(navLinks, { opacity: 0, scale: 0, y: -10 });
        tl.to(navTopBarEls.current, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', stagger: 0.1 }, '<');
        tl.delay(.5);
        tl.to(navLinks, { opacity: 1, scale: 1, y: 0, duration: .22, ease: 'power2.out', stagger: .1 }, '<');
      }

      // debugger;
      if (isMobile) {
        tl.to(mobileMenuRef.current, { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }, '<');
      }

    }
    );

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
      handleCloseAbout();
    } else if (isContactVisible) {
      closeContact();
    } else if (isServicesVisible) {
      handleCloseServices();
    } else {
      resetProjects();
    }
  };

  const setElementsVisibility = () => {
    const mm = gsap.matchMedia();
    mm.add(breakpoints, (context) => {
      const { isDesktop, isMobile } = context.conditions;

      if (isMobile) {
        gsap.set(aboutLinkRef.current, { opacity: 0 });
        gsap.set(contactLinkRef.current, { opacity: 0 });
        gsap.set(servicesLinkRef.current, { opacity: 0 });
        gsap.set(navRef.current, { height: '75px' });
        gsap.set(topbarRef.current, { opacity: 1 });
      } else {
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
        gsap.set(aboutRef.current.querySelector('*'), { opacity: 0 });
      });

      const tl = gsap.timeline();
      const mm = gsap.matchMedia();
      mm.add(breakpoints, (context) => {
        const { isMobile, isDesktop } = context.conditions;

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
          }

          if (isDesktop) {
            tl.to(navRef.current, {
              width: '90vw',
              duration: 0.8,
              ease: 'power2.out',
            });
          }

          if (aboutRef.current) {
            tl.to(aboutRef.current.querySelector('*'), {
              opacity: 1,
              duration: 0.2,
              ease: 'power2.out',
            });
          }
        }, 200);

      },
      );
    }
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
      mm.add(breakpoints, (context) => {
        const { isDesktop } = context.conditions;

        if (isDesktop) {
          gsap.set(aboutLinkRef.current, { opacity: .9, scale: .8 });
        }

        setTimeout(() => {
          if (isDesktop) {
            gsap.to(aboutLinkRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'bounce.out' }, '<');
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
    mm.add(breakpoints, (context) => {
      const { isMobile } = context.conditions;

      tl.to(aboutRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      });

      if (isMobile) {
        tl.to(navRef.current, {
          height: '75px',
          width: '90px',
          duration: 0.6,
          ease: 'ease.out',
          onComplete: onComplete,
        }, '<');
      } else {
        tl.to(navRef.current, {
          width: '90px',
          duration: 0.6,
          ease: 'ease.out',
          onComplete: onComplete,
        }, '<');
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
      mm.add(breakpoints, (context) => {
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

  const closeContact = () => {
    const tl = gsap.timeline();

    function onComplete() {
      setIsContactVisible(false);

      // Enable Lenis for smooth scrolling
      if (window.lenis) {
        initSmoothScrolling();
      }

      const mm = gsap.matchMedia();
      mm.add(breakpoints, (context) => {
        const { isDesktop } = context.conditions;

        if (isDesktop) {
          gsap.set(contactLinkRef.current, { opacity: .9, scale: .8 });
        }

        setTimeout(() => {
          if (isDesktop) {
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
    mm.add(breakpoints, (context) => {
      const { isMobile } = context.conditions;

      tl.to(contactRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      });

      if (isMobile) {
        tl.to(navRef.current, {
          height: '75px',
          width: '90px',
          duration: 0.6,
          ease: 'ease.out',
          onComplete: onComplete,
        }, '<');
      } else {
        tl.to(navRef.current, {
          width: '90px',
          duration: 0.6,
          ease: 'ease.out',
          onComplete: onComplete,
        }, '<');
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
      mm.add(breakpoints, (context) => {
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
      mm.add(breakpoints, (context) => {
        const { isDesktop } = context.conditions;

        if (isDesktop) {
          gsap.set(servicesLinkRef.current, { opacity: .9, scale: .8 });
        }

        setTimeout(() => {
          if (isDesktop) {
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
    mm.add(breakpoints, (context) => {
      const { isMobile } = context.conditions;

      tl.to(servicesRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      });

      if (isMobile) {
        tl.to(navRef.current, {
          height: '75px',
          width: '90px',
          duration: 0.6,
          ease: 'ease.out',
          onComplete: onComplete,
        }, '<');
      } else {
        tl.to(navRef.current, {
          width: '90px',
          duration: 0.6,
          ease: 'ease.out',
          onComplete: onComplete,
        }, '<');
      }
    }
    );
  }

  const noneAreOpen = !isAboutVisible && !isContactVisible && !isServicesVisible;

  const handleMenuClick = (e, id) => {
    if (id === 'about') {
      handleShowAbout(e);
    } else if (id === 'services') {
      handleShowServices(e);
    } else if (id === 'contact') {
      handleShowContact(e);
    } else if (['all', 'commercial', 'residential'].includes(id)) {
      onTopBarLinkClick(e, id);
    }
  }

  const onTopBarLinkClick = (e, filter) => {
    if (e) {
      e.preventDefault();
    }
    setSelectedFilter(filter);
    if (filter === 'all') {
      resetProjects();
    } else {
      filterProjects(filter);
    }
  }

  return (
    <>
      <nav className={styles.nav} id="verticalnav" ref={navRef}>

        <div className={styles.nav__inner} ref={navInnerRef}>

          <div className={styles.nav__logo}>
            <div ref={logoRef} className={styles.logoSvg}>
              <Logo />
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
                <a href="#home">
                  <div className={`${styles.aboutCircleDesktop} ${noneAreOpen ? styles.active : ''}`}
                    onClick={handleCloseAll} ref={homeButtonRef} data-content="Home">
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
          <a className={`${styles.nav__link} ${selectedFilter === 'all' ? styles.active : ''}`} 
            ref={(el) => navTopBarEls.current[1] = el} onClick={(e) => onTopBarLinkClick(e, 'all')}>All</a>

          <a className={`${styles.nav__link} ${selectedFilter === 'residential' ? styles.active : ''}`} 
            ref={(el) => navTopBarEls.current[2] = el} onClick={(e) => onTopBarLinkClick(e, 'residential') }>Residential</a>

          <a className={`${styles.nav__link} ${selectedFilter === 'commercial' ? styles.active : ''}`}
            ref={(el) => navTopBarEls.current[3] = el} onClick={(e) => onTopBarLinkClick(e, 'commercial')}>Commercial</a>
        </div>
      </nav>

      <div ref={mobileMenuRef} className={styles.mobileMenuContainer}>
        <MobileMenu onMenuItemClick={handleMenuClick} />
      </div>
    </>
  );
};

export default Header;