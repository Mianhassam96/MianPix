import React, { useState, useRef, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ToolPage from '../components/ToolPage';
import './tools.css';

const BgBlur = () => (
  <ToolPage icon="🌫️" title="Background Blur" description="Apply a soft portrait-mode blur to your image background.">
    {(imageSrc) => <BgBlurTool imageSrc={imageSrc} />}
  </ToolPage>
);

const BgBlurTool = ({ imageSrc }) => {
  const [blur, setBlur] = useState(8);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => { if (imageSrc) apply(); }, []); // eslint-disable-line

  const apply = () => {
    const img = imgRef.current;
    if (!img || !img.complete) return;
    const canvas = canvasRef.current;
    const w = img.naturalWidth, h = img.naturalHeight;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Draw blurred full image
    ctx.filter = `blur(${blur}px)`;
    ctx.drawImage(img, 0, 0, w, h);
    ctx.filter = 'none';

    // Draw sharp center ellipse (portrait focus)
    const cx = w / 2, cy = h / 2;
    const rx = w * 0.35, ry = h * 0.45;
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();

    setResult(canvas.toDataURL('image/jpeg', 0.92));
    toast.success('Blur applied!');
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = result;
    a.download = `mianpix-blur-${Date.now()}.jpg`;
    a.click();
  };

  return (
    <div className="tool-inner">
      <img ref={imgRef} src={imageSrc} alt="" style={{ display: 'none' }} onLoad={apply} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="tool-controls">
        <label className="ctrl-label">
          Blur Intensity: <strong>{blur}px</strong>
          <input type="range" min="1" max="30" value={blur}
            onChange={e => setBlur(parseInt(e.target.value))} />
        </label>
        <button className="tool-action-btn" onClick={apply}>⚡ Apply Blur</button>
      </div>

      {result && (
        <motion.div className="tool-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="before-after-simple">
            <div>
              <p className="ba-label">Before</p>
              <img src={imageSrc} alt="before" className="tool-result-img" />
            </div>
            <div>
              <p className="ba-label">After</p>
              <img src={result} alt="after" className="tool-result-img" />
            </div>
          </div>
          <button className="tool-download-btn" onClick={download}>
            <FaDownload /> Download
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BgBlur;
