import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import AboutIcon from "./AboutIcon";
import ServicesIcon from "./ServicesIcon";
import ContactIcon from "./ContactIcon";
// import HomeIcon from './HomeIcon';
import CloseIcon from './CloseIcon';

import * as styles from "./MobileMenu.module.scss";

const MobileMenu = ({ onMenuItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(!isOpen);
  };

  const handleItemClick = (e, id) => {
    e.stopPropagation();
    if (onMenuItemClick) onMenuItemClick(e, id);
    setIsOpen(false);
  };

  return (
    <div className={styles.menuWrapper}>
      <button onClick={toggleMenu} className={styles.toggleButton}>
        {isOpen ? <CloseIcon size={32} /> : <Menu size={32} />}
      </button>

      <AnimatePresence>
        {isOpen && (
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
                  className={styles.menuTextItem}
                  onClick={(e) => handleItemClick(e, item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;