import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { pageVariants } from '../animations/pageVariants';
import { useTheme } from '../context/ThemeContext';
import './ToolPage.css';

/**
 * Shared wrapper for every tool page.
 * Props:
 *   icon        – emoji or react-icon element
 *   title       – tool name
 *   description – one-line description
 *   children    – function(imageSrc, reset) → JSX  (render prop)
 *   noUpload    – skip upload step (for tools that don't need it)
 */
const ToolPage = ({ icon, title, description, children, noUpload = false }) => {
  const { theme } = useTheme();
  const [imageSrc, setImageSrc] = useState(null);
  const [urlInput, setUrlInput] = useState('');

  const onDrop = (files) => {
    if (!files.length) return;
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target.result);
    reader.readAsDataURL(files[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    multiple: false,
  });

  const handleUrlLoad = () => {
    if (urlInput.trim()) { setImageSrc(urlInput.trim()); setUrlInput(''); }
  };

  const reset = () => setImageSrc(null);

  return (
    <motion.div
      className={`tool-page-wrap ${theme}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <div className="tp-header">
        <Link to="/" className="tp-back">
          <FaArrowLeft /> All Tools
        </Link>
        <div className="tp-title-row">
          <span className="tp-icon">{icon}</span>
          <div>
            <h1 className="tp-title">{title}</h1>
            <p className="tp-desc">{description}</p>
          </div>
        </div>
      </div>

      {/* Upload (unless noUpload) */}
      {!noUpload && !imageSrc && (
        <motion.div
          className="tp-upload"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div {...getRootProps()} className={`tp-dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            <FaUpload className="tp-upload-icon" />
            <p>Drag & drop an image, or click to select</p>
            <span>PNG · JPG · WEBP · GIF</span>
          </div>
          <div className="tp-url-row">
            <input
              type="text"
              placeholder="Or paste image URL…"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleUrlLoad()}
            />
            <button onClick={handleUrlLoad}>Load</button>
          </div>
        </motion.div>
      )}

      {/* Tool content */}
      {(noUpload || imageSrc) && (
        <motion.div
          className="tp-content"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {children(imageSrc, reset)}
          {!noUpload && (
            <div className="tp-reset-row">
              <button className="tp-reset-btn" onClick={reset}>
                ↩ Upload New Image
              </button>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ToolPage;
