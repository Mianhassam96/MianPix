import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTools, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './NotFound.css';

const NotFound = () => {
  return (
    <motion.div
      className="not-found"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="not-found-container">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <FaExclamationTriangle className="error-icon" size={120} />
        </motion.div>

        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist.</p>

        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            <FaHome /> Go Home
          </Link>
          <Link to="/tool" className="btn btn-secondary">
            <FaTools /> Try Editor
          </Link>
        </div>

        <div className="suggestions">
          <h3>Quick Links:</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tool">Image Editor</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;
