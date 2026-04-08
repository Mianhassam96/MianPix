import { Link } from 'react-router-dom';
import { 
  FaImage, 
  FaCompress, 
  FaCrop, 
  FaDownload, 
  FaUserCircle, 
  FaEraser,
  FaLock,
  FaBolt,
  FaHeart,
  FaArrowRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { pageVariants } from '../animations/pageVariants';
import { useTheme } from '../context/ThemeContext';
import './Home.css';

const Home = () => {
  const { theme } = useTheme();

  const features = [
    { 
      icon: <FaCrop />, 
      title: 'Crop & Resize', 
      desc: 'Precisely crop and resize images to any dimension with ease',
      color: '#3b82f6'
    },
    { 
      icon: <FaCompress />, 
      title: 'Compress', 
      desc: 'Reduce file size while maintaining excellent quality',
      color: '#10b981'
    },
    { 
      icon: <FaUserCircle />, 
      title: 'Avatar Creator', 
      desc: 'Create stunning profile pictures with custom backgrounds',
      color: '#8b5cf6'
    },
    { 
      icon: <FaEraser />, 
      title: 'Remove Background', 
      desc: 'AI-powered one-click background removal',
      color: '#ef4444'
    },
    { 
      icon: <FaImage />, 
      title: 'Multiple Formats', 
      desc: 'Export to PNG, JPG, or WEBP formats instantly',
      color: '#f59e0b'
    },
    { 
      icon: <FaDownload />, 
      title: 'Quick Download', 
      desc: 'Download your edited images with a single click',
      color: '#06b6d4'
    }
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
              <FaBolt /> New: AI Background Removal
            </motion.div>
            
            <h1 className="hero-title">
              Professional Image Editing
              <span className="gradient-text"> Made Simple</span>
            </h1>
            
            <p className="hero-subtitle">
              Edit, resize, crop, compress, create avatars, and remove backgrounds — 
              all in your browser. Fast, free, and privacy-focused.
            </p>
            
            <div className="hero-buttons">
              <Link to="/tool" className="btn btn-primary">
                Start Editing <FaArrowRight />
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Free</span>
              </div>
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Uploads</span>
              </div>
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Privacy</span>
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
              <div className="visual-icon">
                <FaImage />
              </div>
              <div className="visual-features">
                <div className="visual-feature">✓ Crop & Resize</div>
                <div className="visual-feature">✓ Avatar Creator</div>
                <div className="visual-feature">✓ Remove Background</div>
                <div className="visual-feature">✓ Compress</div>
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
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">
              Everything you need to edit images professionally
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
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
            <p className="section-subtitle">
              Built with your privacy and convenience in mind
            </p>
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
          <h2 className="cta-title">Ready to Edit Your Images?</h2>
          <p className="cta-subtitle">
            Start editing now. No sign-up required. Completely free.
          </p>
          <Link to="/tool" className="btn btn-cta">
            Get Started Now <FaArrowRight />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
