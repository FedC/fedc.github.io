import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

import * as styles from './SwiperSection.module.scss';
import './swiper.scss';

const SwiperSection = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.sectionsContainer}>
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
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          620: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 1, spaceBetween: 50 },
          1024: { slidesPerView: 2, spaceBetween: 100 },
        }}
      >
        {sections.map((section, index) => (
          <SwiperSlide key={index}>
            <div className={`${styles.contentSection} ${index === activeIndex ? styles.active : ''}`}>
              <div>
                <h2>{section.title}</h2>
                <div className={styles.contentSectionImageContainer}>
                  <img src={section.imageUrl} alt={section.title} className={styles.sectionImage} />
                  {(section.title === 'Service' || section.title === 'Process') && (
                    <button className={styles.imageInfoIcon}>
                      <span>i</span>
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.contentSectionText}>
                <div className={styles.content}>
                  {section.content.map((content, i) => {
                    if (content.type === 'paragraph') return <p className={styles.paragraph} key={'p_' + index + '_' + i}>{content.text}</p>;
                    if (content.type === 'bullets') return <ul className={styles.list} key={'ul_' + index + '_' + i}>{content.bullets.map((b, j) => <li key={'bullet_' + index + '_' + j}>{b}</li>)}</ul>;
                    return null;
                  })}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
    </div>
  );
};

export default SwiperSection;