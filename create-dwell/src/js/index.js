import { preloadImages } from './utils.js';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { storage } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust path to your Firebase configuration

async function getProjectImages(projectId) {
  try {
    // Reference to the project images directory
    const projectImagesRef = ref(storage, `projects/${projectId}/images`);

    // List all files in the directory
    const result = await listAll(projectImagesRef);

    // Get download URLs for each file
    const imageUrls = await Promise.all(
      result.items.map(itemRef => getDownloadURL(itemRef))
    );

    console.log('Project Images:', imageUrls);
    return imageUrls;
  } catch (error) {
    console.error('Error fetching project images:', error);
  }
}

let lenis;

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const entry = document.querySelector('.entry-animation');
const nav = document.querySelector('.nav');
const grid = document.querySelector('.grid');
const gridImages = grid.querySelectorAll('.grid__item-imgwrap');
const marqueeInner = document.querySelector('.mark > .mark__inner');

const overlay = document.querySelector('.fullscreen-overlay');
const projectContent = overlay.querySelector('.project-content');
const closeOverlayBtn = document.querySelector('.close-overlay');
let isOverlayOpen = false;

const isLeftSide = (element) => {
  const elementCenter = element.getBoundingClientRect().left + element.offsetWidth / 2;
  const viewportCenter = window.innerWidth / 2;
  return elementCenter < viewportCenter;
};

const animateScrollGrid = () => {
  gridImages.forEach(imageWrap => {
    const imgEl = imageWrap.querySelector('.grid__item-img');
    const leftSide = isLeftSide(imageWrap);

    gsap.timeline({
      scrollTrigger: {
        trigger: imageWrap,
        start: 'top bottom+=10%',
        end: 'bottom top-=25%',
        scrub: true,
      }
    })
      .from(imageWrap, {
        // Initial state when the element enters the viewport
        startAt: { filter: 'blur(0px) brightness(100%) contrast(100%)' }, // Ensure no blur or brightness adjustments at the start
        z: 300,                             // Translate the item 300px closer on the Z-axis
        rotateX: 70,                        // Start with a rotation of 70 degrees on the X-axis
        rotateZ: leftSide ? 5 : -5,         // Rotate 5 degrees if on the left, -5 degrees if on the right
        xPercent: leftSide ? -40 : 40,      // Horizontal translation: -40% if on the left, 40% if on the right
        skewX: leftSide ? -20 : 20,         // Skew the element on the X-axis
        yPercent: 100,                      // Start with the element below the viewport
        filter: 'blur(7px) brightness(0%) contrast(400%)', // Start with a blur, low brightness, and high contrast
        ease: 'sine',
      })
      .to(imageWrap, {
        // Animation when the element exits the viewport
        z: 300,                             // Move back to original Z-translation (300px)
        rotateX: -50,                       // Rotate -50 degrees on the X-axis
        rotateZ: leftSide ? -1 : 1,         // Slightly rotate on the Z-axis (-1 or 1 depending on side)
        xPercent: leftSide ? -20 : 20,      // Move slightly left (-20%) or right (20%) on exit
        skewX: leftSide ? 10 : -10,         // Skew slightly on exit
        filter: 'blur(4px) brightness(0%) contrast(500%)', // Add blur and reduce brightness on exit
        ease: 'sine.in',
      })
      .from(imgEl, {
        // Additional animation on the image itself (scale along the Y-axis)
        scaleY: 1.8,                        // Scale Y-axis by 1.8
        ease: 'sine',
      }, 0)
      .to(imgEl, {
        scaleY: 1.8,                        // Return to normal scaling
        ease: 'sine.in'
      }, '>');
  });
};

