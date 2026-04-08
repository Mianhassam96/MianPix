import React, { useState, useRef } from 'react';
import { FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ToolPage from '../components/ToolPage';
import { canvasToBlob } from '../utils/imageUtils';
import './tools.css';

const Compressor = () => (
  <ToolPage icon="🗜️" title="Image Compressor" description="Reduce file size while keeping great quality. See before/after sizes instantly.">
    {(imageSrc) => <CompressorTool imageSrc={imageSrc} />}
  </ToolPage>
);

const CompressorTool = ({ imageSrc }) => {
  const [quality, setQuality] = useState(0.75);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const imgRef = useRef(null);

  const fmt = (b) => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(2)} MB`;

  const compress = async () => {
    setProcessing(true);
    try {
      const img = imgRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, 'jpg', quality);
      const origSize = Math.round((imageSrc.split(',')[1]?.length * 3) / 4) || blob.size * 2;
      const saving = Math.max(0, Math.round((1 - blob.size / origSize) * 100));
      setResult({ url: URL.createObjectURL(blob), size: blob.size, origSize, saving });
      toast.success(`Compressed! Saved ~${saving}%`);
    } catch { toast.error('Compression failed.'); }
    finally { setProcessing(false); }
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `mianpix-compressed.jpg`;
    a.click();
  };

  return (
    <div className="tool-inner">
      <img ref={imgRef} src={imageSrc} alt="" style={{ display: 'none' }} />
      <div className="tool-preview-row">
        <img src={imageSrc} alt="original" className="tool-preview-img" />
      </div>

      <div className="tool-controls">
        <label className="ctrl-label">
          Quality: <strong>{Math.round(quality * 100)}%</strong>
          <input type="range" min="0.1" max="1" step="0.05" value={quality}
            onChange={e => setQuality(parseFloat(e.target.value))} />
        </label>
        <button className="tool-action-btn" onClick={compress} disabled={processing}>
          {processing ? 'Compressing…' : '⚡ Compress Now'}
        </button>
      </div>

      {result && (
        <motion.div className="tool-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="size-compare">
            <div className="size-box">
              <span>Original</span>
              <strong>{fmt(result.origSize)}</strong>
            </div>
            <div className="size-arrow">→</div>
            <div className="size-box compressed">
              <span>Compressed</span>
              <strong>{fmt(result.size)}</strong>
            </div>
            <div className="size-box saved">
              <span>Saved</span>
              <strong>{result.saving}%</strong>
            </div>
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
