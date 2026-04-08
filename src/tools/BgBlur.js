import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ToolPage from '../components/ToolPage';
import './tools.css';

const BgBlur = () => (
  <ToolPage icon="🌫️" title="Background Blur" description="Portrait-mode blur — sharp center, soft background. Slider updates preview instantly.">
    {(imageSrc, previewSrc) => <BgBlurTool imageSrc={imageSrc} previewSrc={previewSrc} />}
  </ToolPage>
);

const BgBlurTool = ({ imageSrc, previewSrc }) => {
  const [blur, setBlur] = useState(8);
  const [livePreview, setLivePreview] = useState(null);
  const [fullResult, setFullResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const previewCanvasRef = useRef(null);
  const fullCanvasRef = useRef(null);
  const previewImgRef = useRef(null);
  const fullImgRef = useRef(null);

  // Apply blur to a canvas from an img element
  const applyBlur = useCallback((img, canvas, blurVal) => {
    if (!img?.complete || !canvas) return null;
    const w = img.naturalWidth, h = img.naturalHeight;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.filter = `blur(${blurVal}px)`;
    ctx.drawImage(img, 0, 0, w, h);
    ctx.filter = 'none';
    const cx = w / 2, cy = h / 2;
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, w * 0.35, h * 0.45, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();
    return canvas.toDataURL('image/jpeg', 0.82);
  }, []);

  // Live preview on slider change (uses low-res preview image)
  useEffect(() => {
    const img = previewImgRef.current;
    const canvas = previewCanvasRef.current;
    if (!img?.complete || !canvas) return;
    const result = applyBlur(img, canvas, blur);
    if (result) setLivePreview(result);
  }, [blur, applyBlur]);

  const handlePreviewLoad = () => {
    const result = applyBlur(previewImgRef.current, previewCanvasRef.current, blur);
    if (result) setLivePreview(result);
  };

  const applyFull = () => {
    setProcessing(true);
    const img = fullImgRef.current;
    if (!img?.complete) {
      img.onload = () => {
        const result = applyBlur(img, fullCanvasRef.current, blur);
        setFullResult(result);
        setProcessing(false);
        toast.success('Full-res blur applied!');
      };
    } else {
      const result = applyBlur(img, fullCanvasRef.current, blur);
      setFullResult(result);
      setProcessing(false);
      toast.success('Full-res blur applied!');
    }
  };

  const download = () => {
    const src = fullResult || livePreview;
    if (!src) return;
    const a = document.createElement('a');
    a.href = src;
    a.download = `mianpix-blur-${Date.now()}.jpg`;
    a.click();
    toast.success('Downloaded!');
  };

  return (
    <div className="tool-inner">
      {/* Hidden images */}
      <img ref={previewImgRef} src={previewSrc || imageSrc} alt="" style={{ display: 'none' }} onLoad={handlePreviewLoad} />
      <img ref={fullImgRef} src={imageSrc} alt="" style={{ display: 'none' }} />
      <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
      <canvas ref={fullCanvasRef} style={{ display: 'none' }} />

      {/* Live preview */}
      <div className="tool-preview-row">
        {livePreview
          ? <img src={livePreview} alt="blur preview" className="tool-preview-img" />
          : <img src={previewSrc || imageSrc} alt="original" className="tool-preview-img" />
        }
      </div>

      <div className="tool-controls">
        <label className="ctrl-label">
          Blur Intensity: <strong>{blur}px</strong>
          <input type="range" min="1" max="30" value={blur}
            onChange={e => setBlur(parseInt(e.target.value))} />
        </label>
        <p className="ctrl-hint">Preview updates live. Click below for full-resolution output.</p>
        <button className="tool-action-btn" onClick={applyFull} disabled={processing}>
          {processing ? 'Processing…' : '⚡ Apply Full Resolution'}
        </button>
      </div>

      {(fullResult || livePreview) && (
        <motion.div className="tool-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button className="tool-download-btn" onClick={download}>
            <FaDownload /> Download {fullResult ? 'Full-Res' : 'Preview'}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BgBlur;
