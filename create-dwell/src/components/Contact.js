import React, { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as styles from './Contact.module.scss';

const Contact = ({ parentScroller, projects }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [status, setStatus] = useState(null);
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    if (!projects.length) return;
    const publishedProjects = projects.filter((project) => project.published);
    const projectContents = publishedProjects.map((project) => {
      return project.content;
    });

    projectContents.forEach((contents) => {
      const featuredImages = contents.filter((content) => content.type === 'image' && content.featured);
      featuredImages.forEach((image) => {
        setFeaturedItems((prevItems) => {
          return [...prevItems, { imageUrl: image.url }];
        });
      });
    });
  }, [projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all fields.');
      return;
    }

    if (!captchaValue) {
      setStatus('Please verify that you are human.');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/manqwpov', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, 'g-recaptcha-response': captchaValue }),
      });

      if (response.ok) {
        setStatus('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setCaptchaValue(null);
      } else {
        setStatus('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('Error sending message. Please check your network connection.');
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h2>Contact Us</h2>
      <p>
        We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
      </p>

      {/* <div className={styles.featuredImages}>
        {featuredItems.map((item, index) => (
          <img key={index} src={item.imageUrl} alt="Featured" />
        ))}
      </div> */}

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

        <div className={styles.captchaContainer}>
          <ReCAPTCHA sitekey="6LfOJr8qAAAAAOvXNz5-ddMP3FmyucIOuqY9hYSQ" onChange={setCaptchaValue} />
        </div>

        {status && <p className={styles.statusMessage}>{status}</p>}

        <button type="submit" className={styles.submitButton}>Send Message</button>
      </form>
    </div>
  );
};

export default Contact;