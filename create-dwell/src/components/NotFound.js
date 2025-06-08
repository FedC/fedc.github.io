import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className={styles.homeButton}>
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
