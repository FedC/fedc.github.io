import { preloadImages } from './utils.js'; // Import utility function to preload images

let lenis; // Declare Lenis instance

gsap.registerPlugin(ScrollTrigger); // Register GSAP's ScrollTrigger plugin
gsap.registerPlugin(ScrollToPlugin);
// gsap.registerPlugin(SplitText);     // Register GSAP's SplitText plugin

const entry = document.querySelector('.entry-animation');
const nav = document.querySelector('.nav');
const grid = document.querySelector('.grid'); // Select the container that holds all grid items
const gridImages = grid.querySelectorAll('.grid__item-imgwrap'); // Select all elements with the class '.grid__item-imgwrap'
const marqueeInner = document.querySelector('.mark > .mark__inner'); // Select the inner element of the marquee

// const textElement = document.querySelector('.text'); // Select the text element
// var splitTextEl = new SplitText(textElement, {type: 'chars'}); // Split the text into individual characters for animation
// const creditsTexts = document.querySelectorAll('.credits'); // Select all elements with the class '.credits'

const overlay = document.querySelector('.fullscreen-overlay');
const projectContent = overlay.querySelector('.project-content');
const closeOverlayBtn = overlay.querySelector('.close-overlay');
let isOverlayOpen = false;

// Helper function to determine if the element is on the left or right side of the viewport
const isLeftSide = (element) => {
  const elementCenter = element.getBoundingClientRect().left + element.offsetWidth / 2; // Calculate the center of the element
  const viewportCenter = window.innerWidth / 2; // Calculate the center of the viewport
  return elementCenter < viewportCenter; // Return true if the element's center is to the left of the viewport's center
};

// Function to animate the grid items as they scroll into and out of view
const animateScrollGrid = () => {
  gridImages.forEach(imageWrap => {
    const imgEl = imageWrap.querySelector('.grid__item-img'); // Select the image element inside the grid item
    const leftSide = isLeftSide(imageWrap); // Check if the element is on the left side of the viewport

    // Create a GSAP timeline with ScrollTrigger for each grid item
    gsap.timeline({
      scrollTrigger: {
        trigger: imageWrap,               // Trigger the animation when this element enters the viewport
        start: 'top bottom+=10%',         // Start when the top of the element is 10% past the bottom of the viewport
        end: 'bottom top-=25%',           // End when the bottom of the element is 25% past the top of the viewport
        scrub: true,                      // Smooth scrub animation
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
      x: '150vw'                           // Start the marquee off-screen to the right
    }, {
      x: '-100%',                          // Move the marquee to the left (completely across the screen)
      ease: 'sine',
    });
};

// Function to animate text (split into characters) as it scrolls into view
const animateTextElement = () => {
  // gsap.timeline({
  //   scrollTrigger: {
  //     trigger: textElement,              // Trigger the animation when the text element enters the viewport
  //     start: 'top bottom',               // Start when the top of the text hits the bottom of the viewport
  //     end: 'center center-=25%',         // End when the center of the text is near the center of the viewport
  //     scrub: true,                       // Smooth scrub
  //   }
  // })
  // .from(splitTextEl.chars, {
  //   // Animate each character individually
  //   ease: 'sine',
  //   yPercent: 300,                       // Move characters from below the viewport
  //   autoAlpha: 0,                        // Start with opacity 0
  //   stagger: {                           // Stagger the animation for each character
  //     each: 0.04,                        // 0.04 seconds between each character's animation
  //     from: 'center'                     // Animate characters from the center outward
  //   }
  // });
};

// const animateCredits = () => {
//   creditsTexts.forEach(creditsText => {
//     const splitCredits = new SplitText(creditsText, { type: 'chars' }); // Split each credits text into characters

//     // GSAP timeline for the credits animation
//     gsap.timeline({
//       scrollTrigger: {
//         trigger: creditsText,              // Trigger the animation for each credits element
//         start: 'top bottom',               // Start when the top of the element hits the bottom of the viewport
//         end: 'clamp(bottom top)',          // End when the bottom of the element hits the top of the viewport
//         scrub: true,                       // Smooth scrub as you scroll
//       }
//     })
//     .fromTo(splitCredits.chars, {
//       x: (index) => index * 80 - ((splitCredits.chars.length * 80) / 2),  // Start with extra spacing between characters, centered
//     }, {
//       x: 0,                               // Animate the characters back to their original position
//       ease: 'sine'
//     });
//   });
// };

const localImages = {
  "project1": ["img/1.jpg", {
    type: 'text',
    text: "The design of the museum showcases Suzhou’s Garden tradition as part of the exhibitions, taking visitors on a journey and exploration of art, nature, and water. The museum is scheduled for completion in 2025.\n\nThe museum’s main design element is the ribbon of the roof, which extends into a pattern of eaves that double as sheltered walkways through the site.",
  }, "img/2.jpg", {
      type: 'quote',
      text: "The museum is a place where art and nature coexist harmoniously.",
    }, "img/8.jpg"],
  "project2": ["img/4.jpg", "img/5.jpg", "img/6.jpg"],
  // Add more projects as needed
}; const handleGridItemClick = async (imageWrapper) => {

  // lock scrolling
  document.body.style.overflow = 'hidden';

  const projectId = imageWrapper.dataset.projectId;
  const img = imageWrapper.querySelector('.grid__item-img');
  const initialImgSrc = img.style.backgroundImage.slice(5, -2);

  // zoom in image to size of project content imag
  // const zoomedImg = document.createElement('img');
  // zoomedImg.src = initialImgSrc;
  // zoomedImg.classList.add('zoomed-image');
  // document.body.appendChild(zoomedImg);

  // clone imageWrapper
  const zoomedImg = imageWrapper.cloneNode(true);
  zoomedImg.classList.add('zoomed-image');
  // remove any .zoomed-image elements from the DOM
  document.querySelectorAll('.zoomed-image').forEach(el => el.remove());
  document.body.appendChild(zoomedImg);

  // position the zoomed image to the same position as the clicked image
  const rect = imageWrapper.getBoundingClientRect();
  zoomedImg.style.position = 'fixed';
  zoomedImg.style.zIndex = '6000'; // Ensure it's on top
  zoomedImg.style.transition = 'none'; // Disable transition for immediate positioning
  zoomedImg.style.transform = 'scale(1) translate3d(0, 0, 0)'; // Reset transform
  zoomedImg.style.top = `${rect.top}px`;
  zoomedImg.style.left = `${rect.left}px`;
  zoomedImg.style.width = `${rect.width}px`;
  zoomedImg.style.height = `${rect.height}px`;
  zoomedImg.style.objectFit = 'cover'; // Ensure the image covers the area
  zoomedImg.style.borderRadius = 'var(--grid-item-radius)';
  zoomedImg.style.filter = imageWrapper.style.filter; // Apply the same filter as the original image

  zoomedImg.style.transition = 'transform 1s ease, opacity 0.5s ease, object-fit 0.5s ease';

  // append a spinner to the image while loading
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  zoomedImg.appendChild(spinner);

  // Load additional project images after zoom
  const images = localImages[projectId] || [];
  images[0] = initialImgSrc; // Ensure the initial image is included
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
  // debugger;
  // remove spinner
  spinner.remove();

  projectContent.innerHTML = ''; // Clear existing content
  images.forEach(imgSrc => {
    if (imgSrc !== null && typeof imgSrc === 'object' && imgSrc.type === 'text') {
      // Handle text or quote objects
      const contentElement = document.createElement('div');
      contentElement.classList.add('project-text');
      contentElement.innerText = imgSrc.text;
      projectContent.appendChild(contentElement);
    } else if (imgSrc !== null && typeof imgSrc === 'object' && imgSrc.type === 'quote') {
      // Handle quote objects
      const quoteElement = document.createElement('blockquote');
      quoteElement.classList.add('project-quote');
      quoteElement.innerText = imgSrc.text;
      projectContent.appendChild(quoteElement);
    } else {
      // Handle image sources
      const imgElement = document.createElement('img');
      imgElement.src = imgSrc;
      imgElement.classList.add('project-image');
      const alt = imgSrc.split('/').pop().split('.')[0]; // Extract alt text from image filename
      imgElement.alt = `${alt}`;
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

      initLenisHorizontalScroll();
    });
};

// Initialize Lenis for horizontal scrolling
const initLenisHorizontalScroll = () => {
  if (lenis) lenis.destroy(); // Reset if already initialized

  lenis = new Lenis({
    orientation: 'horizontal', // Set to horizontal scrolling
    smoothWheel: true,
    gestureOrientation: 'vertical', // Interpret vertical gestures as horizontal scroll
    wrapper: overlay,
    content: projectContent,
  });

  // Listen for Lenis scroll event
  lenis.on('scroll', (e) => {
    const currentScroll = lenis.animatedScroll;  // Current scroll value
    const maxScrollValue = lenis.limit;          // Maximum scroll value (end of scroll)
    // Check if we've reached the end of scroll
    // make sure currentScroll might be half a pixel away from maxScrollValue
    if (currentScroll >= maxScrollValue || (currentScroll >= maxScrollValue - 0.5)) {
      // Perform any action you want when the scroll reaches the end
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

  setTimeout(() => {
    overlay.classList.remove('show');
    document.getElementById('main').classList.add('shadow');
    projectContent.innerHTML = ''; // Clear content
    isOverlayOpen = false; // Reset overlay status
    overlay.classList.remove('fade-out'); // Remove fade-out class
  }, 600); // Match duration with CSS transition
};

// Event listeners for grid items, close button, and scroll
document.querySelectorAll('.grid__item-imgwrap').forEach(imageWrap => {
  imageWrap.addEventListener('click', () => handleGridItemClick(imageWrap));
});

closeOverlayBtn.addEventListener('click', closeOverlay);

function animateGridOnLoad() {
  window.scrollTo(0, 0);

  gsap.timeline()
    .delay(1)
    .to(entry, {
      left: '-100vw',
      duration: 1.5,
      opacity: 0,
      ease: 'sine.out',
    })
    .from(nav, {
      translateY: '-100%',
    }, '=-1')
    .to(nav, {
      translateY: '0',
      ease: 'sine.out',
    })
    .to(grid, {
      opacity: 1,
      duration: .5,
      ease: 'sine.out',
    }, '=-.5')
    .to(window, {
      scrollTo: {
        y: document.body.clientHeight / 5,
      },
      duration: 2,
      ease: 'power2.out' 
    }, '-=.5');
}

// Main initialization function
const init = () => {
   
  animateScrollGrid();    // Animate the grid items on scroll
  animateMarquee();       // Animate the marquee on scroll
  animateTextElement();   // Animate the split text on scroll
  // animateCredits();       // Call the credits animation

  grid.style.opacity = 0;
  nav.style.translateY = '-100%';
  setTimeout(() => {
    animateGridOnLoad();
  }, 100)
};

// Preload images and initialize animations after the images have loaded
preloadImages('.grid__item-img').then(() => {
  document.body.classList.remove('loading'); // Remove the 'loading' class from the body

  setTimeout(() => {
    init(); // Initialize the animations
  }, 0);
});