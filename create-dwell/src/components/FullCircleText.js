import React from "react";
import PropTypes from "prop-types";
import * as styles from "./FullCircleText.module.scss";

const FullCircleText = ({ text, bgColor = "#f0f0f0", position = "left", borderColor = "white" }) => {
  return (
    <div
      className={`${styles.fullCircle} ${position === "right" ? styles.rightAligned : styles.leftAligned}`}
      style={{ backgroundColor: bgColor, borderColor }}
    >
      <div className={styles.circle}></div>
      <div className={styles.textWrapper}>
        {text.map((word, i) => (
          <p key={i} className={styles.arcText}>{word}</p>
        ))}
      </div>
    </div>
  );
};

FullCircleText.propTypes = {
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  position: PropTypes.oneOf(["left", "right"]),
};

export default FullCircleText;