import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import * as styles from './Services.module.scss';
import ChevronIcon from './ChevronIcon';
import ProcessFlow from './ProcessFlow';
import Footer from './Footer';
import * as footerStyles from './Footer.module.scss';

const accordionData = [
  {
    id: 1,
    title: "Pre-Design",
    content: "Code research, site analysis, and programming (the identification of the owner's needs, wants, and desires) are the essential tasks that inform the requirements and concept for the project."
  },
  {
    id: 2,
    title: "Schematic Design",
    content: "The concept for a project is conceived and communicated via sketches and 3D renderings.  A project may warrant a physical model for exploration and/or presentation.  Deliverables consist of drawings that map out the exterior, interior, and systems of the building. Typically the drawings consist of a site plan, floor plan/s, and building elevations; including the location of plumbing fixtures, electrical panel, and mechanical units.  The drawing set may be submitted for preliminary cost estimate to confirm budget and need for any value engineering."
  },
  {
    id: 2.5,
    title: "Owner/Stakeholder Approval",
    content: "If required, drawings are ready for initial submittals and presentations to: HOAs, community appearance boards, city’s design review committee (DRC) for site plan review and/or rezoning, and/or other entities having jurisdiction.  Drawings may be submitted for preliminary cost estimate to confirm budget and need for any value engineering.  With owner and stakeholder approvals, Schematic Design may begin.",
    approval: true,
  },
  {
    id: 3,
    title: "Design Development",
    content: "Engineers and specialty consultants are incorporated into the process. It is time to select and specify:  materials, finishes, equipment, appliances, fixtures, cabinetry/millwork.  Deliverables consist of further development of drawings across all disciplines involved, with an initial dive into architectural details."
  },
  {
    id: 3.5,
    title: "Owner/Stakeholder Approval",
    content: "Drawings are ready for initial or subsequent submittals and presentations to: HOAs, community appearance boards, city’s design review committee (DRC) for site plan review and/or rezoning, and/or other entities having jurisdiction. Drawings may be submitted for preliminary cost estimate to confirm budget and need for any value engineering.  With owner and stakeholder approvals, Construction Documents may begin.",
    approval: true,
  },
  {
    id: 4,
    title: "Construction Documents",
    content: "The focus is the production of drawings required for permitting.  Deliverables consist of a set of drawings and supporting documents in compliance with applicable codes, for submittal to agencies having jurisdiction over the project.  At the end of this phase, the project is ready for permitting."
  },
  {
    id: 4.5,
    title: "Permit",
    content: "The builder or owner's representative submits the construction documents for permitting.  Plans Reviewers from agencies having jurisdiction over the project review the submittal and issue review comments.  The architect oversees the coordination of responses to review comments, and any required revisions to the construction documents are submitted for further review.  Once all issues are approved, the permit is issued and construction may proceed without exceptions.",
    permit: true,
  },
  {
    id: 5,
    title: "Bidding + Negotiation",
    content: "This phase may run parallel with the permit process.  The architect provides the owner with assistance in the selection of the construction delivery method, general contractor/construction manager, and the review of construction bids."
  },
  {
    id: 6,
    title: "Construction Administration",
    content: "The architect assumes the role of owner's representative to ensure the project is built according to the drawings.  Responsibilities include the administration and management of records related to job site visits and communications with the builder: field reports, requests for information, field orders, change orders, and submittal reviews.  The final step in this phase is the Close-Out process with the delivery of final project documents, project manual of specifications & warranties, and a final walk-through of the project."
  },
];

const Services = () => {
  const [openedId, setOpenedId] = useState(null);
  const footerRef = useRef(null);

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    gsap.set(footerRef.current.querySelector(`.${footerStyles.footer}`), { marginTop: '40px'})
    gsap.to(footerRef.current.querySelector(`.${footerStyles.footer}`), { opacity: 1, duration: 0.5, delay: 0.5 });
  };

  const toggleAccordion = (id) => {
    setOpenedId(openedId === id ? null : id);
  };

  const circleClick = (e, step) => {
    const data = accordionData.find(item => item.id === step.id);
    setOpenedId(data?.id);
  }

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

          {accordionData.map((item) => (
            <div key={'acc_' + item.id} className={styles.accordionItem}>
              <button
                className={`${styles.accordion} ${openedId === item.id ? styles.active : ""}`}
                onClick={() => toggleAccordion(item.id)}
              >
                {!(item.approval || item.permit) && (<span>{item.id}.&nbsp;{item.title}</span>)}
                {(item.approval || item.permit) && (<span className={styles.approvalTitle}>{item.title}</span>)}
                <ChevronIcon open={openedId === item.id} className={styles.icon} />
              </button>
              <div
                className={styles.panel}
                style={{ maxHeight: openedId === item.id ? "780px" : "0px" }}
              >
                <p>{item.content}</p>
              </div>
            </div>
          ))}

        </div>

        <div className={styles.servicesImage}>
          <ProcessFlow circleClick={circleClick} openedId={openedId} steps={accordionData} />
        </div>

      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default Services;