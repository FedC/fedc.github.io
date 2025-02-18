import React from "react";
import * as styles from "./SevenCircles.module.scss";

const SevenCircles = () => {
  const centerCircle = {
    text: "Architect",
    borderColor: "white",
  };

  const surroundingCircles = [
    { text: "Structural Engineer", position: "top" },
    { text: "Civil Engineer", position: "top-right" },
    { text: "Landscape Architect", position: "right" },
    { text: "Specialty Consultants", position: "bottom-right" },
    { text: "Plumbing Engineer", position: "bottom-left" },
    { text: "Electrical Engineer", position: "left" },
    { text: "Mechanical Engineer", position: "top-left" },
  ];

  return (
    <div className={styles.circleContainer}>
      {/* Center Circle */}
      <div className={styles.centerCircle}>
        <span className={styles.circleText}>{centerCircle.text}</span>
      </div>

      {/* Surrounding Circles */}
      {surroundingCircles.map((circle, index) => (
        <div key={'circle' + index} className={styles.circle}>
          <span className={styles.circleText}>{circle.text}</span>
        </div>
      ))}
    </div>
  );
};

export default SevenCircles;