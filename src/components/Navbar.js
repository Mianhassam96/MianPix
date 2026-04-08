import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const TOOL_GROUPS = [
  {
    group: 'Background',
    tools: [
      { path: '/tools/remove-bg', icon: '🧹', label: 'Remove Background', desc: 'AI-powered removal',   color: '#ef4444' },
      { path: '/tools/bg-blur',   icon: '🌫️', label: 'Background Blur',   desc: 'Portrait-mode blur',  color: '#8b5cf6' },
    ],
  },
  {
    group: 'Resize & Convert',
    tools: [
      { path: '/tools/resize',    icon: '📐', label: 'Smart Resize',      desc: 'Social media presets', color: '#3b82f6' },
      { path: '/tools/convert',   icon: '🔄', label: 'Format Converter',  desc: 'PNG ↔ JPG ↔ WEBP',    color: '#06b6d4' },
    ],
  },
  {
    group: 'Optimize',
    tools: [
      { path: '/tools/compress',  icon: '🗜️', label: 'Image Compressor', desc: 'Reduce file size',     color: '#10b981' },
      { path: '/tools/optimizer', icon: '⚡', label: 'Web Optimizer',    desc: 'WebP + compress',      color: '#f97316' },
    ],
  },
  {
    group: 'Create',
    tools: [
      { path: '/tools/thumbnail', icon: '🖼️', label: 'Thumbnail Maker',  desc: 'YouTube & blog',       color: '#f59e0b' },
      { path: '/tools/profile',   icon: '👤', label: 'Profile Picture',  desc: 'Circle crop & style',  color: '#ec4899' },
    ],
  },
  {
    group: 'Extract & Generate',
    tools: [
      { path: '/tools/palette',   icon: '🎨', label: 'Color Palette',    desc: 'Extract hex codes',    color: '#a855f7' },
      { path: '/tools/favicon',   icon: '🔖', label: 'Favicon Generator',desc: 'All sizes + ZIP',      color: '#14b8a6' },
    ],
  },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);
  const closeTimerRef = useRef(null);
  const location = useLocation();

  // Close on route change
  useEffect(() => { setOpen(false); }, [location]);

  // Close on outside click (for mobile tap-outside)
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Detect touch device — use click on touch, hover on pointer
  const isTouchDevice = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice()) return;
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice()) return;
    // Small delay so user can move mouse from trigger to menu without it closing
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const handleTriggerClick = useCallback(() => {
    // On touch devices, toggle on click
    if (isTouchDevice()) setOpen(o => !o);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); }, []);

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

          {/* Mega dropdown — hover on desktop, click on touch */}
          <li
            className="nav-dropdown"
            ref={dropRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`nav-dropdown-trigger ${open || isOnTool ? 'open' : ''}`}
              onClick={handleTriggerClick}
              aria-expanded={open}
              aria-haspopup="true"
            >
              <span>Tools</span>
              <FaChevronDown className="nav-chevron" />
            </button>

            {open && (
              <div className="nav-mega-menu" role="menu">
                <div className="mega-header">
                  <span className="mega-title">Image Tools</span>
                  <Link to="/" className="mega-view-all" onClick={() => setOpen(false)}>
                    View all <FaArrowRight />
                  </Link>
                </div>

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
                            className={`mega-tool-item ${isActive ? 'active' : ''}`}
                            role="menuitem"
                          >
                            <span className="mega-tool-icon" style={{ '--tool-color': t.color }}>
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
