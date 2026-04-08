import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin, FaHeart, FaRocket, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

const TOOLS = [
  { label: 'Remove Background', path: '/tools/remove-bg'  },
  { label: 'Smart Resize',      path: '/tools/resize'     },
  { label: 'Background Blur',   path: '/tools/bg-blur'    },
  { label: 'Thumbnail Maker',   path: '/tools/thumbnail'  },
  { label: 'Image Compressor',  path: '/tools/compress'   },
  { label: 'Format Converter',  path: '/tools/convert'    },
  { label: 'Web Optimizer',     path: '/tools/optimizer'  },
  { label: 'Profile Picture',   path: '/tools/profile'    },
  { label: 'Color Palette',     path: '/tools/palette'    },
  { label: 'Favicon Generator', path: '/tools/favicon'    },
];

const SOCIAL = [
  { icon: <FaGithub />,    url: 'https://github.com/Mianhassam96',                  label: 'GitHub'    },
  { icon: <FaLinkedin />,  url: 'https://www.linkedin.com/in/mianhassam96/',         label: 'LinkedIn'  },
  { icon: <FaFacebookF />, url: 'https://www.facebook.com/mian.hassam.kz',           label: 'Facebook'  },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/mianhassam96/',           label: 'Instagram' },
];

export default function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

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
              10 powerful image tools for developers & creators.
              All in your browser — free, fast, and completely private.
            </p>
            <a href="https://multimian.com/" target="_blank" rel="noopener noreferrer"
              className="footer-portfolio-link" title="Visit MultiMian.com">
              <FaExternalLinkAlt /> Visit MultiMian.com
            </a>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li>
                <a href="https://github.com/Mianhassam96/MianPix" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Tools — split into two columns */}
          <div className="footer-tools-col">
            <h4>Tools</h4>
            <div className="footer-tools-grid">
              {TOOLS.map((t, i) => (
                <Link key={i} to={t.path} className="footer-tool-link">{t.label}</Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="footer-connect">
            <h4>Connect</h4>
            <div className="footer-social">
              {SOCIAL.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label} title={s.label} className="social-link">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} MianPix. Made with <FaHeart className="heart-icon" /> by{' '}
            <a href="https://multimian.com/" target="_blank" rel="noopener noreferrer" className="footer-author">
              Mian Hassam
            </a>
          </p>
          <div className="footer-meta">
            <span>Open Source</span>
            <span className="separator">•</span>
            <a href="https://github.com/Mianhassam96/MianPix" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="separator">•</span>
            <a href="https://multimian.com/" target="_blank" rel="noopener noreferrer">MultiMian.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
