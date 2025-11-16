import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../animations/pageVariants';
import ImageUpload from '../components/ImageUpload';
import ImageEditor from '../components/ImageEditor';
import './Tool.css';

const Tool = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageLoad = (src) => {
    setImageSrc(src);
  };

  const handleReset = () => {
    setImageSrc(null);
  };

  return (
    <motion.div
      className="tool-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="tool-container">
        {!imageSrc ? (
          <motion.div
            className="upload-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="tool-title">Upload Your Image</h1>
            <p className="tool-desc">
              Choose an image from your device or paste an image URL to start editing instantly.
            </p>
            <ImageUpload onImageLoad={handleImageLoad} />
          </motion.div>
        ) : (
          <motion.div
            className="editor-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageEditor imageSrc={imageSrc} onReset={handleReset} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Tool;
