import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './LivePreview.css';

const MODES = [
  { id: 'blog', label: 'Blog Card' },
  { id: 'hero', label: 'Hero Section' },
  { id: 'portfolio', label: 'Portfolio Card' },
  { id: 'thumbnail', label: 'Thumbnail Grid' },
  { id: 'og', label: 'OG / Social Preview' },
];

const LivePreview = ({ imageSrc }) => {
  const [mode, setMode] = useState('blog');

  if (!imageSrc) {
    return (
      <div className="live-preview-empty">
        <p>Upload an image to see live website previews</p>
      </div>
    );
  }

  return (
    <motion.div className="live-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="lp-header">
        <h3>🌐 Live Website Preview</h3>
        <p>See how your image looks in real website contexts</p>
      </div>

      <div className="lp-modes">
        {MODES.map(m => (
          <button
            key={m.id}
            className={`lp-mode-btn ${mode === m.id ? 'active' : ''}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <motion.div
        className="lp-canvas"
        key={mode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {mode === 'blog' && <BlogCard imageSrc={imageSrc} />}
        {mode === 'hero' && <HeroSection imageSrc={imageSrc} />}
        {mode === 'portfolio' && <PortfolioCard imageSrc={imageSrc} />}
        {mode === 'thumbnail' && <ThumbnailGrid imageSrc={imageSrc} />}
        {mode === 'og' && <OGPreview imageSrc={imageSrc} />}
      </motion.div>
    </motion.div>
  );
};

const BlogCard = ({ imageSrc }) => (
  <div className="mock-browser">
    <div className="mock-bar"><span /><span /><span /></div>
    <div className="mock-body blog-layout">
      <div className="blog-card">
        <img src={imageSrc} alt="blog" className="blog-card-img" />
        <div className="blog-card-body">
          <span className="blog-tag">Design</span>
          <h4>How to Create Stunning Visuals for Your Blog</h4>
          <p>Learn the best practices for image optimization and visual storytelling that keeps readers engaged...</p>
          <div className="blog-meta">
            <div className="blog-avatar" />
            <span>Mian Hassam · 5 min read</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HeroSection = ({ imageSrc }) => (
  <div className="mock-browser">
    <div className="mock-bar"><span /><span /><span /></div>
    <div className="mock-body hero-layout" style={{ backgroundImage: `url(${imageSrc})` }}>
      <div className="hero-overlay">
        <div className="hero-mock-nav">
          <span className="hero-logo">MianPix</span>
          <div className="hero-nav-links"><span /><span /><span /></div>
        </div>
        <div className="hero-mock-content">
          <h2>Your Image as a Hero</h2>
          <p>This is how your image looks as a full-width website hero section</p>
          <div className="hero-mock-btns">
            <div className="hero-btn primary" />
            <div className="hero-btn secondary" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PortfolioCard = ({ imageSrc }) => (
  <div className="mock-browser">
    <div className="mock-bar"><span /><span /><span /></div>
    <div className="mock-body portfolio-layout">
      {[1, 2, 3].map(i => (
        <div key={i} className={`portfolio-card ${i === 1 ? 'featured' : ''}`}>
          <img src={imageSrc} alt="portfolio" />
          <div className="portfolio-overlay">
            <span>Project {i}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ThumbnailGrid = ({ imageSrc }) => (
  <div className="mock-browser">
    <div className="mock-bar"><span /><span /><span /></div>
    <div className="mock-body thumb-grid-layout">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="thumb-grid-item">
          <img src={imageSrc} alt="thumb" />
          <div className="thumb-grid-info">
            <div className="tg-title" />
            <div className="tg-meta" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OGPreview = ({ imageSrc }) => (
  <div className="og-preview-wrap">
    <p className="og-label">Twitter / X Card</p>
    <div className="og-card">
      <img src={imageSrc} alt="og" className="og-img" />
      <div className="og-body">
        <span className="og-domain">mianhassam96.github.io</span>
        <h4>MianPix — Image Tools for Developers</h4>
        <p>Fast, free, privacy-focused image editing in your browser.</p>
      </div>
    </div>
    <p className="og-label" style={{ marginTop: '1.5rem' }}>Facebook / LinkedIn</p>
    <div className="og-card fb">
      <img src={imageSrc} alt="og-fb" className="og-img-wide" />
      <div className="og-body">
        <span className="og-domain">mianhassam96.github.io</span>
        <h4>MianPix — Image Tools for Developers</h4>
        <p>Fast, free, privacy-focused image editing in your browser.</p>
      </div>
    </div>
  </div>
);

export default LivePreview;
