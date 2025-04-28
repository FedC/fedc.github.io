import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

import * as styles from './SwiperSection.module.scss';
import './swiper.scss';

const SwiperSection = ({ children, onSwipe }) => {
  return (
    <div className={styles.sectionsContainer}>
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
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-next-top, .swiper-next-bottom',
          prevEl: '.swiper-prev-top, .swiper-prev-bottom',
        }}
        modules={[Navigation]}
        grabCursor={true}
        centeredSlides={true}
        speed={700}
        onSlideChange={(swiper) => onSwipe?.(swiper.realIndex)}
        breakpoints={{
          620: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 1, spaceBetween: 50 },
          1024: { slidesPerView: 1, spaceBetween: 100 },
        }}
        autoHeight={true}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navigationContainerBottom}>
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
      </div>
    </div>
  );
};

export default SwiperSection;