import React, { useState, useEffect, useRef } from 'react';
import * as styles from './Contact.module.scss';
import SendIcon from './SendIcon';

const Contact = ({ contactImageUrl = '', formspreeId = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target._gotcha.value !== "") return; // honeypot trap

    if (!formspreeId) {
      console.error("Formspree ID is missing");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData }),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error("Formspree submission failed", await response.text());
        setStatus('error');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setStatus("error");
    }
  };

  return (
    <div className={styles.contactWrapper}>

      <div className={styles.contactBox}>
        <div className={styles.contactHeader}>
          <h1>Contact Us</h1>
          <h2>Ready to create?</h2>
          <p>We look forward to hearing from you!</p>
        </div>

        <div className={styles.contactContainer}>
          <div>
            <form onSubmit={handleSubmit} className={styles.contactForm} autoComplete="off">
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength="2"
                  maxLength="50"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength="10"
                  maxLength="500"
                />
              </div>

              {/* honeypot field for spam prevention */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} />

              {status === 'success' && (
                <p className={styles.statusSuccess}>Thanks! We'll be in touch shortly.</p>
              )}

              {status === 'error' && (
                <p className={styles.statusError}>Something went wrong. Please try again.</p>
              )}

              <button type="submit" className={styles.submitButton} disabled={status === 'loading' || status === 'success'}>
                {status === 'loading' ? (
                  <span className={styles.loader} />
                ) : status === 'success' ? (
                  <span className={styles.checkmark}>✔</span>
                ) : (
                  <SendIcon />
                )}
              </button>

            </form>
          </div>

          <div className={styles.contactImage}>
            {contactImageUrl && <img
              src={contactImageUrl || ''}
              alt="Contact"
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;