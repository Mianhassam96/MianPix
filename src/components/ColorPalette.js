import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaEyeDropper, FaCopy, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ColorPalette.css';

const ColorPalette = ({ imageSrc }) => {
  const [colors, setColors] = useState([]);
  const [gradient, setGradient] = useState('');
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imageSrc) extractColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc]);

  const extractColors = () => {
    setLoading(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      // Sample at reduced size for speed
      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(img, 0, 0, 100, 100);
      const data = ctx.getImageData(0, 0, 100, 100).data;

      // Bucket colors into groups
      const buckets = {};
      for (let i = 0; i < data.length; i += 4) {
        const r = Math.round(data[i] / 32) * 32;
        const g = Math.round(data[i + 1] / 32) * 32;
        const b = Math.round(data[i + 2] / 32) * 32;
        const key = `${r},${g},${b}`;
        buckets[key] = (buckets[key] || 0) + 1;
      }

      const sorted = Object.entries(buckets)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([key]) => {
          const [r, g, b] = key.split(',').map(Number);
          return rgbToHex(r, g, b);
        });

      setColors(sorted);
      if (sorted.length >= 2) {
        setGradient(`linear-gradient(135deg, ${sorted[0]}, ${sorted[1]})`);
      }
      setLoading(false);
    };
    img.src = imageSrc;
  };

  const rgbToHex = (r, g, b) =>
    '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}`);
  };

  const downloadPalette = () => {
    const canvas = document.createElement('canvas');
    canvas.width = colors.length * 80;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');
    colors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * 80, 0, 80, 80);
      ctx.fillStyle = '#000';
      ctx.font = '11px monospace';
      ctx.fillText(color, i * 80 + 4, 100);
    });
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mianpix-palette.png';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Palette downloaded!');
    });
  };

  return (
    <motion.div className="color-palette" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="palette-header">
        <h3><FaEyeDropper /> Color Palette Extractor</h3>
        <p>Extracted from your image automatically</p>
      </div>

      {loading && <div className="palette-loading">Extracting colors...</div>}

      {colors.length > 0 && (
        <>
          <div className="palette-swatches">
            {colors.map((color, i) => (
              <motion.div
                key={i}
                className="swatch"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => copyHex(color)}
                title={`Click to copy ${color}`}
              >
                <div className="swatch-color" style={{ background: color }} />
                <span className="swatch-hex">{color}</span>
                <FaCopy className="swatch-copy" />
              </motion.div>
            ))}
          </div>

          {gradient && (
            <div className="palette-gradient">
              <h4>Generated Gradient</h4>
              <div className="gradient-preview" style={{ background: gradient }} />
              <code className="gradient-code">{gradient}</code>
              <button onClick={() => { navigator.clipboard.writeText(gradient); toast.success('Gradient CSS copied!'); }}>
                <FaCopy /> Copy CSS
              </button>
            </div>
          )}

          <button className="palette-download-btn" onClick={downloadPalette}>
            <FaDownload /> Download Palette
          </button>
        </>
      )}
    </motion.div>
  );
};

export default ColorPalette;
