import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaUserCircle, FaEraser } from 'react-icons/fa';
import { pageVariants } from '../animations/pageVariants';
import ImageUpload from '../components/ImageUpload';
import ImageEditor from '../components/ImageEditor';
import AvatarCreator from '../components/AvatarCreator';
import BackgroundRemover from '../components/BackgroundRemover';
import BeforeAfter from '../components/BeforeAfter';
import './Tool.css';

const Tool = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [activeTab, setActiveTab] = useState('editor');
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageLoad = (src) => {
    setImageSrc(src);
    setProcessedImage(null);
  };

  const handleReset = () => {
    setImageSrc(null);
    setActiveTab('editor');
    setProcessedImage(null);
  };

  const handleImageProcessed = (processedSrc) => {
    setProcessedImage(processedSrc);
  };

  const tabs = [
    { id: 'editor', label: 'Image Editor', icon: <FaEdit /> },
    { id: 'avatar', label: 'Avatar Creator', icon: <FaUserCircle /> },
    { id: 'background', label: 'Remove Background', icon: <FaEraser /> }
  ];

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
            <div className="tool-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="tool-content">
              {activeTab === 'editor' && (
                <ImageEditor imageSrc={imageSrc} onReset={handleReset} />
              )}
              {activeTab === 'avatar' && (
                <AvatarCreator imageSrc={imageSrc} />
              )}
              {activeTab === 'background' && (
                <>
                  <BackgroundRemover 
                    image={imageSrc} 
                    onImageProcessed={handleImageProcessed}
                  />
                  {processedImage && (
                    <BeforeAfter beforeImage={imageSrc} afterImage={processedImage} />
                  )}
                </>
              )}
            </div>

            <div className="reset-section">
              <button className="reset-all-btn" onClick={handleReset}>
                Upload New Image
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Tool;
