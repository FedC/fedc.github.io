import { useState, useEffect, useRef } from "react";

import * as styles from "./MobileBottomMenu.module.scss";

const MobileBottomMenu = ({ selectedFilter, onFilter }) => {
  const menuRef = useRef(null);
  const borderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filters = ["all", "residential", "commercial"];
  const colors = ["#ffb457", "#9999fb", "#ffe797"];
  const icons = [
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d="M3.8,6.6h16.4"/>
      <path d="M20.2,12.1H3.8"/>
      <path d="M3.8,17.5h16.4"/>
    </svg>,
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d="M6.7,4.8h10.7c0.3,0,0.6,0.2,0.7,0.5l2.8,7.3c0,0.1,0,0.2,0,0.3v5.6c0,0.4-0.4,0.8-0.8,0.8H3.8C3.4,19.3,3,19,3,18.5v-5.6c0-0.1,0-0.2,0.1-0.3L6,5.3C6.1,5,6.4,4.8,6.7,4.8z"/>
      <path d="M3.4,12.9H8l1.6,2.8h4.9l1.5-2.8h4.6"/>
    </svg>,
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d="M3.4,11.9l8.8,4.4l8.4-4.4"/>
      <path d="M3.4,16.2l8.8,4.5l8.4-4.5"/>
      <path d="M3.7,7.8l8.6-4.5l8,4.5l-8,4.3L3.7,7.8z"/>
    </svg>,
  ];
  const tabs = [
    <div className={styles.tab}>All</div>,
    <div className={styles.tab}>Residential</div>,
    <div className={styles.tab}>Commercial</div>,
  ];

  const handleMenuClick = (index, filter) => {
    setActiveIndex(index);
    onFilter(filter);
  };

  useEffect(() => {
    document.body.style.backgroundColor = colors[activeIndex];

    // Smoothly move the border
    const activeItem = menuRef.current.children[activeIndex];
    if (activeItem) {
      const offsetActiveItem = activeItem.getBoundingClientRect();
      const left = `${Math.floor(
        offsetActiveItem.left - menuRef.current.offsetLeft - (borderRef.current.offsetWidth - offsetActiveItem.width) / 2
      )}px`;
      borderRef.current.style.transform = `translate3d(${left}, 0 , 0)`;
    }
  }, [activeIndex]);

  return (
    <>
      <menu className={styles.mobileMenu} ref={menuRef}>
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`${styles.menuItem} ${activeIndex === index ? styles.active : ""}`}
            style={{ "--bgColorItem": colors[index] }}
            onClick={() => handleMenuClick(index, filter)}
          >
            {/* <span className={styles.circle}></span> */}
            <div>{icons[index]}</div>
            <div>{tabs[index]}</div>
          </button>
        ))}
        <div className={styles.menuBorder} ref={borderRef}></div>
      </menu>

      <div className={styles.svgContainer}>
        <svg viewBox="0 0 202.9 45.5">
          <clipPath
            id="menu"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.0049285362247413 0.021978021978022)"
          >
            <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
              c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
              c9.2,3.6,17.6,4.2,23.3,4H6.7z"/>
          </clipPath>
        </svg>
      </div>
    </>
  );
};

export default MobileBottomMenu;