// Function to animate the horizontal marquee as the user scrolls
const animateMarquee = () => {
  gsap.timeline({
    scrollTrigger: {
      trigger: grid,                     // Trigger the animation based on the grid's position
      start: 'top bottom',               // Start the animation when the top of the grid is at the bottom of the viewport
      end: 'bottom top',                 // End the animation when the bottom of the grid is at the top of the viewport
      scrub: true,                       // Smooth scrub
    }
  })
    .fromTo(marqueeInner, {
      x: '200vw'                           // Start the marquee off-screen to the right
    }, {
      x: '-100%',                          // Move the marquee to the left (completely across the screen)
      ease: 'sine',
    });
};

const handleGridItemClick = async (imageWrapper) => {
  document.body.style.overflow = 'hidden';

  const projectId = imageWrapper.dataset.projectId;
  const img = imageWrapper.querySelector('.grid__item-img');
  const initialImgSrc = img.style.backgroundImage.slice(5, -2);

  const zoomedImg = imageWrapper.cloneNode(true);
  zoomedImg.classList.add('zoomed-image');
  document.querySelectorAll('.zoomed-image').forEach(el => el.remove());
  document.body.appendChild(zoomedImg);

  const rect = imageWrapper.getBoundingClientRect();
  zoomedImg.style.position = 'fixed';
  zoomedImg.style.zIndex = '6000';
  zoomedImg.style.transition = 'none';
  zoomedImg.style.transform = 'scale(1) translate3d(0, 0, 0)';
  zoomedImg.style.top = `${rect.top}px`;
  zoomedImg.style.left = `${rect.left}px`;
  zoomedImg.style.width = `${rect.width}px`;
  zoomedImg.style.height = `${rect.height}px`;
  zoomedImg.style.objectFit = 'cover';
  zoomedImg.style.borderRadius = 'var(--grid-item-radius)';
  zoomedImg.style.filter = imageWrapper.style.filter;

  zoomedImg.style.transition = 'transform 1s ease, opacity 0.5s ease, object-fit 0.5s ease';

  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  zoomedImg.appendChild(spinner);

  let content = [];
  try {
    // Fetch the project document from Firestore
    const projectRef = doc(db, 'projects', projectId);
    const projectDoc = await getDoc(projectRef);

    if (projectDoc.exists()) {
      content = projectDoc.data().content || []; // Get content array from Firestore
    } else {
      console.error("No such project!");
    }
  } catch (error) {
    console.error("Error fetching project content:", error);
  }

  spinner.remove();

  projectContent.innerHTML = '';
  content.forEach(contentItem => {
    if (contentItem !== null && typeof contentItem === 'object' && contentItem.type === 'text') {
      // Handle text or quote objects
      const contentElement = document.createElement('div');
      contentElement.classList.add('project-text');
      contentElement.innerText = contentItem.text;
      projectContent.appendChild(contentElement);
    } else if (contentItem !== null && typeof contentItem === 'object' && contentItem.type === 'quote') {
      // Handle quote objects
      const quoteElement = document.createElement('blockquote');
      quoteElement.classList.add('project-quote');
      quoteElement.innerText = contentItem.text;
      projectContent.appendChild(quoteElement);
    } else {
      // Handle image sources
      const imgElement = document.createElement('img');
      imgElement.src = contentItem.url;
      imgElement.classList.add('project-image');
      imgElement.alt = contentItem.title || contentItem.url.split('/').pop().split('.')[0];
      projectContent.appendChild(imgElement);
    }
  });

  overlay.appendChild(projectContent);
  isOverlayOpen = true;

  // Preload images to prevent visual loading issues
  await preloadImages('.project-content img');
  const overlayFirstImg = projectContent.querySelector('img');
  overlayFirstImg.style.opacity = 0; // Start with hidden image
  const firstImgRect = overlayFirstImg.getBoundingClientRect();
  overlay.classList.add('show');
  document.getElementById('main').classList.remove('shadow');

  // animate gspa timeline for zoomed image to overlay image position
  gsap.timeline()
    .to(zoomedImg, {
      duration: 0.3,
      ease: 'power2.out',
      top: `${firstImgRect.top}px`,
      left: `${firstImgRect.left}px`,
      width: `${firstImgRect.width}px`,
      height: `${firstImgRect.height}px`,
      scale: 1,
      blur: 0,
      skewX: 0,
      skewY: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      onComplete: () => {
        overlayFirstImg.style.opacity = 1; // Fade in the first image
        gsap.to(zoomedImg, {
          duration: .2,
          opacity: 0,
        }).then(() => {
          zoomedImg.remove();
        });
      }
    }).then(async () => {
      // allow scrolling
      document.body.style.overflow = 'auto';
      closeOverlayBtn.style.display = 'block';
      initLenisHorizontalScroll();
    });
};

