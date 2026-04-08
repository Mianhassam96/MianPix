import React, { useState } from 'react';
import { FaGithub, FaFacebook, FaLinkedin, FaEnvelope, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { pageVariants } from '../animations/pageVariants';
import { useTheme } from '../context/ThemeContext';
import './Contact.css';

// Formspree endpoint — replace YOUR_FORM_ID with your actual Formspree form ID
// Get a free form at https://formspree.io (no backend needed)
const FORMSPREE_URL = 'https://formspree.io/f/xpwzgkqb';

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      className={`contact ${theme}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>

        {status === 'success' ? (
          <motion.div
            className="contact-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FaCheckCircle className="success-icon" />
            <h3>Message sent!</h3>
            <p>Thanks for reaching out. We'll get back to you soon.</p>
            <button onClick={() => setStatus('idle')} className="submit-btn">
              Send Another
            </button>
          </motion.div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                disabled={status === 'sending'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                disabled={status === 'sending'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message…"
                required
                disabled={status === 'sending'}
              />
            </div>

            {status === 'error' && (
              <p className="contact-error">
                ⚠️ Something went wrong. Please try again or email us directly.
              </p>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending'
                ? <><FaSpinner className="spin" /> Sending…</>
                : 'Send Message'
              }
            </button>
          </form>
        )}

        <div className="social-links">
          <h2>Connect With Us</h2>
          <div className="social-icons">
            <a href="https://github.com/Mianhassam96" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={36} />
            </a>
            <a href="https://www.facebook.com/mian.hassam.kz" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={36} />
            </a>
            <a href="https://www.linkedin.com/in/mianhassam96/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={36} />
            </a>
            <a href="mailto:mianhassam96@gmail.com" aria-label="Email">
              <FaEnvelope size={36} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
