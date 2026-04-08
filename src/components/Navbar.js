import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const TOOL_GROUPS = [
  {
    group: 'Background',
    tools: [
      { path: '/tools/remove-bg', icon: '🧹', label: 'Remove Background', desc: 'AI-powered removal', color: '#ef4444' },
      { path: '/tools/bg-blur',   icon: '🌫️', label: 'Background Blur',   desc: 'Portrait-mode blur', color: '#8b5cf6' },
    ],
  },
  {
    group: 'Resize & Convert',
    tools: [
      { path: '/tools/resize',    icon: '📐', label: 'Smart Resize',      desc: 'Social media presets', color: '#3b82f6' },
      { path: '/tools/convert',   icon: '🔄', label: 'Format Converter',  desc: 'PNG ↔ JPG ↔ WEBP',   color: '#06b6d4' },
    ],
  },
  {
    group: 'Optimize',
    tools: [
      { path: '/tools/compress',  icon: '🗜️', label: 'Image Compressor', desc: 'Reduce file size',    color: '#10b981' },
      { path: '/tools/optimizer', icon: '⚡', label: 'Web Optimizer',    desc: 'WebP + compress',     color: '#f97316' },
    ],
  },
  {
    group: 'Create',
    tools: [
      { path: '/tools/thumbnail', icon: '🖼️', label: 'Thumbnail Maker',  desc: 'YouTube & blog',      color: '#f59e0b' },
      { path: '/tools/profile',   icon: '👤', label: 'Profile Picture',  desc: 'Circle crop & style', color: '#ec4899' },
    ],
  },
  {
    group: 'Extract & Generate',
    tools: [
      { path: '/tools/palette',   icon: '🎨', label: 'Color Palette',    desc: 'Extract hex codes',   color: '#a855f7' },
      { path: '/tools/favicon',   icon: '🔖', label: 'Favicon Generator',desc: 'All sizes + ZIP',     color: '#14b8a6' },
    ],
  },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const dropRef = useRef(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); setHovered(null); }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false);
        setHovered(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isOnTool = location.pathname.startsWith('/tools');

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">MianPix</Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'nav-link active-link' : 'nav-link'}>
              Home
            </Link>
          </li>

          {/* Mega dropdown */}
          <li className="nav-dropdown" ref={dropRef}>
            <button
              className={`nav-dropdown-trigger ${open || isOnTool ? 'open' : ''}`}
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-haspopup="true"
            >
              <span>Tools</span>
              <FaChevronDown className="nav-chevron" />
            </button>

            {open && (
              <div className="nav-mega-menu" role="menu">
                {/* Header */}
                <div className="mega-header">
                  <span className="mega-title">Image Tools</span>
                  <Link to="/" className="mega-view-all" onClick={() => setOpen(false)}>
                    View all <FaArrowRight />
                  </Link>
                </div>

                {/* Groups */}
                <div className="mega-groups">
                  {TOOL_GROUPS.map((g) => (
                    <div key={g.group} className="mega-group">
                      <p className="mega-group-label">{g.group}</p>
                      {g.tools.map((t) => {
                        const isActive = location.pathname === t.path;
                        return (
                          <Link
                            key={t.path}
                            to={t.path}
                            className={`mega-tool-item ${isActive ? 'active' : ''} ${hovered === t.path ? 'hovered' : ''}`}
                            onMouseEnter={() => setHovered(t.path)}
                            onMouseLeave={() => setHovered(null)}
                            role="menuitem"
                          >
                            <span
                              className="mega-tool-icon"
                              style={{ '--tool-color': t.color }}
                            >
                              {t.icon}
                            </span>
                            <span className="mega-tool-text">
                              <span className="mega-tool-label">{t.label}</span>
                              <span className="mega-tool-desc">{t.desc}</span>
                            </span>
                            <FaArrowRight className="mega-tool-arrow" />
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Footer strip */}
                <div className="mega-footer">
                  <span>🔒 All tools run in your browser — 100% private</span>
                </div>
              </div>
            )}
          </li>

          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'nav-link active-link' : 'nav-link'}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === '/contact' ? 'nav-link active-link' : 'nav-link'}>
              Contact
            </Link>
          </li>
        </ul>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <span>{theme === 'light' ? <FaSun /> : <FaMoon />}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
