import React from 'react';
import * as footerStyles from './Footer.module.scss';

const Footer = ({ showCredits = true }) => {
  return (
    <footer className={footerStyles.footer}>
      {/* carolina@create-dwell.com  |  954 210 0862   |  AR91865 + ID6603 
                  LinkedIn ©2025 by Carolina Wiebe PA, LEED AP BD+C */}

      <div className={footerStyles.footerTop}>
        <div className={footerStyles.serviceGroup}>
          <span>architecture</span>
          <span className={footerStyles.license}>AR91865</span>
        </div>
        <div className={footerStyles.spacer}></div>
        <div className={footerStyles.serviceGroup}>
          <span>interior design</span>
          <span className={footerStyles.license}>ID6603</span>
        </div>
        <div className={footerStyles.spacer}></div>
        <div className={footerStyles.serviceGroup}>
          <span>planning</span>
        </div>
      </div>

      <div className={footerStyles.footerInner}>
        <div className={footerStyles.footerContact}>
          <p>
            <a href="mailto:carolina@create-dwell.com">carolina@create-dwell.com</a><br />
            <a href="tel:9542100862">954–210–0862</a>
          </p>
        </div>

        <div className={footerStyles.footerCopyright}>
          <p>2025 by Carolina Wiebe, RA, RID, LEED AP BD+C</p>
          {showCredits && (<small>Built by <a target="_blank" href="https://okcd.io">okcd.io</a></small>)}
        </div>
      </div>
    </footer>
  );
};

export default Footer;