import { useState, useEffect } from "react";
import * as styles from "./Checkbox.module.scss";

const Checkbox = ({ label, checked, ...props }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  // Sync internal state with `checked` prop
  useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
          {...props}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;