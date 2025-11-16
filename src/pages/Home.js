import React from 'react';
import { Link } from 'react-router-dom';
import { FaImage, FaCompress, FaCrop, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { pageVariants } from '../animations/pageVariants';
import './Home.css';

const Home = () => {
  return (
    <motion.div
      className="home-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            MianPix - Simple Image Editor
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Edit, resize, crop, and compress your images online — fast and free
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link to="/tool" className="cta-button">
              Start Editing
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="mockup-placeholder">
            <FaImage size={140} />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features">
        <motion.h2
          className="features-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Features
        </motion.h2>
        <div className="features-grid">
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaCrop size={40} />
            <h3>Crop & Resize</h3>
            <p>Easily crop and resize your images to any dimension</p>
          </motion.div>
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FaCompress size={40} />
            <h3>Compress</h3>
            <p>Reduce file size while maintaining quality</p>
          </motion.div>
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <FaImage size={40} />
            <h3>Multiple Formats</h3>
            <p>Export to PNG, JPG, or WEBP formats</p>
          </motion.div>
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <FaDownload size={40} />
            <h3>Quick Download</h3>
            <p>Download your edited images instantly</p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
