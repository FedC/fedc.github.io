import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

import './ProjectGrid.scss';

const ProjectGrid = ({ projects, onProjectClick }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const marqueeRef = useRef(null);
  const gridRef = useRef(null);
  const proxyRef = useRef(document.createElement('div'));
  const previousScrollY = useRef(0);
  const velocityScale = useRef(1);
  const minimumScaleOffset = 0.88;
  const maxScaleOffset = 1;
  const previousScale = useRef(1);
  let draggable;
  let scrollDirection;
  let currentProjectId;
  let snapping = false;

  useEffect(() => {
    const loadResources = async () => {
      if (!projects?.length) return;
      await preloadImages(projects);

      // repeat the items in the grid to create a seamless loop
      const grid = gridRef.current;
      const gridItems = Array.from(grid.querySelectorAll('.grid__item'));
      const gridItemsLength = gridItems.length;
      const cloneItems = gridItems.map((item) => item.cloneNode(true));
      cloneItems.forEach((clone, index) => {
        clone.classList.add('grid__item-clone');
        clone.dataset.projectId = gridItems[index % gridItemsLength].dataset.projectId;
        grid.appendChild(clone);
      });


      setImagesLoaded(true);
      startAnimations();
      initScrollEffects(gridRef.current, proxyRef.current);
    };

    loadResources();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [projects]);

  const preloadImages = (projects) =>
    Promise.all(
      projects.map(
        (project) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = project.mainImage;
            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    );

  const startAnimations = () => {
    animateFadeIn();
    animateGridSlideUp();
    animateMarqueeOnScroll();
  };

  const animateFadeIn = () => {
    gsap.timeline()
      .fromTo('.grid', { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo('.mark__inner', { opacity: 0 }, { opacity: 1, duration: 1 }, '<');
  };

  const animateGridSlideUp = () => {
    gsap.timeline().fromTo('.grid', { y: '10vh' }, { y: '0', duration: 1.5, ease: 'power2.out' });
  };

  const animateMarqueeOnScroll = () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.grid',
        start: 'top=+25% center',
        end: 'bottom center+=50%',
        scrub: true,
      },
    }).fromTo(
      '.mark > .mark__inner',
      { x: '100vw' },
      { x: '-100%', ease: 'sine' }
    );
  };

  const initScrollEffects = (grid, proxy) => {
    gsap.set(".grid__item", { transformOrigin: "right center", force3D: true });
    gsap.set(".grid__item-img", { transformOrigin: "right center", force3D: true });

    const gridItems = grid.querySelectorAll('.grid__item');
    const snapPoints = Array.from(gridItems).map((_, index) => grid.offsetWidth);

    draggable = Draggable.create(proxy, {
      type: 'x',
      inertia: true,
      bounds: { minX: snapPoints[snapPoints.length - 1], maxX: snapPoints[0] },
      snap: (value) =>
        snapPoints.reduce((closest, point) =>
          Math.abs(value - point) < Math.abs(value - closest) ? point : closest
        ),
      onDrag: () => updateGridPosition(proxy, grid),
      onThrowUpdate: () => updateGridPosition(proxy, grid),
    });

    // ScrollTrigger
    ScrollTrigger.create({
      trigger: grid,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        velocityScale.current = Math.max(1 - Math.abs(velocity) / 1000, minimumScaleOffset);
        updateVelocityScale(velocity);
      },
    });

    gridItems.forEach((item, index) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            scrollDirection = velocity > 0 ? 1 : -1;
            applySkewEffect(velocity);
          },
          onEnter: (self) => {
            currentProjectId = item.dataset.projectId;
            console.log('currentProjectId', currentProjectId);
            gsap.to(self, {
              duration: 0.5,
              scale: 1.1,
            });
          }
        },
      });
    });

    const updateGridPosition = (proxy, grid) => {
      const xPosition = gsap.getProperty(proxy, 'x');
      gsap.to(grid, { x: xPosition, duration: 0 });
    };

    const handleResize = () => {
      const updatedSnapPoints = Array.from(gridItems).map((_, index) => -index * grid.offsetWidth);
      draggable[0].applyBounds({
        minX: updatedSnapPoints[updatedSnapPoints.length - 1],
        maxX: updatedSnapPoints[0],
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      draggable.forEach((d) => d.kill());
    };
  };

  const borderRadiusDefault = '40% 80% 60% 80%';
  let proxy = { x: 0, borderRadius: borderRadiusDefault };

  const applySkewEffect = (velocity) => {
    // make a liquid effect
    const factor = velocityScale.current - Math.abs(velocity) / 200;

    // Adjust border-radius values based on the clamped factor
    const topLeft = 40 + factor * -5 * scrollDirection * 0.2;
    const topRight = 40 + factor * -5 * scrollDirection * 0.2;
    const bottomRight = 50 - factor * -5 * scrollDirection * 0.2;
    const bottomLeft = 50 - factor * -5 * scrollDirection * 0.2;

    // ensure no value goes below 57% or above 78%
    const clampedTopLeft = clamp(topLeft, 40, 78);
    const clampedTopRight = clamp(topRight, 40, 80);
    const clampedBottomRight = clamp(bottomRight, 50, 80);
    const clampedBottomLeft = clamp(bottomLeft, 50, 70);

    // Update the borderRadius dynamically
    proxy.borderRadius = `${clampedTopLeft}% ${clampedTopRight}% ${clampedBottomRight}% ${clampedBottomLeft}%`;

    console.log('proxy.borderRadius', proxy.borderRadius);

    gsap.to(".grid__item", {
      borderRadius: proxy.borderRadius,
      // z: -150,
      // scale: .88,
      duration: 0.8,
      ease: 'power3',
      overwrite: true,
    });

    // Reset skew back to 0 gradually
    gsap.to(proxy, {
      borderRadius: borderRadiusDefault,
      // scale: 1,
      // z: 0,
      duration: 0.8,
      ease: 'power3',
      overwrite: true,
    });
  };

  const snapToClosestItem = () => {
    const gridElement = gridRef.current;
    const gridItems = Array.from(gridElement.querySelectorAll('.grid__item'));
    if (!gridItems.length) return;
  
    const currentScrollY = window.scrollY;
  
    // Find the closest grid item to snap to
    const closestItem = gridItems.reduce((closest, item) => {
      const itemOffsetTop = item.getBoundingClientRect().top + currentScrollY;
      return Math.abs(itemOffsetTop - currentScrollY) <
        Math.abs(closest.offsetTop - currentScrollY)
        ? item
        : closest;
    });
  
    // Scroll to the closest item
    if (closestItem) {
      ScrollTrigger.disable();
      const targetY = closestItem.getBoundingClientRect().top + currentScrollY - 100; // Adjust 100px offset
      gsap.to(window, {
        scrollTo: { y: targetY },
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          ScrollTrigger.enable();
        },
      });
    }
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateVelocityScale = (velocity) => {
    const gridElement = gridRef.current;
    if (!gridElement) return;

    const scrollDirection = velocity > 0 ? 1 : -1;
    const gridItems = Array.from(gridElement.querySelectorAll('.grid__item')); // Collect all grid items
    const itemHeight = gridItems[0].offsetHeight; // Assuming all items are the same height
    const gridBounds = gridElement.getBoundingClientRect();

    const currentScrollY = window.scrollY;
    const differenceScroll = Math.abs(currentScrollY - previousScrollY.current);
    previousScrollY.current = currentScrollY;

    const calcScale = Math.max(
      velocityScale.current - differenceScroll / 200,
      minimumScaleOffset
    );

    if (previousScale.current !== calcScale) {
      const scaleDirection = calcScale > previousScale.current ? 1 : -1;
      let scale = Math.max(
        Math.min(calcScale, maxScaleOffset),
        minimumScaleOffset
      );
      // if scaling up and scale is near maxScaleOffset, scale the grid items to 1
      // if (scaleDirection === 1 && scale > 0.9) {
      //   scale = 1;
      // }

      gsap.to(gridElement, {
        scale,
        duration: 1,
        transformOrigin: 'center center',
        ease: 'power2.out',
        // onComplete: snapToGrid,
      });

      previousScale.current = calcScale;
    }
  };

  const transformToDashedLowerCase = (str) => str.toLowerCase().replace(/\s/g, '-');

  const throttle = (callback, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall < delay) return;
      lastCall = now;
      callback(...args);
    };
  };

  return (
    <>
      <div className="grid" ref={gridRef}>
        {projects.map(
          (project) =>
            project.published && (
              <div key={project.id} className="grid__item-snap-point" id={
                transformToDashedLowerCase(project.projectType) + '-' + project.id
              }>
                <div>
                  <figure
                    className="grid__item"
                    data-title={project.title}
                    data-project-id={project.id}
                    onClick={(e) => onProjectClick(project, e.currentTarget)}
                  >
                    <div className="grid__item-imgwrap">
                      <div
                        className="grid__item-img"
                        style={{ backgroundImage: `url(${project.mainImage})` }}
                      ></div>
                    </div>

                    <div className='grid__item-info'>
                      <h3>{project.title}</h3>
                      <p>{project.location}</p>
                    </div>

                  </figure>

                </div>
              </div>
            )
        )}
      </div>
      <div className="mark" ref={marqueeRef}>
        <div className="mark__inner font-alt">
          <span>Architecture</span>
          <span>Interior Design</span>
          <a href={'#residential-0'}><span>Residential</span></a>
          <span>Commercial</span>
          <span>Cultural</span>
          <div className="spacer"></div>
        </div>
      </div>
    </>
  );
};

export default ProjectGrid;