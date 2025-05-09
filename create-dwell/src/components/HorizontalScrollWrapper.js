import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as styles from './HorizontalScrollWrapper.module.scss';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollWrapper = ({ children, panelClassName }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const panels = gsap.utils.toArray(container.querySelectorAll(panelClassName));

    if (window.matchMedia("(min-width: 1024px)").matches) {
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${container.scrollWidth}`,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div ref={containerRef} className={styles.horizontalContainer}>
      {children}
    </div>
  );
};

export default HorizontalScrollWrapper;