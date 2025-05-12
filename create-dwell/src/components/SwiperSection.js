import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import * as styles from './SwiperSection.module.scss';
import './swiper.scss';

const SwiperSection = ({ children, onSwipe }) => {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let lastSwipeTime = 0;
    const cooldown = 500; // ms between swipes
  
    const handleWheel = (e) => {
      if (!swiperRef.current || !container) return;
      const now = Date.now();
      if (now - lastSwipeTime < cooldown) return;
  
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 0) swiperRef.current.slideNext();
        else swiperRef.current.slidePrev();
        lastSwipeTime = now;
      }
    };
  
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div ref={containerRef} className={styles.sectionsContainer}>
      <div className={styles.navigationContainer}>
        <div className="swiper-prev-top">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </div>
        <div className="swiper-next-top">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          // nextEl: '.swiper-next-top, .swiper-next-bottom',
          // prevEl: '.swiper-prev-top, .swiper-prev-bottom',
          nextEl: '.swiper-next-top',
          prevEl: '.swiper-prev-top',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          bottom: 0,
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        modules={[Navigation, Pagination]}
        grabCursor={true}
        centeredSlides={false}
        speed={700}
        onSlideChange={(swiper) => onSwipe?.(swiper.realIndex)}
        breakpoints={{
          620: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 1, spaceBetween: 50 },
          1360: { slidesPerView: 2, spaceBetween: 100 },
        }}
        autoHeight={window.innerWidth <= 768}
        updateOnWindowResize={true}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {/* <div className={styles.navigationContainerBottom}>
        <div className="swiper-prev-bottom">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </div>
        <div className="swiper-next-bottom">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </div>
      </div> */}
    </div>
  );
};

export default SwiperSection;