
import React from 'react';
import * as styles from "./ProcessFlow.module.scss";

const steps = [
  { id: 1, text: "pre-design" },
  { id: 2, text: "schematic design" },
  { id: 3, text: "design development", approval: "approvals" },
  { id: 4, text: "construction documents", approval: "approvals" },
  { id: 5, text: "bidding + negotiation", approval: "permit" },
  { id: 6, text: "construction administration" },
];

const ProcessFlow = () => {
  return (
    <div className={styles.processFlow}>
      {steps.map((step, index) => (
        <div key={step.id} className={styles.stepContainer}>
          <div className={styles.circle}>
            <span className={styles.stepText}>{step.text}</span>
            <span className={styles.stepNumber}>{step.id}</span>
          </div>
          {step.approval && (
            <>
              <svg className={styles.arrow} viewBox="0 0 50 10">
                <line x1="0" y1="5" x2="40" y2="5" stroke="rgb(246, 171, 11)" strokeWidth="2" />
                <polygon points="40,5 30,10 30,0" fill="rgb(246, 171, 11)" />
              </svg>
              <div className={styles.approvalCircle}>{step.approval}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProcessFlow;