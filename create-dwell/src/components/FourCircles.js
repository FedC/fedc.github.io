import React from "react";
import PropTypes from "prop-types";
import * as styles from "./FourCircles.module.scss";

const FourCircles = ({ circles }) => {
  return (
    <div className={styles.circleContainer}>
      {circles.map((circle, index) => (
        <div
          key={index}
          className={`${styles.circle} ${styles[`circle${index + 1}`]}`}
        >
          <div className={styles.textWrapper}>
            {circle.text.map((word, i) => (
              <p key={i} className={styles.circleText}>{word}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

FourCircles.propTypes = {
  circles: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.arrayOf(PropTypes.string).isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FourCircles;