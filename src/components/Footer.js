import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin, FaHeart, FaRocket } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/Mianhassam96', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/mianhassam96/', label: 'LinkedIn' },
    { icon: <FaFacebookF />, url: 'https://www.facebook.com/mian.hassam.kz', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/mianhassam96/', label: 'Instagram' }
  ];

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <FaRocket className="logo-icon" />
              MianPix
            </h3>
            <p className="footer-tagline">
              Fast, free, and privacy-focused image editing. All processing happens in your browser.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tool">Image Editor</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div className="footer-features">
            <h4>Features</h4>
            <ul>
              <li>Crop & Resize</li>
              <li>Avatar Creator</li>
              <li>Remove Background</li>
              <li>Compress Images</li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="footer-connect">
            <h4>Connect</h4>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} MianPix. Made with <FaHeart className="heart-icon" /> by{' '}
            <a 
              href="https://github.com/Mianhassam96" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-author"
            >
              Mian Hassam
            </a>
          </p>
          <div className="footer-meta">
            <span>Open Source</span>
            <span className="separator">•</span>
            <a href="https://github.com/Mianhassam96/MianPix" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
