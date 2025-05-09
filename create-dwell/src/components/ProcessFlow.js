import React, { useState, useEffect } from 'react';
import * as styles from "./ProcessFlow.module.scss";

const ProcessFlow = ({ circleClick, openedId, steps }) => {
  const [openedCircleId, setOpenedCircleId] = useState(null);

  useEffect(() => {
    if (!openedId) {
      setOpenedCircleId(null);
    } else {
      setOpenedCircleId(openedId);
    }
  }, [openedId]);

  const handleClick = (e, step) => {
    circleClick(e, step);
    setOpenedCircleId(step.id);
  }

  return (
    <div className={styles.processFlow}>
      {steps.map((step, index) => (
        <div key={step.id} className={`${styles.stepContainer}`}>
          {!(step.approval || step.permit) && (
            <div className={`${styles.circle} ${openedCircleId === step.id ? styles.selected : ""}`} onClick={(e) => handleClick(e, step)}>
              <span className={styles.stepText}>{step.title}</span>
              <span className={styles.stepNumber}>{step.id}</span>
            </div>
          )}
          {(step.approval || step.permit) && (
            <div className={styles.approvalContainer}>
              {/* <svg className={styles.arrow} viewBox="0 0 50 10">
                <line x1="0" y1="5" x2="40" y2="5" stroke="rgb(246, 171, 11)" strokeWidth="2" />
                <polygon points="40,5 30,10 30,0" fill="rgb(246, 171, 11)" />
              </svg> */}
              <div className={`${styles.approvalCircle} ${openedCircleId === step.id ? styles.selected : ""}`}
                onClick={(e) => handleClick(e, step)}>{step.approval ? 'Approval' : 'Permit'}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProcessFlow;