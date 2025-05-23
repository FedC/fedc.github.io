import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import AboutIcon from "./AboutIcon";
import ServicesIcon from "./ServicesIcon";
import ContactIcon from "./ContactIcon";
// import HomeIcon from './HomeIcon';
import CloseIcon from './CloseIcon';
import HalfCircle from './HalfCircle';

import * as styles from "./MobileMenu.module.scss";

const MobileMenu = ({ onMenuItemClick, mobileMenuState, onMobileMenuStateChange }) => {
  const menuRef = useRef(null);
  const buttonsRef = useRef([]);
  const orange = 'rgb(246, 171, 11)';

  const menuItems = [
    { id: "all", label: "All" },
    { id: "commercial", label: "Commercial" },
    { id: "residential", label: "Residential" },
    { id: "about", icon: <AboutIcon fill="white" stroke={orange} />, label: "About" },
    { id: "services", icon: <ServicesIcon stroke={orange} fill="white" />, label: "Services" },
    { id: "contact", icon: <ContactIcon fill={orange} />, label: "Contact" },
  ];

  const toggleMenu = () => {
    onMobileMenuStateChange({
      ...mobileMenuState,
      isOpen: !mobileMenuState.isOpen
    });
  };

  const handleItemClick = (e, id) => {
    e.stopPropagation();
    if (onMenuItemClick) onMenuItemClick(e, id);
    onMobileMenuStateChange({
      ...mobileMenuState,
      activeId: id,
      isOpen: false
    });
  };

  return (
    <div className={styles.menuWrapper}>
      <button onClick={toggleMenu} className={styles.toggleButton}>
        {mobileMenuState.isOpen ? <CloseIcon size={32} /> : <Menu size={32} />}
      </button>

      <AnimatePresence>
        {mobileMenuState.isOpen && (
          <>
          <div className={styles.underlay} onClick={toggleMenu} ></div>
          <motion.div
            className={styles.menuPanel}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <nav className={styles.menuItems}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.menuTextItem} ${mobileMenuState.activeId === item.id ? styles.active : ""}`}
                  onClick={(e) => handleItemClick(e, item.id)}
                >
                  {mobileMenuState.activeId === item.id && (
                    <span
                      className={styles.activeIndicator}
                    >
                      <HalfCircle
                        fill="white"
                        stroke={orange}
                        width={20}
                        height={20}
                      />
                    </span>
                  )}
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;