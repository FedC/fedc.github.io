import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import * as styles from './Services.module.scss';
import ChevronIcon from './ChevronIcon';
import ProcessFlow from './ProcessFlow';
import Footer from './Footer';
import * as footerStyles from './Footer.module.scss';

const accordionData = [
  {
    title: "Pre-Design",
    content: "Code research, site analysis, and programming (the identification of the owner's needs, wants, and desires) are the essential tasks that inform the requirements and concept for the project."
  },
  {
    title: "Schematic Design",
    content: "The concept for a project is conceived and communicated via sketches and 3D renderings. A project may warrant a physical model for exploration and/or presentation. Deliverables consist of drawings that map out the exterior, interior, and systems of the building."
  },
  {
    title: "Owner/Stakeholder Approval",
    content: "If required, drawings are ready for initial submittals and presentations to HOAs, community appearance boards, city’s design review committee (DRC), and other entities having jurisdiction."
  },
  {
    title: "Design Development",
    content: "Engineers and specialty consultants are incorporated into the process. It is time to select and specify materials, finishes, equipment, appliances, fixtures, cabinetry/millwork."
  },
  {
    title: "Construction Documents",
    content: "The focus is the production of drawings required for permitting. Deliverables consist of a set of drawings and supporting documents in compliance with applicable codes."
  },
  {
    title: "Permit",
    content: "The builder or owner's representative submits the construction documents for permitting. Plans Reviewers review the submittal and issue comments, which the architect coordinates."
  },
  {
    title: "Bidding + Negotiation",
    content: "This phase may run parallel with the permit process. The architect provides the owner with assistance in the selection of the construction delivery method."
  },
  {
    title: "Construction Administration",
    content: "The architect assumes the role of owner's representative to ensure the project is built according to the drawings. Responsibilities include field reports, RFIs, change orders, and submittal reviews."
  },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const footerRef = useRef(null);

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    gsap.set(footerRef.current.querySelector(`.${footerStyles.footer}`), { marginTop: '40px'})
    gsap.to(footerRef.current.querySelector(`.${footerStyles.footer}`), { opacity: 1, duration: 0.5, delay: 0.5 });
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className={styles.servicesContainer}>

        <div className={styles.servicesContent}>
          <h1 className={styles.servicesTitle}>How</h1>
          <h2 className={styles.servicesSubTitle}>Our Services</h2>
          <p className={styles.servicesDescription}>
            Experienced in new construction and renovations, our various services are organized into six design phases.
            The scope of each project informs the phases required, as well as the services included within each phase.
            Approvals may be required to proceed to a subsequent phase.
          </p>

          {accordionData.map((item, index) => (
            <div key={'acc_' + index} className={styles.accordionItem}>
              <button
                className={`${styles.accordion} ${openIndex === index ? styles.active : ""}`}
                onClick={() => toggleAccordion(index)}
              >
                <span>{index + 1}.&nbsp;{item.title}</span>
                <ChevronIcon open={openIndex === index} className={styles.icon} />
              </button>
              <div
                className={styles.panel}
                style={{ maxHeight: openIndex === index ? "500px" : "0px" }}
              >
                <p>{item.content}</p>
              </div>
            </div>
          ))}

        </div>

        <div className={styles.servicesImage}>
          <ProcessFlow />
        </div>

      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default Services;