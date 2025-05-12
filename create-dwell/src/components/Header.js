import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { initSmoothScrolling } from '../js/smoothscroll';
import * as styles from './Header.module.scss';
import AboutIcon from './AboutIcon';
import ContactIcon from './ContactIcon';
import ServicesIcon from './ServicesIcon';
import HomeIcon from './HomeIcon';
import MobileMenu from './MobileMenu';
import Logo from './Logo';

const Header = ({ onAnimationEnd, projects, resetProjects, filterProjects, onShowInfoPage, isInfoPageOpen, currentPage, mobileMenuState, onMobileMenuStateChange }) => {
  const orange = 'rgb(246, 171, 11)';

  const navRef = useRef(null);
  const navInnerRef = useRef(null);
  const navListRef = useRef(null);
  const logoRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const topbarRef = useRef(null);
  const navTopBarEls = useRef([]);
  const aboutLinkRef = useRef(null);
  const contactLinkRef = useRef(null);
  const servicesLinkRef = useRef(null);
  const homeButtonRef = useRef(null);

  const [selectedFilter, setSelectedFilter] = useState('all');

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
          hasFired = true;
        }
      },
      onComplete: () => {
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
        y: window.innerHeight * 8 / 10,
      });
      gsap.set(logoRef.current.querySelectorAll('svg'), { scale: isDesktop ? 2.5 : 1, x: isMobile ? 0 : 105 });

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

      if (isMobile) {
        tl.to(mobileMenuRef.current, { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }, '<');
      }
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(breakpoints, (context) => {
      const { isDesktop } = context.conditions;
      
      if (isDesktop) {
        if (isInfoPageOpen) {
          navRef.current.classList.add(styles.infoPageOpen);
        } else {
          navRef.current.classList.remove(styles.infoPageOpen);
        }
      }
    });

    return () => mm.revert();
  }, [isInfoPageOpen]);

  const handleCloseAll = () => {
    onShowInfoPage(null);
    initSmoothScrolling();
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
    });

    return () => mm.revert();
  };

  const handleShowContent = (e) => {
    e.stopPropagation();
    if (window.lenis) {
      window.lenis.destroy();
    }
  };

  const handleShowAbout = (e) => {
    handleShowContent(e);
    onShowInfoPage('about');
  };

  const handleShowContact = (e) => {
    handleShowContent(e);
    onShowInfoPage('contact');
  };

  const handleShowServices = (e) => {
    handleShowContent(e);
    onShowInfoPage('services');
  };

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
  };

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
  };

  return (
    <>
      <nav className={styles.nav} id="verticalnav" ref={navRef}>
        <div className={styles.nav__inner} ref={navInnerRef}>
          <div className={styles.nav__logo}>
            <div ref={logoRef} className={styles.logoSvg}>
              <Logo animate={typeof window !== 'undefined' && window.innerWidth <= 768 ? selectedFilter : undefined} isInfoPageOpen={isInfoPageOpen} />
            </div>
          </div>

          <div className={`${styles.nav__content} ${(selectedFilter !== 'all') ? styles.nav__contentVisible : ''}`}>
            <div className={styles.nav__list} ref={navListRef}>
              <div className={`${styles.nav__item} ${currentPage === null ? styles.active : ''}`}>
                <a href="#home">
                  <div className={`${styles.aboutCircleDesktop} ${currentPage === null ? styles.active : ''}`}
                    onClick={handleCloseAll} ref={homeButtonRef} data-content="Home">
                    <HomeIcon fill={orange} size={34} />
                  </div>
                </a>
              </div>

              <div className={`${styles.nav__item} ${currentPage === 'about' ? styles.active : ''}`}>
                <a href="#about" className={styles.aboutLink}>
                  <div
                    className={`${styles.aboutCircleDesktop} ${currentPage === 'about' ? styles.active : ''}`}
                    ref={aboutLinkRef} data-content="About" onClick={handleShowAbout}>
                    <AboutIcon stroke={orange} />
                  </div>
                </a>
              </div>

              <div className={`${styles.nav__item} ${currentPage === 'services' ? styles.active : ''}`}>
                <a href="#services" className={styles.servicesLink}>
                  <div
                    className={`${styles.servicesCircleDesktop} ${currentPage === 'services' ? styles.active : ''}`}
                    data-content="Services" onClick={handleShowServices} ref={servicesLinkRef}>
                    <ServicesIcon stroke={orange} fill="white" />
                  </div>
                </a>
              </div>

              <div className={`${styles.nav__item} ${currentPage === 'contact' ? styles.active : ''}`}>
                <a href="#contact" className={styles.contactLink}>
                  <div
                    className={`${styles.contactCircleDesktop} ${currentPage === 'contact' ? styles.active : ''}`}
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
        <MobileMenu 
          onMenuItemClick={handleMenuClick} 
          mobileMenuState={mobileMenuState}
          onMobileMenuStateChange={onMobileMenuStateChange}
        />
      </div>
    </>
  );
};

export default Header;