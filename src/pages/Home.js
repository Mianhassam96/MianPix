import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaArrowRight, FaLock, FaBolt, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { pageVariants } from '../animations/pageVariants';
import { useTheme } from '../context/ThemeContext';
import './Home.css';

const TOOLS = [
  { id: 'remove-bg',   icon: '🧹', title: 'Remove Background',      desc: 'AI-powered transparent background removal',    color: '#ef4444', path: '/tools/remove-bg'   },
  { id: 'resize',      icon: '📐', title: 'Smart Resize',            desc: 'Instagram, YouTube, blog & custom sizes',      color: '#3b82f6', path: '/tools/resize'      },
  { id: 'bg-blur',     icon: '🌫️', title: 'Background Blur',         desc: 'Portrait-mode soft blur effect',               color: '#8b5cf6', path: '/tools/bg-blur'     },
  { id: 'thumbnail',   icon: '🖼️', title: 'Thumbnail Maker',         desc: 'YouTube, blog & social thumbnails',            color: '#f59e0b', path: '/tools/thumbnail'   },
  { id: 'compress',    icon: '🗜️', title: 'Image Compressor',        desc: 'Reduce file size, keep quality',               color: '#10b981', path: '/tools/compress'    },
  { id: 'convert',     icon: '🔄', title: 'Format Converter',        desc: 'PNG ↔ JPG ↔ WEBP instantly',                  color: '#06b6d4', path: '/tools/convert'     },
  { id: 'optimizer',   icon: '⚡', title: 'Web Optimizer',           desc: 'Convert to WebP + compress for web',           color: '#f97316', path: '/tools/optimizer'   },
  { id: 'profile',     icon: '👤', title: 'Profile Picture Maker',   desc: 'Circle crop with gradients & borders',         color: '#ec4899', path: '/tools/profile'     },
  { id: 'palette',     icon: '🎨', title: 'Color Palette Extractor', desc: 'Extract hex codes & generate gradients',       color: '#a855f7', path: '/tools/palette'     },
  { id: 'favicon',     icon: '🔖', title: 'Favicon Generator',       desc: 'All sizes + HTML snippet + ZIP download',      color: '#14b8a6', path: '/tools/favicon'     },
];

const Home = () => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');

  const filtered = TOOLS.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      className={`home-page ${theme}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero */}
      <section className="home-hero">
        <motion.div
          className="home-hero-inner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="home-badge"><FaBolt /> Simple & Powerful Image Tools</span>
          <h1 className="home-title">
            MianPix
            <span className="gradient-text"> — Image Tools</span>
          </h1>
          <p className="home-subtitle">
            10 focused tools for developers & creators. No sign-up. No uploads to servers. 100% free.
          </p>

          {/* Search */}
          <div className="home-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tools…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')}>✕</button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section className="tools-section">
        <div className="tools-container">
          {query && (
            <p className="search-results-label">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{query}"
            </p>
          )}
          {!query && <h2 className="tools-grid-title">All Tools</h2>}

          <div className="tools-grid">
            {filtered.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link to={tool.path} className="tool-card" style={{ '--tool-color': tool.color }}>
                  <div className="tool-card-icon">{tool.icon}</div>
                  <div className="tool-card-body">
                    <h3 className="tool-card-title">{tool.title}</h3>
                    <p className="tool-card-desc">{tool.desc}</p>
                  </div>
                  <FaArrowRight className="tool-card-arrow" />
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="no-results">
              <p>No tools found for "{query}"</p>
              <button onClick={() => setQuery('')}>Clear search</button>
            </div>
          )}
        </div>
      </section>

      {/* Why section */}
      <section className="why-section">
        <div className="why-container">
          {[
            { icon: <FaLock />, title: 'Privacy First',    desc: 'All processing in your browser. Images never leave your device.' },
            { icon: <FaBolt />, title: 'Lightning Fast',   desc: 'No uploads, no waiting. Instant client-side processing.' },
            { icon: <FaHeart />, title: 'Completely Free', desc: 'No subscriptions, no hidden fees. Professional tools, free forever.' },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="why-card"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <div className="why-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
