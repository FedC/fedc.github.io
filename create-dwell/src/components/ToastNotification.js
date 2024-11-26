import React, { useEffect, useState } from 'react';
import styles from './ToastNotification.module.scss';

const ToastNotification = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span>{message}</span>
      <button className={styles.closeButton} onClick={onClose}>&times;</button>
    </div>
  );
};

export default ToastNotification;