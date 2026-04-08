import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUpload, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { pageVariants } from '../animations/pageVariants';
import { useTheme } from '../context/ThemeContext';
import { MAX_FILE_SIZE, makePreview, formatBytes } from '../utils/imageUtils';
import './ToolPage.css';

const ToolPage = ({ icon, title, description, children, noUpload = false }) => {
  const { theme } = useTheme();
  const [imageSrc, setImageSrc] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null); // low-res for instant display
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');
  const [fileInfo, setFileInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const processFile = useCallback(async (file) => {
    setError('');
    if (file.size > MAX_FILE_SIZE) {
      setError(`File too large (${formatBytes(file.size)}). Max 5 MB.`);
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const full = e.target.result;
      const preview = await makePreview(full, 600);
      setPreviewSrc(preview);
      setImageSrc(full);
      setFileInfo({ name: file.name, size: formatBytes(file.size), type: file.type });
      setLoading(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected.length) { setError('Unsupported file type.'); return; }
    if (accepted.length) processFile(accepted[0]);
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    multiple: false,
    maxSize: MAX_FILE_SIZE,
  });

  const handleUrlLoad = () => {
    const url = urlInput.trim();
    if (!url) return;
    setError('');
    setImageSrc(url);
    setPreviewSrc(url);
    setFileInfo({ name: 'URL image', size: '—', type: 'image/*' });
    setUrlInput('');
  };

  const reset = () => {
    setImageSrc(null);
    setPreviewSrc(null);
    setFileInfo(null);
    setError('');
  };

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
        <Link to="/" className="tp-back"><FaArrowLeft /> All Tools</Link>
        <div className="tp-title-row">
          <span className="tp-icon">{icon}</span>
          <div>
            <h1 className="tp-title">{title}</h1>
            <p className="tp-desc">{description}</p>
          </div>
        </div>
      </div>

      {/* Upload */}
      <AnimatePresence mode="wait">
        {!noUpload && !imageSrc && (
          <motion.div
            key="upload"
            className="tp-upload"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <div {...getRootProps()} className={`tp-dropzone ${isDragActive ? 'active' : ''} ${loading ? 'loading' : ''}`}>
              <input {...getInputProps()} />
              {loading
                ? <div className="tp-spinner" />
                : <FaUpload className="tp-upload-icon" />
              }
              <p>{loading ? 'Loading image…' : isDragActive ? 'Drop it here!' : 'Drag & drop an image, or click to select'}</p>
              <span>PNG · JPG · WEBP · GIF · Max 5 MB</span>
            </div>

            {error && (
              <motion.div className="tp-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FaTimesCircle /> {error}
              </motion.div>
            )}

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
            key="content"
            className="tp-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {/* File info bar */}
            {fileInfo && (
              <div className="tp-file-info">
                <FaCheckCircle className="tp-file-ok" />
                <span className="tp-file-name">{fileInfo.name}</span>
                <span className="tp-file-size">{fileInfo.size}</span>
                <button className="tp-file-reset" onClick={reset} title="Remove image">✕</button>
              </div>
            )}

            {children(imageSrc, previewSrc, reset)}

            {!noUpload && (
              <div className="tp-reset-row">
                <button className="tp-reset-btn" onClick={reset}>↩ Upload New Image</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToolPage;
