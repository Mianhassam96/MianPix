import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ToolPage from '../components/ToolPage';
import { canvasToBlob, formatBytes, dataUrlSize } from '../utils/imageUtils';
import './tools.css';

const Compressor = () => (
  <ToolPage icon="🗜️" title="Image Compressor" description="Adjust quality slider — see compressed size update instantly. One-click download.">
    {(imageSrc, previewSrc) => <CompressorTool imageSrc={imageSrc} previewSrc={previewSrc} />}
  </ToolPage>
);

const CompressorTool = ({ imageSrc, previewSrc }) => {
  const [quality, setQuality] = useState(0.75);
  const [liveSize, setLiveSize] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const imgRef = useRef(null);
  const origSize = dataUrlSize(imageSrc);

  // Estimate compressed size live from preview
  const estimateLive = useCallback(async () => {
    const img = imgRef.current;
    if (!img?.complete) return;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, 'jpg', quality);
    setLiveSize(blob.size);
  }, [quality]);

  useEffect(() => { estimateLive(); }, [estimateLive]);

  const compress = async () => {
    setProcessing(true);
    try {
      const img = imgRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, 'jpg', quality);
      const saving = Math.max(0, Math.round((1 - blob.size / origSize) * 100));
      setResult({ url: URL.createObjectURL(blob), size: blob.size, saving });
      toast.success(`Compressed! Saved ~${saving}%`);
    } catch { toast.error('Compression failed.'); }
    finally { setProcessing(false); }
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = result.url;
    a.download = 'mianpix-compressed.jpg';
    a.click();
    toast.success('Downloaded!');
  };

  const saving = liveSize ? Math.max(0, Math.round((1 - liveSize / origSize) * 100)) : 0;

  return (
    <div className="tool-inner">
      <img ref={imgRef} src={imageSrc} alt="" style={{ display: 'none' }} onLoad={estimateLive} />

      <div className="tool-preview-row">
        <img src={previewSrc || imageSrc} alt="original" className="tool-preview-img" />
      </div>

      {/* Live size display */}
      <div className="live-size-bar">
        <div className="lsb-item">
          <span>Original</span>
          <strong>{formatBytes(origSize)}</strong>
        </div>
        <div className="lsb-arrow">→</div>
        <div className="lsb-item compressed">
          <span>Estimated</span>
          <strong>{liveSize ? formatBytes(liveSize) : '—'}</strong>
        </div>
        <div className={`lsb-item saving ${saving > 0 ? 'positive' : ''}`}>
          <span>Saving</span>
          <strong>{saving > 0 ? `~${saving}%` : '—'}</strong>
        </div>
      </div>

      <div className="tool-controls">
        <label className="ctrl-label">
          Quality: <strong>{Math.round(quality * 100)}%</strong>
          <input type="range" min="0.1" max="1" step="0.05" value={quality}
            onChange={e => setQuality(parseFloat(e.target.value))} />
        </label>
        <button className="tool-action-btn" onClick={compress} disabled={processing}>
          {processing ? 'Compressing…' : '⚡ Compress & Download'}
        </button>
      </div>

      {result && (
        <motion.div className="tool-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="size-compare">
            <div className="size-box"><span>Original</span><strong>{formatBytes(origSize)}</strong></div>
            <div className="size-arrow">→</div>
            <div className="size-box compressed"><span>Compressed</span><strong>{formatBytes(result.size)}</strong></div>
            <div className="size-box saved"><span>Saved</span><strong>{result.saving}%</strong></div>
          </div>
          <button className="tool-download-btn" onClick={download}>
            <FaDownload /> Download JPG
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Compressor;
