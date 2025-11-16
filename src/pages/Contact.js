import React, { useState } from 'react';
import { FaGithub, FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! (Note: This is a demo form)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              required
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
              required
            />
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>

        <div className="social-links">
          <h2>Connect With Us</h2>
          <div className="social-icons">
            <a href="https://github.com/Mianhassam96" target="_blank" rel="noopener noreferrer">
              <FaGithub size={40} />
            </a>
            <a href="https://www.facebook.com/mian.hassam.kz" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={40} />
            </a>
            <a href="https://www.linkedin.com/in/mianhassam96/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={40} />
            </a>
            <a href="mailto:mianhassam96@gmail.com">
              <FaEnvelope size={40} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
