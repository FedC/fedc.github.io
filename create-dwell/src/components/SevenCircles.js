import React from "react";
import PropTypes from "prop-types";
import * as styles from "./SevenCircles.module.scss";

const SevenCircles = () => {
  const centerCircle = {
    text: "Architect",
    bgColor: "rgb(243, 233, 212)", // Light beige
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
      <div className={styles.centerCircle} style={{ backgroundColor: centerCircle.bgColor, borderColor: centerCircle.borderColor }}>
        <span className={styles.circleText}>{centerCircle.text}</span>
      </div>

      {/* Surrounding Circles */}
      {surroundingCircles.map((circle, index) => (
        <div
          key={index}
          className={`${styles.circle} ${styles[circle.position]}`}
          style={{
            backgroundColor: "rgba(229, 183, 97, 0.5)", // Transparent Gold
            borderColor: "rgb(246, 171, 11)", // Solid Border Gold
          }}
        >
          <span className={styles.circleText}>{circle.text}</span>
        </div>
      ))}
    </div>
  );
};

export default SevenCircles;