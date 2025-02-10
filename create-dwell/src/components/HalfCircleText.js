import React from "react";
import * as styles from "./HalfCircleText.module.scss";

const HalfCircleText = ({ text, position = "left", bgColor = "#f5AA0D" }) => {
  return (
    <div
      className={`${styles.halfCircle} ${position === "right" ? styles.right : styles.left}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className={styles.textContainer}>
        {text.map((line, index) => (
          <p key={index} className={styles.text}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default HalfCircleText;