const initLenisHorizontalScroll = () => {
  if (lenis) lenis.destroy();

  lenis = new Lenis({
    orientation: 'horizontal',
    smoothWheel: true,
    gestureOrientation: 'vertical',
    wrapper: overlay,
    content: projectContent,
  });

  lenis.on('scroll', (e) => {
    const currentScroll = lenis.animatedScroll;
    const maxScrollValue = lenis.limit;
    // Check if we've reached the end of scroll
    // make sure currentScroll might be half a pixel away from maxScrollValue
    if (currentScroll >= maxScrollValue || (currentScroll >= maxScrollValue - 0.5)) {
      closeOverlay();
    }
  });

  // Animation frame loop for Lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};

// Close overlay and reset
const closeOverlay = () => {
  // animate overlay fade out
  overlay.classList.add('fade-out');
  closeOverlayBtn.style.display = 'none';

  setTimeout(() => {
    overlay.classList.remove('show');
    document.getElementById('main').classList.add('shadow');
    projectContent.innerHTML = '';
    isOverlayOpen = false;
    overlay.classList.remove('fade-out');
  }, 600);
};

document.querySelectorAll('.grid__item-imgwrap').forEach(imageWrap => {
  imageWrap.addEventListener('click', () => handleGridItemClick(imageWrap));
});

closeOverlayBtn.addEventListener('click', closeOverlay);

function animateGridOnLoad() {
  window.scrollTo(0, 0);

  const timeOfWindowScroll = 2000;

  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    document.body.style.overflow = 'auto';
  }, timeOfWindowScroll);

  const entryCreate = document.querySelector('#entry-create');
  const entryDwell = document.querySelector('#entry-dwell');
  const entryOrangeCircle = document.querySelector('#entry-orange-circle');
  const entryWhiteCircle = document.querySelector('#entry-white-circle');

  gsap.timeline()
    .delay(2.5)
    .fromTo(entryWhiteCircle, {
      opacity: 0,
    }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, '=-1')
    .to(entry, {
      top: '-100vh',
      duration: 1,
      opacity: 0,
      ease: 'power2.out',
    })
    .fromTo(nav, {
      translateY: '-100%',
      opacity: 0,
    },
      {
        opacity: 1,
        translateY: '0',
        ease: 'power2.out',
      }, '=-.666')
    .fromTo(marqueeInner, {
      opacity: 0,
      duration: .5,
      ease: 'power2.out',
    }, {
      opacity: 1,
      duration: 2.5,
      ease: 'power2.out',
    }, '=-1.333')
    .to(grid, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    }, '=-1.1')
    .fromTo(window, {
      scrollTo: {
        y: 0,
      },
    }, {
      scrollTo: {
        y: document.body.clientHeight / 5,
      },
      duration: 2,
      ease: 'power2.out'
    }, '-=2');
}


const init = () => {
  animateScrollGrid();

  grid.style.opacity = 0;
  nav.style.translateY = '-100%';
  setTimeout(() => {
    animateGridOnLoad();
    animateMarquee();
  }, 1000);
};

preloadImages('.grid__item-img').then(() => {
  document.body.classList.remove('loading');
  setTimeout(() => {
    init();
  }, 0);
});