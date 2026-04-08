import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const TOOLS = [
  { path: '/tools/remove-bg',  icon: '🧹', label: 'Remove Background' },
  { path: '/tools/resize',     icon: '📐', label: 'Smart Resize'       },
  { path: '/tools/bg-blur',    icon: '🌫️', label: 'Background Blur'    },
  { path: '/tools/thumbnail',  icon: '🖼️', label: 'Thumbnail Maker'    },
  { path: '/tools/compress',   icon: '🗜️', label: 'Image Compressor'   },
  { path: '/tools/convert',    icon: '🔄', label: 'Format Converter'   },
  { path: '/tools/optimizer',  icon: '⚡', label: 'Web Optimizer'      },
  { path: '/tools/profile',    icon: '👤', label: 'Profile Picture'    },
  { path: '/tools/palette',    icon: '🎨', label: 'Color Palette'      },
  { path: '/tools/favicon',    icon: '🔖', label: 'Favicon Generator'  },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);
  const location = useLocation();

  // Close dropdown on route change
  useEffect(() => { setOpen(false); }, [location]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">MianPix</Link>

        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>

          {/* Tools dropdown */}
          <li className="nav-dropdown" ref={dropRef}>
            <button
              className={`nav-dropdown-trigger ${open || location.pathname.startsWith('/tools') ? 'open' : ''}`}
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
            >
              Tools <FaChevronDown className="nav-chevron" />
            </button>
            {open && (
              <div className="nav-dropdown-menu">
                <div className="nav-dropdown-header">All Tools</div>
                <div className="nav-dropdown-grid">
                  {TOOLS.map(t => (
                    <Link
                      key={t.path}
                      to={t.path}
                      className={`nav-tool-item ${location.pathname === t.path ? 'active' : ''}`}
                    >
                      <span className="nav-tool-icon">{t.icon}</span>
                      <span>{t.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <span>{theme === 'light' ? <FaSun /> : <FaMoon />}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
