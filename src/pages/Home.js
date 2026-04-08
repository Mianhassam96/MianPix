import { Link } from 'react-router-dom';
import {
  FaImage, FaCompress, FaCrop, FaDownload,
  FaUserCircle, FaEraser, FaLock, FaBolt,
  FaHeart, FaArrowRight, FaEyeDropper, FaCode,
  FaGlobe, FaPalette
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { pageVariants } from '../animations/pageVariants';
import { useTheme } from '../context/ThemeContext';
import './Home.css';

const Home = () => {
  const { theme } = useTheme();

  const features = [
    { icon: <FaCrop />,        title: 'Crop & Resize',         desc: 'Precisely crop and resize to any dimension', color: '#3b82f6' },
    { icon: <FaCompress />,    title: 'Smart Optimizer',       desc: 'Compress + convert to WebP with size savings', color: '#10b981' },
    { icon: <FaUserCircle />,  title: 'Avatar Creator',        desc: 'Create profile pictures with custom backgrounds', color: '#8b5cf6' },
    { icon: <FaEraser />,      title: 'Remove Background',     desc: 'AI-powered one-click background removal', color: '#ef4444' },
    { icon: <FaImage />,       title: 'Thumbnail Generator',   desc: 'YouTube, blog, social thumbnails in one click', color: '#f59e0b' },
    { icon: <FaEyeDropper />,  title: 'Color Palette',         desc: 'Extract colors & gradients from any image', color: '#06b6d4' },
    { icon: <FaCode />,        title: 'Favicon Generator',     desc: 'All favicon sizes + HTML snippet for devs', color: '#ec4899' },
    { icon: <FaGlobe />,       title: 'Live Website Preview',  desc: 'See your image in blog, hero & OG card mockups', color: '#14b8a6' },
    { icon: <FaPalette />,     title: 'Multiple Formats',      desc: 'Export PNG, JPG, WEBP instantly', color: '#a855f7' },
    { icon: <FaDownload />,    title: 'Quick Download',        desc: 'Download or share with a single click', color: '#64748b' },
  ];

  const benefits = [
    {
      icon: <FaLock />,
      title: 'Privacy First',
      desc: 'All processing happens in your browser. Your images never leave your device.'
    },
    {
      icon: <FaBolt />,
      title: 'Lightning Fast',
      desc: 'No uploads, no waiting. Edit images instantly with client-side processing.'
    },
    {
      icon: <FaHeart />,
      title: 'Completely Free',
      desc: 'No subscriptions, no hidden fees. Professional tools, absolutely free.'
    }
  ];

  return (
    <motion.div
      className={`home-page ${theme}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaBolt /> Image Tools for Developers & Creators
            </motion.div>

            <h1 className="hero-title">
              MianPix — More Than
              <span className="gradient-text"> an Image Editor</span>
            </h1>

            <p className="hero-subtitle">
              Thumbnail generator, favicon creator, color palette extractor, live website preview,
              smart optimizer & more — all in your browser. Free, fast, private.
            </p>

            <div className="hero-buttons">
              <Link to="/tool" className="btn btn-primary">
                Open Tools <FaArrowRight />
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">8</span>
                <span className="stat-label">Tools</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Free</span>
              </div>
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Uploads</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="visual-card">
              <div className="visual-icon"><FaImage /></div>
              <div className="visual-features">
                <div className="visual-feature">✓ Thumbnail Generator</div>
                <div className="visual-feature">✓ Favicon Creator</div>
                <div className="visual-feature">✓ Color Palette</div>
                <div className="visual-feature">✓ Live Preview</div>
                <div className="visual-feature">✓ Smart Optimizer</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">10 Powerful Tools</h2>
            <p className="section-subtitle">
              Everything developers & creators need — in one place
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Why Choose MianPix?</h2>
            <p className="section-subtitle">Built with your privacy and convenience in mind</p>
          </motion.div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-desc">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Ready to Use All 8 Tools?</h2>
          <p className="cta-subtitle">
            No sign-up. No uploads. Completely free. Built for developers & creators.
          </p>
          <Link to="/tool" className="btn btn-cta">
            Open MianPix Tools <FaArrowRight />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
