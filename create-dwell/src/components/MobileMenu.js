import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
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
    // { id: "home", icon: <HomeIcon size={24} fill={orange} />, label: "Home" },
    { id: "about", icon: <AboutIcon fill="white" stroke={orange} />, label: "About" },
    { id: "services", icon: <ServicesIcon stroke={orange} fill="white" />, label: "Services" },
    { id: "contact", icon: <ContactIcon fill={orange} />, label: "Contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      gsap.to(buttonsRef.current, {
        duration: 0.3,
        stagger: 0.1,
        x: (i) => -80 * Math.cos((i * Math.PI) / (menuItems.length + 1)), // Moves left
        y: (i) => 80 * Math.sin((i * Math.PI) / (menuItems.length + 1)), // Moves downward
        opacity: 1,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(buttonsRef.current, {
        duration: 0.3,
        stagger: 0.1,
        x: 0,
        y: 0,
        opacity: 0,
        ease: "back.in(1.7)",
      });
    }
  };

  const handleItemClick = (e, id) => {
    e.stopPropagation();
    if (onMenuItemClick) onMenuItemClick(e, id);
    setIsOpen(false);
    gsap.to(buttonsRef.current, { x: 0, y: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <div className={styles.menu}>
      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <button
          key={item.id}
          ref={(el) => (buttonsRef.current[index] = el)}
          className={styles.menuItem}
          onClick={(e) => handleItemClick(e, item.id)}
        >
          {item.icon}
        </button>
      ))}

      {/* Main Button */}
      <motion.button
        ref={menuRef}
        onClick={toggleMenu}
        className={styles.mainButton}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <CloseIcon size={32} fill={orange} /> : <Menu size={32} />}
      </motion.button>
    </div>
  );
};

export default MobileMenu;