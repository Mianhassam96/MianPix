import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaReact, FaGithub, FaEraser, FaEyeDropper, FaCode,
  FaGlobe, FaBolt, FaImage, FaLock, FaExternalLinkAlt,
  FaCompress, FaExchangeAlt, FaUserCircle, FaSearchPlus
} from 'react-icons/fa';
import { pageVariants } from '../animations/pageVariants';
import './About.css';

const TOOLS = [
  { icon: '🧹', title: 'Remove Background',      desc: 'AI-powered transparent background removal',    color: '#ef4444', path: '/tools/remove-bg'  },
  { icon: '📐', title: 'Smart Resize',            desc: 'Instagram, YouTube, blog & custom sizes',      color: '#3b82f6', path: '/tools/resize'     },
  { icon: '🌫️', title: 'Background Blur',         desc: 'Portrait-mode soft blur with live preview',    color: '#8b5cf6', path: '/tools/bg-blur'    },
  { icon: '🖼️', title: 'Thumbnail Maker',         desc: 'YouTube, blog & social thumbnails',            color: '#f59e0b', path: '/tools/thumbnail'  },
  { icon: '🗜️', title: 'Image Compressor',        desc: 'Reduce file size, live size estimate',         color: '#10b981', path: '/tools/compress'   },
  { icon: '🔄', title: 'Format Converter',        desc: 'PNG ↔ JPG ↔ WEBP instantly',                  color: '#06b6d4', path: '/tools/convert'    },
  { icon: '⚡', title: 'Web Optimizer',           desc: 'Convert to WebP + compress for web',           color: '#f97316', path: '/tools/optimizer'  },
  { icon: '👤', title: 'Profile Picture Maker',   desc: 'Circle crop with gradients & borders',         color: '#ec4899', path: '/tools/profile'    },
  { icon: '🎨', title: 'Color Palette Extractor', desc: 'Extract hex codes & generate gradients',       color: '#a855f7', path: '/tools/palette'    },
  { icon: '🔖', title: 'Favicon Generator',       desc: 'All sizes + HTML snippet + ZIP download',      color: '#14b8a6', path: '/tools/favicon'    },
];

const TECH = [
  'React 18', 'Framer Motion', 'React Router v7', 'React Image Crop',
  'Pica (resize)', '@imgly/background-removal', 'JSZip',
  'React Toastify', 'React Icons', 'Canvas API',
];

const STATS = [
  { value: '10', label: 'Tools' },
  { value: '100%', label: 'Free' },
  { value: '0',    label: 'Uploads' },
  { value: '∞',   label: 'Privacy' },
];

const About = () => (
  <motion.div
    className="about-page"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <div className="about-container">

      {/* Hero */}
      <motion.section className="about-hero"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="about-badge"><FaBolt style={{ marginRight: 4 }} /> Image Tools for Developers & Creators</div>
        <h1>About MianPix</h1>
        <p className="about-tagline">
          MianPix is a free, fast, and privacy-focused suite of 10 image tools built entirely in the browser.
          No uploads. No accounts. No tracking. Just powerful tools that work instantly.
        </p>
        <div className="about-stats">
          {STATS.map((s, i) => (
            <div key={i} className="about-stat">
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Mission */}
      <motion.section className="about-mission"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <h2>Our Mission</h2>
        <p>
          MianPix was built to give developers and creators professional-grade image tools without
          the friction of sign-ups, subscriptions, or privacy concerns. Every tool runs entirely
          in your browser using the <strong>Canvas API</strong> — your images never touch a server.
        </p>
      </motion.section>

      {/* 10 Tools */}
      <motion.section className="features-section"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h2>10 Powerful Tools</h2>
        <div className="features-grid">
          {TOOLS.map((tool, i) => (
            <motion.div key={i} className="feature-card"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}>
              <Link to={tool.path} className="feature-card-link">
                <div className="feature-icon-wrap" style={{ color: tool.color }}>
                  <span className="feature-emoji">{tool.icon}</span>
                </div>
                <h3>{tool.title}</h3>
                <p>{tool.desc}</p>
                <span className="feature-try">Try it →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section className="tech-section"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <h2>Technology Stack</h2>
        <div className="tech-grid">
          {TECH.map((name, i) => (
            <motion.div key={i} className="tech-badge"
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.04 }}
              whileHover={{ scale: 1.06 }}>
              <FaReact className="tech-icon" />
              {name}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Privacy */}
      <motion.section className="privacy-section"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <div className="privacy-icon"><FaLock /></div>
        <h2>Privacy First</h2>
        <p>
          Every operation — compressing, background removal, favicon generation, format conversion —
          runs locally using the <strong>Canvas API</strong>. No image data is ever sent to a server.
          No analytics on your files. What happens in your browser, stays in your browser.
        </p>
      </motion.section>

      {/* Links */}
      <motion.section className="github-section"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <h2>Open Source</h2>
        <p>MianPix is open source. Star it, fork it, contribute — all welcome.</p>
        <div className="about-links">
          <a href="https://github.com/Mianhassam96/MianPix" target="_blank" rel="noopener noreferrer" className="github-link">
            <FaGithub /> View on GitHub
          </a>
          <a href="https://multimian.com/" target="_blank" rel="noopener noreferrer" className="portfolio-link">
            <FaExternalLinkAlt /> Visit MultiMian.com
          </a>
        </div>
      </motion.section>

    </div>
  </motion.div>
);

// suppress unused import warnings — icons used in JSX above
void [FaEraser, FaEyeDropper, FaCode, FaGlobe, FaImage, FaCompress, FaExchangeAlt, FaUserCircle, FaSearchPlus];

export default About;
