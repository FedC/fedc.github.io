import React from 'react';
import * as footerStyles from './Footer.module.scss';

const Footer = ({ showCredits = false }) => {
  return (
    <footer className={footerStyles.footer}>
      {/* carolina@create-dwell.com  |  954 210 0862   |  AR91865 + ID6603 
                  LinkedIn ©2025 by Carolina Wiebe PA, LEED AP BD+C */}

      <div className={footerStyles.footerTop}>
        {
          ['architecture', 'spacer', 'interior design', 'spacer', 'planning']
            .map((item, index) => (
              item === 'spacer' ?
                <div key={`spacer-${index}`} className={footerStyles.spacer}></div>
                :
                <span key={`item-${item}`}>{item}</span>
            ))}
      </div>

      <div className={footerStyles.footerInner}>

        <div className={footerStyles.footerContact}>
          <p>
            <a href="mailto:carolina@create-dwell.com">carolina@create-dwell.com</a>
            <span className={footerStyles.emptySpace}></span>
            <a href="tel:9542100862">954 210 0862</a>
            <span className={footerStyles.emptySpace}></span>
            AR91865 + ID6603
          </p>
        </div>

        <div className={footerStyles.footerCopyright}>
          <p>
            ©2025 by Carolina Wiebe PA, LEED AP BD+C
          </p>
        </div>
      </div>

      {showCredits && (<div className={footerStyles.footerBottom}>
        <small>
          Built by <a target="_blank" href="https://okcd.io">okcd.io</a>
        </small>
      </div>)}
    </footer>
  );
};

export default Footer;