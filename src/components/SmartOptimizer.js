import React, { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FaDownload, FaBolt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { resizeImage, canvasToBlob, formatBytes, dataUrlSize } from '../utils/imageUtils';
import './SmartOptimizer.css';

const SmartOptimizer = ({ imageSrc }) => {
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState('webp');
  const [maxWidth, setMaxWidth] = useState(1920);
  const [liveSize, setLiveSize] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const imgRef = useRef(null);
  const origSize = dataUrlSize(imageSrc);

  const estimateLive = useCallback(async () => {
    const img = imgRef.current;
    if (!img?.complete) return;
    const tw = Math.min(img.naturalWidth, maxWidth);
    const th = Math.round(img.naturalHeight * (tw / img.naturalWidth));
    const canvas = document.createElement('canvas');
    canvas.width = tw; canvas.height = th;
    canvas.getContext('2d').drawImage(img, 0, 0, tw, th);
    const blob = await canvasToBlob(canvas, format, quality);
    setLiveSize(blob.size);
  }, [quality, format, maxWidth]);

  useEffect(() => { estimateLive(); }, [estimateLive]);

  const optimize = async () => {
    if (!imageSrc) { toast.error('Upload an image first'); return; }
    setProcessing(true);
    try {
      const img = imgRef.current;
      if (!img) throw new Error('Image not loaded');
      const targetW = Math.min(img.naturalWidth, maxWidth);
      const targetH = Math.round(img.naturalHeight * (targetW / img.naturalWidth));
      const canvas = await resizeImage(img, targetW, targetH);
      if (!canvas) throw new Error('Resize failed');
      const blob = await canvasToBlob(canvas, format, quality);
      const url = URL.createObjectURL(blob);
      const saving = origSize > 0 ? Math.round((1 - blob.size / origSize) * 100) : 0;
      setResult({ url, size: blob.size, originalSize: origSize, saving, w: targetW, h: targetH, format });
      toast.success(`Optimized! Saved ${saving}%`);
    } catch { toast.error('Optimization failed. Try again.'); }
    finally { setProcessing(false); }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `mianpix-optimized.${result.format}`;
    a.click();
    toast.success('Optimized image downloaded!');
  };

  return (
    <motion.div className="smart-optimizer" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <img ref={imgRef} src={imageSrc} alt="" style={{ display: 'none' }} crossOrigin="anonymous" onLoad={estimateLive} />

      <div className="optimizer-header">
        <h3><FaBolt /> Smart Image Optimizer</h3>
        <p>Compress, convert to WebP, and resize — sliders update size estimate instantly</p>
      </div>

      {/* Live size estimate */}
      {liveSize !== null && (
        <div className="opt-live-bar">
          <span>Original: <strong>{formatBytes(origSize)}</strong></span>
          <span className="opt-arrow">→</span>
          <span>Estimated: <strong>{formatBytes(liveSize)}</strong></span>
          <span className="opt-saving">
            ~{Math.max(0, Math.round((1 - liveSize / origSize) * 100))}% saved
          </span>
        </div>
      )}

      <div className="optimizer-controls">
        <div className="opt-control">
          <label>Output Format</label>
          <div className="format-btns">
            {['webp', 'jpg', 'png'].map(f => (
              <button key={f} className={format === f ? 'active' : ''} onClick={() => setFormat(f)}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="opt-control">
          <label>Quality: {Math.round(quality * 100)}%</label>
          <input type="range" min="0.1" max="1" step="0.05" value={quality}
            onChange={e => setQuality(parseFloat(e.target.value))} />
        </div>

        <div className="opt-control">
          <label>Max Width: {maxWidth}px</label>
          <input type="range" min="400" max="3840" step="80" value={maxWidth}
            onChange={e => setMaxWidth(parseInt(e.target.value))} />
        </div>
      </div>

      <button className="optimize-btn" onClick={optimize} disabled={processing || !imageSrc}>
        {processing ? 'Optimizing...' : '⚡ Optimize & Download'}
      </button>

      {result && (
        <motion.div className="optimizer-result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="result-stats">
            <div className="stat-box">
              <span className="stat-label">Original</span>
              <span className="stat-value">{formatBytes(result.originalSize)}</span>
            </div>
            <div className="stat-arrow">→</div>
            <div className="stat-box optimized">
              <span className="stat-label">Optimized</span>
              <span className="stat-value">{formatBytes(result.size)}</span>
            </div>
            <div className="stat-box saving">
              <span className="stat-label">Saved</span>
              <span className="stat-value">{result.saving}%</span>
            </div>
          </div>

          <div className="result-meta">
            {result.w}×{result.h}px · {result.format.toUpperCase()}
          </div>

          <div className="before-after-sizes">
            <div className="ba-bar">
              <div className="ba-fill original" style={{ width: '100%' }}>
                Original
              </div>
            </div>
            <div className="ba-bar">
              <div
                className="ba-fill optimized"
                style={{ width: `${Math.max(5, 100 - result.saving)}%` }}
              >
                Optimized
              </div>
            </div>
          </div>

          <button className="opt-download-btn" onClick={download}>
            <FaDownload /> Download .{result.format}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SmartOptimizer;
