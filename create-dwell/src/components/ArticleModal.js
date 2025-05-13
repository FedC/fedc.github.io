import React from 'react';
import * as styles from './ArticleModal.module.scss';

const ArticleModal = ({ open, onClose, article }) => {
  if (!open || !article) return null;
  return (
    <div className={styles.overlay} onClick={onClose} id="article-modal">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <iframe
          src={article.link}
          title={article.title}
          className={styles.iframe}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ArticleModal; 