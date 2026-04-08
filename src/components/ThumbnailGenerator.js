import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaDownload, FaYoutube, FaBlog, FaShoppingBag, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ThumbnailGenerator.css';

const PRESETS = [
  { id: 'youtube', label: 'YouTube Thumbnail', icon: <FaYoutube />, w: 1280, h: 720, color: '#ff0000', desc: '1280×720' },
  { id: 'blog', label: 'Blog Featured', icon: <FaBlog />, w: 1200, h: 630, color: '#3b82f6', desc: '1200×630' },
  { id: 'product', label: 'Product Card', icon: <FaShoppingBag />, w: 800, h: 800, color: '#10b981', desc: '800×800' },
  { id: 'social', label: 'Social Banner', icon: <FaShareAlt />, w: 1200, h: 628, color: '#8b5cf6', desc: '1200×628' },
];

const ThumbnailGenerator = ({ imageSrc }) => {
  const [selected, setSelected] = useState('youtube');
  const [title, setTitle] = useState('');
  const [gradientStart, setGradientStart] = useState('#000000');
  const [gradientEnd, setGradientEnd] = useState('#4f46e5');
  const [gradientOpacity, setGradientOpacity] = useState(0.55);
  const [preview, setPreview] = useState(null);
  const [generating, setGenerating] = useState(false);
  const canvasRef = useRef(null);

  const preset = PRESETS.find(p => p.id === selected);

  const generate = () => {
    if (!imageSrc) { toast.error('Upload an image first'); return; }
    setGenerating(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = preset.w;
      canvas.height = preset.h;
      const ctx = canvas.getContext('2d');

      // Draw image cover
      const imgRatio = img.width / img.height;
      const canvasRatio = preset.w / preset.h;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (imgRatio > canvasRatio) {
        sw = img.height * canvasRatio;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / canvasRatio;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, preset.w, preset.h);

      // Gradient overlay
      const grad = ctx.createLinearGradient(0, preset.h * 0.4, 0, preset.h);
      const hex2rgba = (hex, a) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${a})`;
      };
      grad.addColorStop(0, hex2rgba(gradientStart, 0));
      grad.addColorStop(1, hex2rgba(gradientEnd, gradientOpacity));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, preset.w, preset.h);

      // Title text
      if (title) {
        const fontSize = Math.round(preset.h * 0.08);
        ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 12;
        ctx.textBaseline = 'bottom';

        // Word wrap
        const maxWidth = preset.w * 0.85;
        const words = title.split(' ');
        const lines = [];
        let line = '';
        for (const word of words) {
          const test = line ? `${line} ${word}` : word;
          if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line);
            line = word;
          } else {
            line = test;
          }
        }
        if (line) lines.push(line);

        const lineH = fontSize * 1.3;
        const totalH = lines.length * lineH;
        let y = preset.h - preset.h * 0.06 - totalH + lineH;
        lines.forEach(l => {
          ctx.fillText(l, preset.w * 0.07, y);
          y += lineH;
        });
        ctx.shadowBlur = 0;
      }

      setPreview(canvas.toDataURL('image/jpeg', 0.92));
      setGenerating(false);
      toast.success('Thumbnail generated!');
    };
    img.src = imageSrc;
  };

  const download = () => {
    if (!preview) return;
    const a = document.createElement('a');
    a.href = preview;
    a.download = `mianpix-${selected}-thumbnail.jpg`;
    a.click();
    toast.success('Thumbnail downloaded!');
  };

  return (
    <motion.div className="thumbnail-generator" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="thumb-header">
        <h3>🖼 Thumbnail Generator</h3>
        <p>One-click thumbnails for YouTube, blogs, social media & more</p>
      </div>

      {/* Preset selector */}
      <div className="thumb-presets">
        {PRESETS.map(p => (
          <button
            key={p.id}
            className={`preset-btn ${selected === p.id ? 'active' : ''}`}
            onClick={() => setSelected(p.id)}
            style={{ '--preset-color': p.color }}
          >
            <span className="preset-icon">{p.icon}</span>
            <span className="preset-label">{p.label}</span>
            <span className="preset-desc">{p.desc}</span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="thumb-controls">
        <div className="thumb-control">
          <label>Title Text (optional)</label>
          <input
            type="text"
            placeholder="Enter your title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="thumb-control-row">
          <div className="thumb-control">
            <label>Gradient Start</label>
            <input type="color" value={gradientStart} onChange={e => setGradientStart(e.target.value)} />
          </div>
          <div className="thumb-control">
            <label>Gradient End</label>
            <input type="color" value={gradientEnd} onChange={e => setGradientEnd(e.target.value)} />
          </div>
          <div className="thumb-control">
            <label>Overlay: {Math.round(gradientOpacity * 100)}%</label>
            <input type="range" min="0" max="1" step="0.05" value={gradientOpacity}
              onChange={e => setGradientOpacity(parseFloat(e.target.value))} />
          </div>
        </div>
      </div>

      <button className="generate-thumb-btn" onClick={generate} disabled={generating || !imageSrc}>
        {generating ? 'Generating...' : `⚡ Generate ${preset.label}`}
      </button>

      {preview && (
        <motion.div className="thumb-result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <img src={preview} alt="Thumbnail preview" />
          <button className="thumb-download-btn" onClick={download}>
            <FaDownload /> Download {preset.desc}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ThumbnailGenerator;
