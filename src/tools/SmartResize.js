import React, { useState, useRef } from 'react';
import { FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ToolPage from '../components/ToolPage';
import { resizeImage, canvasToBlob } from '../utils/imageUtils';
import './tools.css';

const PRESETS = [
  { label: 'Instagram Post',    w: 1080, h: 1080 },
  { label: 'Instagram Story',   w: 1080, h: 1920 },
  { label: 'YouTube Thumbnail', w: 1280, h: 720  },
  { label: 'Blog Image',        w: 1200, h: 630  },
  { label: 'LinkedIn Banner',   w: 1584, h: 396  },
  { label: 'Twitter Header',    w: 1500, h: 500  },
  { label: 'Facebook Cover',    w: 820,  h: 312  },
  { label: 'Website Hero',      w: 1920, h: 1080 },
  { label: 'Profile Photo',     w: 400,  h: 400  },
];

const SmartResize = () => (
  <ToolPage icon="📐" title="Smart Resize" description="Resize to any social media preset or custom size with auto-center crop.">
    {(imageSrc) => <SmartResizeTool imageSrc={imageSrc} />}
  </ToolPage>
);

const SmartResizeTool = ({ imageSrc }) => {
  const [selected, setSelected] = useState(null);
  const [customW, setCustomW] = useState('');
  const [customH, setCustomH] = useState('');
  const [format, setFormat] = useState('png');
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const imgRef = useRef(null);

  const getSize = () => {
    if (selected) return { w: selected.w, h: selected.h };
    return { w: parseInt(customW) || 800, h: parseInt(customH) || 600 };
  };

  const generate = async () => {
    if (!imgRef.current) return;
    setProcessing(true);
    try {
      const { w, h } = getSize();
      const img = imgRef.current;
      // Cover crop
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = w / h;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (ir > cr) { sw = img.naturalHeight * cr; sx = (img.naturalWidth - sw) / 2; }
      else { sh = img.naturalWidth / cr; sy = (img.naturalHeight - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      const resized = await resizeImage(canvas, w, h);
      const blob = await canvasToBlob(resized || canvas, format, 0.92);
      setResult({ url: URL.createObjectURL(blob), w, h, format });
      toast.success(`Resized to ${w}×${h}!`);
    } catch { toast.error('Resize failed.'); }
    finally { setProcessing(false); }
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `mianpix-resized.${result.format}`;
    a.click();
  };

  return (
    <div className="tool-inner">
      <img ref={imgRef} src={imageSrc} alt="" style={{ display: 'none' }} />
      <div className="tool-preview-row">
        <img src={imageSrc} alt="original" className="tool-preview-img" />
      </div>

      <div className="tool-controls">
        <h3>Social Media Presets</h3>
        <div className="preset-grid">
          {PRESETS.map(p => (
            <button
              key={p.label}
              className={`preset-chip ${selected?.label === p.label ? 'active' : ''}`}
              onClick={() => setSelected(p)}
            >
              <span>{p.label}</span>
              <small>{p.w}×{p.h}</small>
            </button>
          ))}
        </div>

        <h3>Custom Size</h3>
        <div className="custom-size-row">
          <input type="number" placeholder="Width" value={customW} onChange={e => { setCustomW(e.target.value); setSelected(null); }} />
          <span>×</span>
          <input type="number" placeholder="Height" value={customH} onChange={e => { setCustomH(e.target.value); setSelected(null); }} />
          <span>px</span>
        </div>

        <div className="format-row">
          {['png', 'jpg', 'webp'].map(f => (
            <button key={f} className={`fmt-btn ${format === f ? 'active' : ''}`} onClick={() => setFormat(f)}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <button className="tool-action-btn" onClick={generate} disabled={processing}>
          {processing ? 'Resizing…' : '⚡ Resize Image'}
        </button>
      </div>

      {result && (
        <motion.div className="tool-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <img src={result.url} alt="resized" className="tool-result-img" />
          <p className="result-meta">{result.w}×{result.h}px · {result.format.toUpperCase()}</p>
          <button className="tool-download-btn" onClick={download}>
            <FaDownload /> Download
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SmartResize;
