import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import * as styles from './InfoPage.module.scss';
import HalfCircle from './HalfCircle';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import gsap from 'gsap';
import * as footerStyles from './Footer.module.scss';

const InfoPage = ({ isOpen, onClose, currentPage, onSectionChange, mobileMenuState, onMobileMenuStateChange, filterProjects, resetProjects, contactImageUrl }) => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const contentRef = useRef(null);
  const infoPageRef = useRef(null);
  const [visibleSection, setVisibleSection] = useState(null);
  const isScrollingRef = useRef(false);
  const hasInitializedRef = useRef(false);
  const orange = '#fbe4b7';
  const [selectedFilter, setSelectedFilter] = useState('all');
  const footerRef = useRef(null);
  const formspreeId = 'manoavep';
  useEffect(() => {
    if (contactRef.current && contactImageUrl) {
      contactRef.current.style.backgroundImage = `url(${contactImageUrl})`;
      contactRef.current.style.backgroundSize = 'cover';
      contactRef.current.style.backgroundPosition = 'center';
      contactRef.current.style.backgroundRepeat = 'no-repeat';
      contactRef.current.style.backgroundAttachment = 'fixed';
    }

  }, [contactImageUrl]);

  useEffect(() => {
    if (isOpen && footerRef.current) {
      const curr = footerRef.current;
      gsap.to(curr.querySelector(`.${footerStyles.footer}`), { opacity: 1, duration: 0.5, delay: 0.5 });
    }

    if (isOpen) {
      setTimeout(() => {
        if (contactRef.current && contactImageUrl) {
          contactRef.current.style.backgroundImage = `url(${contactImageUrl})`;
          contactRef.current.style.backgroundSize = 'cover';
          contactRef.current.style.backgroundPosition = 'center';
          contactRef.current.style.backgroundRepeat = 'no-repeat';
          contactRef.current.style.backgroundAttachment = 'fixed';
        }
      }, 800);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('info-page-open');
      // Reset initialization when InfoPage opens
      hasInitializedRef.current = false;
    } else {
      document.body.classList.remove('info-page-open');
    }
    return () => {
      document.body.classList.remove('info-page-open');
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && currentPage) {
      const scrollToRef = {
        about: aboutRef,
        services: servicesRef,
        contact: contactRef
      }[currentPage];

      if (scrollToRef?.current) {
        isScrollingRef.current = true;

        // If this is the first time opening, wait a bit for the animation to complete
        if (!hasInitializedRef.current) {
          setTimeout(() => {
            scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
            hasInitializedRef.current = true;
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 1000);
          }, 500); // Wait for the slide-in animation to complete
        } else {
          scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1000);
        }
      }
    }
  }, [currentPage, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const options = {
      root: contentRef.current,
      rootMargin: '-40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      if (isScrollingRef.current) return; // Don't update during programmatic scrolling

      // Find the entry that is most visible in the viewport
      const mostVisibleEntry = entries.reduce((prev, current) => {
        const prevRect = prev.boundingClientRect;
        const currentRect = current.boundingClientRect;
        const viewportHeight = window.innerHeight;

        // Calculate how close each element is to the center of the viewport
        const prevDistance = Math.abs(prevRect.top + prevRect.height / 2 - viewportHeight / 2);
        const currentDistance = Math.abs(currentRect.top + currentRect.height / 2 - viewportHeight / 2);

        return prevDistance < currentDistance ? prev : current;
      });

      const section = mostVisibleEntry.target.getAttribute('data-section');
      if (section !== visibleSection) {
        setVisibleSection(section);
        onSectionChange?.(section);
      }
    }, options);

    const sections = [
      { ref: aboutRef, section: 'about' },
      { ref: servicesRef, section: 'services' },
      { ref: contactRef, section: 'contact' }
    ];

    sections.forEach(({ ref, section }) => {
      if (ref.current) {
        ref.current.setAttribute('data-section', section);
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [isOpen, onSectionChange, visibleSection]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is on a navigation link
      const isNavLink = event.target.closest('a[href]') || 
                       event.target.closest('button') ||
                       event.target.closest(`.${styles.mobileMenuWrapper}`);

      if (isOpen && infoPageRef.current && !infoPageRef.current.contains(event.target) && !isNavLink) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleMenuClick = (e, id) => {
    if (['all', 'commercial', 'residential'].includes(id)) {
      // Trigger filtering in Home.js
      if (id === 'all') {
        resetProjects?.();
      } else {
        filterProjects?.(id);
      }
      onClose();
    } else if (id === 'about' || id === 'services' || id === 'contact') {
      onSectionChange?.(id);
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <AnimatePresence mode="wait" transition={{ duration: 0.45, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {isOpen && (
        <motion.div
          ref={infoPageRef}
          className={styles.infoPage}
          initial={{ x: window.innerWidth > 768 ? -1000 : window.innerWidth }}
          animate={{ x: 0 }}
          exit={{ x: window.innerWidth > 768 ? -1000 : window.innerWidth }}
          transition={{
            type: 'tween',
            duration: .3,
            ease: 'easeOut'
          }}
          onAnimationComplete={() => {
            if (!isOpen) {
              // Clean up any remaining state
              setVisibleSection(null);
              isScrollingRef.current = false;
            }
          }}
        >
          <div className={styles.mobileNav}>
            <div className={styles.logoWrapper}>
              <HalfCircle
                fill="white"
                stroke={orange}
                width={10}
                height={10}
              />
            </div>
            <div className={styles.mobileMenuWrapper}>
              <MobileMenu
                onMenuItemClick={handleMenuClick}
                mobileMenuState={mobileMenuState}
                onMobileMenuStateChange={onMobileMenuStateChange}
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* {window.innerWidth > 767 && (
            <motion.button 
              className={styles.closeButton} 
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span>×</span>
            </motion.button>
          )} */}

          <motion.div
            id="info-page-content"
            className={styles.content}
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div ref={aboutRef}>
              <About />
            </div>
            <div ref={servicesRef}>
              <Services />
            </div>
            <div ref={contactRef} className={styles.contact}>
              <div className={styles.contactContainer}>
                <Contact contactImageUrl={contactImageUrl} formspreeId={formspreeId} />
              </div>
            </div>

            <div ref={footerRef} className={styles.footer}>
              <Footer />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoPage;