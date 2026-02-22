import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaGithub, 
  FaCrop, 
  FaCompressArrowsAlt, 
  FaRedo,
  FaUserCircle,
  FaEraser,
  FaPalette
} from 'react-icons/fa';
import { pageVariants } from '../animations/pageVariants';
import './About.css';

const About = () => {
  const features = [
    { icon: <FaCrop />, title: 'Crop & Resize', desc: 'Precisely crop and resize images to any dimension' },
    { icon: <FaCompressArrowsAlt />, title: 'Compress', desc: 'Reduce file size while maintaining quality' },
    { icon: <FaRedo />, title: 'Rotate & Flip', desc: 'Transform images with rotation and flip tools' },
    { icon: <FaUserCircle />, title: 'Avatar Creator', desc: 'Create perfect profile pictures with custom backgrounds' },
    { icon: <FaEraser />, title: 'Remove Background', desc: 'One-click background removal with AI' },
    { icon: <FaPalette />, title: 'Custom Styling', desc: 'Add gradients, borders, and colors to your avatars' }
  ];

  const techStack = [
    'React 18',
    'Framer Motion',
    'React Router',
    'React Image Crop',
    'Pica',
    'Background Removal AI',
    'React Toastify',
    'React Icons'
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
        <motion.section
          className="about-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>About MianPix</h1>
          <p className="about-tagline">
            A fast, free, and privacy-focused online image editor built with modern web technologies.
          </p>
        </motion.section>

        <motion.section
          className="about-mission"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Our Mission</h2>
          <p>
            MianPix was created to provide a simple, powerful, and completely free image editing experience 
            that respects your privacy. All image processing happens directly in your browser—no uploads, 
            no servers, no tracking. Just you and your images.
          </p>
        </motion.section>

        <motion.section
          className="features-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2>Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="tech-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="tech-badge"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <FaReact className="tech-icon" />
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="privacy-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2>Privacy First</h2>
          <p>
            Your images never leave your device. All editing operations are performed locally in your 
            browser using JavaScript and Canvas API. We don't store, analyze, or transmit your images 
            to any server. What happens in your browser, stays in your browser.
          </p>
        </motion.section>

        <motion.section
          className="github-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2>Open Source</h2>
          <p>MianPix is open source and available on GitHub. Contributions are welcome!</p>
          <a
            href="https://github.com/Mianhassam96/MianPix"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <FaGithub /> View on GitHub
          </a>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;