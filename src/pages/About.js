import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaGithub, FaCrop, FaCompressArrowsAlt,
  FaUserCircle, FaEraser, FaEyeDropper, FaCode,
  FaGlobe, FaBolt, FaImage, FaLock, FaExternalLinkAlt
} from 'react-icons/fa';
import { pageVariants } from '../animations/pageVariants';
import './About.css';

const About = () => {
  const tools = [
    { icon: <FaCrop />,             title: 'Image Editor',          desc: 'Crop, resize, rotate, flip, compress and export in PNG/JPG/WEBP', color: '#3b82f6' },
    { icon: <FaUserCircle />,       title: 'Avatar Creator',         desc: 'Create circle/square profile pictures with gradients and borders', color: '#8b5cf6' },
    { icon: <FaEraser />,           title: 'Remove Background',      desc: 'AI-powered one-click background removal using @imgly/background-removal', color: '#ef4444' },
    { icon: <FaBolt />,             title: 'Smart Optimizer',        desc: 'Compress + convert to WebP + resize with Pica — shows before/after savings', color: '#f59e0b' },
    { icon: <FaImage />,            title: 'Thumbnail Generator',    desc: 'YouTube, Blog, Product & Social thumbnails with gradient overlays and title text', color: '#10b981' },
    { icon: <FaEyeDropper />,       title: 'Color Palette',          desc: 'Extract dominant colors and generate gradient CSS from any image', color: '#06b6d4' },
    { icon: <FaCode />,             title: 'Favicon Generator',      desc: 'All 6 favicon sizes + HTML snippet + ZIP download for developers', color: '#ec4899' },
    { icon: <FaGlobe />,            title: 'Live Website Preview',   desc: 'See your image in Blog Card, Hero, Portfolio, Thumbnail Grid & OG card mockups', color: '#14b8a6' },
  ];

  const techStack = [
    { name: 'React 18',                   icon: <FaReact /> },
    { name: 'Framer Motion',              icon: <FaReact /> },
    { name: 'React Router v7',            icon: <FaReact /> },
    { name: 'React Image Crop',           icon: <FaReact /> },
    { name: 'Pica (resize)',              icon: <FaReact /> },
    { name: '@imgly/background-removal',  icon: <FaReact /> },
    { name: 'JSZip',                      icon: <FaReact /> },
    { name: 'React Toastify',             icon: <FaReact /> },
    { name: 'React Icons',                icon: <FaReact /> },
    { name: 'Canvas API',                 icon: <FaReact /> },
  ];

  const stats = [
    { value: '8', label: 'Tools' },
    { value: '100%', label: 'Free' },
    { value: '0', label: 'Uploads' },
    { value: '∞', label: 'Privacy' },
  ];

  return (
    <motion.div
      className="about-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="about-container">

        {/* Hero */}
        <motion.section
          className="about-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-badge">Image Tools for Developers & Creators</div>
          <h1>About MianPix</h1>
          <p className="about-tagline">
            MianPix is a free, fast, and privacy-focused suite of image tools built entirely in the browser.
            No uploads. No accounts. No tracking. Just powerful tools that work instantly.
          </p>
          <div className="about-stats">
            {stats.map((s, i) => (
              <div key={i} className="about-stat">
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Mission */}
        <motion.section
          className="about-mission"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h2>Our Mission</h2>
          <p>
            MianPix was built to give developers and creators professional-grade image tools without
            the friction of sign-ups, subscriptions, or privacy concerns. Every tool runs entirely
            in your browser using the Canvas API and Web Workers — your images never touch a server.
          </p>
        </motion.section>

        {/* 8 Tools */}
        <motion.section
          className="features-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <h2>8 Powerful Tools</h2>
          <div className="features-grid">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.3 + index * 0.07 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon" style={{ color: tool.color }}>{tool.icon}</div>
                <h3>{tool.title}</h3>
                <p>{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          className="tech-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="tech-badge"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.45 + index * 0.04 }}
                whileHover={{ scale: 1.08 }}
              >
                <span className="tech-icon">{tech.icon}</span>
                {tech.name}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Privacy */}
        <motion.section
          className="privacy-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="privacy-icon"><FaLock /></div>
          <h2>Privacy First</h2>
          <p>
            Every operation — cropping, compressing, background removal, favicon generation — runs
            locally using the <strong>Canvas API</strong> and <strong>Web Workers</strong>.
            No image data is ever sent to a server. No analytics on your files. No cookies tracking
            what you edit. What happens in your browser, stays in your browser.
          </p>
        </motion.section>

        {/* Links */}
        <motion.section
          className="github-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
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
};

export default About;
