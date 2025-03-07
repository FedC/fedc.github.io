import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { getFunctions, httpsCallable } from "firebase/functions";
import * as styles from './Contact.module.scss';
import * as footerStyles from './Footer.module.scss';
import gsap from 'gsap';
import Footer from './Footer';
import SendIcon from './SendIcon';

const Contact = ({ parentScroller, projects }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const footerRef = useRef(null);
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

  useEffect(() => {
    if (footerRef.current) {
      const curr = footerRef.current;
      gsap.set(curr.querySelector(`.${footerStyles.footer}`), { marginTop: '40px' })
      gsap.to(curr.querySelector(`.${footerStyles.footer}`), { opacity: 1, duration: 0.5, delay: 0.5 });
    }
  }, [footerRef]);

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
      const functions = getFunctions();
      const verifyRecaptcha = httpsCallable(functions, "verifyRecaptcha");

      // Send token to Firebase function
      const recaptchaResponse = await verifyRecaptcha({
        token: captchaValue,
        action: "contact_form",
      });

      if (!recaptchaResponse.data.success || recaptchaResponse.data.score < 0.5) {
        setStatus("reCAPTCHA verification failed. Please try again.");
        return;
      }

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
      console.error("error:", error);
    }
  };

  return (
    <div className={styles.contactWrapper}>

      <h1>Contact Us</h1>
      <h2>Ready to create?</h2>
      <p>We look forward to hearing from you.</p>

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

            <div className={styles.captchaContainer}>
              <ReCAPTCHA sitekey="6LfOJr8qAAAAAOvXNz5-ddMP3FmyucIOuqY9hYSQ" onChange={setCaptchaValue} />
            </div>

            {status && <p className={styles.statusMessage}>{status}</p>}

            <button type="submit" className={styles.submitButton}>
              <SendIcon />
            </button>
          </form>
        </div>

        <div className={styles.contactImage}>
          <img src="https://s3-alpha-sig.figma.com/img/64a4/d5c5/63b937325165fa58cf1277f5a928fde8?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IEyDJwvU4gpkQOhaoTAUrCJgVak4M3wYuA0vsGCQ4MQEydsd7z8YlGC0O9uxIvYxOhmS6rHKh9N1r-XSJla5irNhti0KBKNUg1FOToijnfVNjdI7SyQ94MDh-ulcf7HEsXLhJII0nQUgwWawpqjXSohKpXsuNpR0VMDgPZo4UoxQuA4MZ2Acto1jEUCTPMUaAAgwk9pwO~1yWHCWVKwxXefr0j91PQjgADFyaaTzkmvPZnSWsYRobC3cpRZnqdDcieb35Uf-MPxkT0VkdZjELWrWxDYCxQLhj6gU4Tczf6lkeJwns3Xq45Q78rkfLtwGpHF2W19JkzKVUfXTG4I9ig__" alt="Contact" />
        </div>
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;