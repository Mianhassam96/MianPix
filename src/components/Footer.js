import React from 'react';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <p className="footer-text">
          MianPix © {new Date().getFullYear()} — Built with ❤️ by{' '}
          <a 
            href="https://github.com/Mianhassam96" 
            target="_blank" 
            rel="noreferrer"
            className="footer-link"
          >
            MultiMian
          </a>
        </p>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="https://www.facebook.com/mian.hassam.kz" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://github.com/Mianhassam96" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/mianhassam96/" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/mianhassam96/" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>

      </div>
    </footer>
  );
}
