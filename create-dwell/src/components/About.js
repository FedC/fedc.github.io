import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import { db } from '../js/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { gsap } from 'gsap';

import * as styles from './About.module.scss';
import './swiper.scss';

const About = ({ parentScroller }) => {
  const aboutRef = useRef(null);
  const sectionsRef = useRef(null);
  const animatedContentRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [aboutText, setAboutText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      const aboutDoc = await getDoc(doc(db, 'about', 'main'));
      if (aboutDoc.exists()) {
        const data = aboutDoc.data();
        setTitle(data.title || '');
        setDescription(data.description || '');
        setSections(data.sections || []);
        setAboutText(data.aboutText || '');
        setImageUrl(data.imageUrl || '');
      }

      setTimeout(() => {
        animateSections();
      }, 1000);
    };

    fetchAbout();
  }, [parentScroller]);


  const animateSections = () => {

  };


  const renderHighlightText = (text) => {
    return text.split(' ').map((word, index) => {
      if (word.toLowerCase() === 'create' || word.toLowerCase().includes('dwell')) {
        return (
          <span key={index} className={styles.highlight}>
            {word}&nbsp;
          </span>
        );
      }
      return word + ' ';
    });
  };

  const renderHighlightPrepositions = (text) => {
    const prepositions = [
      // 'yet', 'between', 'of', 'the', '+', 'are', 'is',
    ];

    return text.split(' ').map((word, index) => {
      if (prepositions.includes(word.trim().toLowerCase())) {
        return (
          <span key={'word_' + index} className={styles.highlight}>
            {word}&nbsp;
          </span>
        );
      }
      return word + ' ';
    });
  };

  const closeSectionInfo = (e) => {
    e.stopPropagation();
    setActiveSection(null);
    clearActiveCircle(e);
    clearServiceTooltip(e);
  };

  const handleSlideClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const renderHighlightAbout = (text) => {
    const prepositions = [
      // 'architect', 'carolina', 'wiebe', "carolina's",
    ];

    return text.split(' ').map((word, index) => {
      if (prepositions.includes(word.trim().replace('.', '').replace(',', '').replace('(', '').replace(')', '').toLowerCase())) {
        return (
          <span key={'word_' + index} className={styles.highlight}>
            {word}&nbsp;
          </span>
        );
      }
      return word + ' ';
    });
  };

  const setActiveCircleAnimate = (circle) => {
    setActiveCircle(circle);
    setTimeout(() => {
      gsap.fromTo(animatedContentRef.current, {
        opacity: 0, x: 0
      },
        { opacity: 1, x: 100, duration: 0.3 });
    }, 100);
  }

  const [activeCircle, setActiveCircle] = useState(null);

  const circleLabels = [
    { id: 1, label: 'Structural Engineer', description: 'Engineers site, civil, and landscape structures.  May be assigned role of special inspector. (privacy walls, retaining walls, generator supports and dumpster enclosures.)' },
    { id: 2, label: 'Mechanical Engineer', description: 'Engneers & specifies the mechanical systems & equipment for heating, ventilating, and air conditioning (HVAC.)' },
    { id: 3, label: 'Electrical Engineer', description: 'Engineers & specifies the electrical systems & equipment for power, lighting, and communications.' },
    { id: 4, label: 'Plumbing Engineer', description: 'Engineers & specifies plumbing systems & equipment for potable water, sewer waste, storm drainage, and fire supression.' },
    { id: 5, label: 'Civil Engineer', description: 'Engineers & specifies the infrastructure systems & equipment related to paving, grading, utilties (water & sewer), drainage & stormater management, and environmental control (e.g. erosion.)' },
    { id: 6, label: 'Landscape Architect', description: 'Designs & specifies systems and materials for planting, hardscape, and irrigation systems' },
    { id: 7, label: 'Specialty Consultants', description: 'Provides niche expertise for projects. (Cost Estimating.)' },
  ];

  const clearActiveCircle = (e) => {
    e.stopPropagation();
    setActiveCircle(null);
    gsap.fromTo(animatedContentRef.current, {
      opacity: 1, x: 100
    },
      { opacity: 0, x: 0, duration: 0.3 });
  }


  const [activeService, setActiveService] = useState(null);
  const serviceContentRef = useRef(null);
  const serviceLabels = [
    { id: 1, label: 'Pre-Design', description: 'Research & strategic planning for projects with timelines and goals.' },
    { id: 2, label: 'Schematic Design', description: 'Architectural and interior design solutions. 2D and 3D Concept.' },
    { id: 3, label: 'Design Development', description: 'Specifications of equipment, appliances, fixtures, cabinetry/millwork, materials, and finishes' },
    { id: 4, label: 'Construction Documents', description: 'Permit Set.' },
    { id: 5, label: 'Bidding & Negotiation', description: 'Delivering the final product to the client.' },
    { id: 6, label: 'Construction Administration', description: 'Providing support and upkeep post-project completion.' }
  ];
  const handleServiceClick = (service) => {
    setActiveService(service);
    setTimeout(() => {
      gsap.fromTo(serviceContentRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.2 });
    }, 100);
  };

  const clearServiceTooltip = (e) => {
    e.stopPropagation();
    setActiveService(null);
    gsap.to(serviceContentRef.current, { opacity: 0, y: -20, duration: 0.3 });
  };

  return (
    <section className={styles.about} ref={aboutRef}>
      <div className={styles.container}>
        <h1 className={styles.heading}>{renderHighlightText(title)}</h1>
        <p className={styles.aboutParagraph}>{renderHighlightAbout(description)}</p>
      </div>

      <div className={styles.sectionsContainer} ref={sectionsRef}>
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
          onSwiper={(swiper) => setSwiperInstance(swiper)}  // Get the swiper instance
          breakpoints={{
            // Small screens (up to 620px)
            620: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            // Medium screens (up to 1024px)
            768: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
            // Large screens (1025px and above)
            1024: {
              slidesPerView: 2,
              spaceBetween: 100,
            }
          }}
        >
          {sections.map((section, index) => (
            <SwiperSlide key={index} onClick={() => handleSlideClick(index)}>

              <div className={`${styles.contentSection} ${index === activeIndex ? styles.active : ''}`} >
                <div>
                  <h2>{section.title}</h2>
                  <div className={styles.contentSectionImageContainer}>
                    <img src={section.imageUrl} alt={section.title} className={styles.sectionImage} />

                    {(section.title === 'Service' || section.title === 'Process') && (
                      <button className={styles.imageInfoIcon} onClick={() => setActiveSection(section)}>
                        <span>i</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className={styles.contentSectionText}>
                  <div className={styles.content}>
                    {section.content.map((content, i) => {
                      if (content.type === 'paragraph') return <p className={styles.paragraph} key={'p_' + index + '_' + i}>{content.text}</p>;
                      if (content.type === 'bullets') return <ul className={styles.list} key={'ul_' + index + '_' + i}>{content.bullets.map((b, j) => <li key={'bullet_' + index + '_' + j}>{renderHighlightPrepositions(b)}</li>)}</ul>;
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
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
          </div>
          <div className="swiper-next-top">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
          </div>
        </div>
        <div className={styles.navigationContainerBottom}>
          <div className="swiper-prev-bottom">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
          </div>
          <div className="swiper-next-bottom">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
          </div>
        </div>
      </div>

      {activeSection && (
        <div className={styles.activeSection}>
          <div className={styles.activeSectionContent}>
            <h2>{activeSection.title}</h2>

            {activeSection.title === 'Service' && (
              <div className={styles.servicesContainer}>
                <div className={styles.servicesWrapper}>
                  {serviceLabels.map((service, index) => (
                    <>
                      <div key={service.id} className={styles.serviceCircle} onClick={() => handleServiceClick(service)}>
                        {service.label}
                        {index < serviceLabels.length - 1 && (
                          <div className={styles.arrow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#473d27" viewBox="0 0 24 24">
                              <path d="M4 12l1.41-1.41L11 16.17V3h2v13.17l5.59-5.58L20 12l-8 8-8-8z"/>
                            </svg>
                          </div>
                        )}
                      </div>

                      {(activeService && activeService.label && activeService.label === service.label) && (
                        <div className={styles.serviceInfo} ref={serviceContentRef} onClick={(e) => clearServiceTooltip(e)}>
                          <h2>{activeService.label}</h2>
                          <p>{activeService.description}</p>
                        </div>
                      )}
                    </>
                  ))}
                </div>

              </div>
            )}

            {activeSection.title === 'Process' && (
              <div>
                <div className={styles.vennDiagram}>
                  <div className={`${styles.circle} ${styles.centerCircle}`} onClick={(e) => clearActiveCircle(e)}>Architect</div>
                  {circleLabels.map((circle, index) => (
                    <div
                      key={circle.id}
                      className={`${styles.circle} ${styles[`circle${index + 1}`]}`}
                      onClick={() => setActiveCircleAnimate(circle)}
                    >
                      {circle.label}
                    </div>
                  ))}
                  {circleLabels.map((circle, index) => (
                    <>
                      {(activeCircle && activeCircle.id === circle.id) && (
                        <div className={`${styles.tooltip} ${styles[`circle${index + 1}`]}`} ref={animatedContentRef} onClick={(e) => clearActiveCircle(e)}>
                          <h2>{activeCircle.label}</h2>

                          <div className={styles.contentSectionText}>
                            <div className={styles.content}>
                              <p className={styles.paragraph}>{activeCircle.description}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            )}

            <button className={styles.closeButton} onClick={(e) => closeSectionInfo(e)} type='button'>Close</button>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.aboutImageContainer}>
          <p className={styles.aboutParagraph}>{renderHighlightAbout(aboutText)}</p>
          {imageUrl && <img className={styles.aboutImage} src={imageUrl} alt="About" />}
        </div>
      </div>
    </section>
  );
};

export default About;