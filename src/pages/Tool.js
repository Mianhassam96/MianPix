import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEdit, FaUserCircle, FaEraser, FaEyeDropper,
  FaCode, FaImage, FaBolt, FaGlobe
} from 'react-icons/fa';
import { pageVariants } from '../animations/pageVariants';
import { useTheme } from '../context/ThemeContext';
import ImageUpload from '../components/ImageUpload';
import ImageEditor from '../components/ImageEditor';
import AvatarCreator from '../components/AvatarCreator';
import BackgroundRemover from '../components/BackgroundRemover';
import BeforeAfter from '../components/BeforeAfter';
import ColorPalette from '../components/ColorPalette';
import FaviconGenerator from '../components/FaviconGenerator';
import ThumbnailGenerator from '../components/ThumbnailGenerator';
import SmartOptimizer from '../components/SmartOptimizer';
import LivePreview from '../components/LivePreview';
import './Tool.css';

const tabs = [
  { id: 'editor',     label: 'Image Editor',     icon: <FaEdit /> },
  { id: 'avatar',     label: 'Avatar Creator',    icon: <FaUserCircle /> },
  { id: 'background', label: 'Remove BG',         icon: <FaEraser /> },
  { id: 'optimizer',  label: 'Smart Optimizer',   icon: <FaBolt /> },
  { id: 'thumbnail',  label: 'Thumbnail',         icon: <FaImage /> },
  { id: 'palette',    label: 'Color Palette',     icon: <FaEyeDropper /> },
  { id: 'favicon',    label: 'Favicon',           icon: <FaCode /> },
  { id: 'preview',    label: 'Live Preview',      icon: <FaGlobe /> },
];

const Tool = () => {
  const { theme } = useTheme();
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

  return (
    <motion.div
      className={`tool-page ${theme}`}
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
            <h1 className="tool-title">Image Tools for Developers & Creators</h1>
            <p className="tool-desc">
              Upload your image to access 8 powerful tools — optimizer, thumbnails, favicon generator, color palette, live preview & more.
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
                    onImageProcessed={setProcessedImage}
                  />
                  {processedImage && (
                    <BeforeAfter beforeImage={imageSrc} afterImage={processedImage} />
                  )}
                </>
              )}
              {activeTab === 'optimizer' && (
                <SmartOptimizer imageSrc={imageSrc} />
              )}
              {activeTab === 'thumbnail' && (
                <ThumbnailGenerator imageSrc={imageSrc} />
              )}
              {activeTab === 'palette' && (
                <ColorPalette imageSrc={imageSrc} />
              )}
              {activeTab === 'favicon' && (
                <FaviconGenerator imageSrc={imageSrc} />
              )}
              {activeTab === 'preview' && (
                <LivePreview imageSrc={imageSrc} />
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
