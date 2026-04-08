import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin, FaHeart, FaRocket, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />,    url: 'https://github.com/Mianhassam96',                    label: 'GitHub' },
    { icon: <FaLinkedin />,  url: 'https://www.linkedin.com/in/mianhassam96/',           label: 'LinkedIn' },
    { icon: <FaFacebookF />, url: 'https://www.facebook.com/mian.hassam.kz',             label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/mianhassam96/',             label: 'Instagram' },
  ];

  const tools = [
    'Image Editor',
    'Avatar Creator',
    'Remove Background',
    'Smart Optimizer',
    'Thumbnail Generator',
    'Color Palette',
    'Favicon Generator',
    'Live Preview',
  ];

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <FaRocket className="logo-icon" />
              MianPix
            </h3>
            <p className="footer-tagline">
              Image tools for developers & creators. 8 powerful tools, all in your browser.
              Free, fast, and completely private.
            </p>
            <a
              href="https://multimian.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-portfolio-link"
              title="Visit MultiMian.com"
            >
              <FaExternalLinkAlt /> Visit MultiMian.com
            </a>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tool">All Tools</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div className="footer-features">
            <h4>Tools</h4>
            <ul>
              {tools.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          {/* Connect */}
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
                  title={social.label}
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
              href="https://multimian.com/"
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
              GitHub
            </a>
            <span className="separator">•</span>
            <a href="https://multimian.com/" target="_blank" rel="noopener noreferrer">
              MultiMian.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
