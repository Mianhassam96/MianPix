import React, { useState, useRef } from 'react';
import { FaDownload, FaExchangeAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ToolPage from '../components/ToolPage';
import { canvasToBlob } from '../utils/imageUtils';
import './tools.css';

const CONVERSIONS = [
  { from: 'PNG', to: 'JPG',  fmt: 'jpg'  },
  { from: 'JPG', to: 'PNG',  fmt: 'png'  },
  { from: 'WEBP', to: 'PNG', fmt: 'png'  },
  { from: 'PNG', to: 'WEBP', fmt: 'webp' },
  { from: 'JPG', to: 'WEBP', fmt: 'webp' },
  { from: 'WEBP', to: 'JPG', fmt: 'jpg'  },
];

const FormatConverter = () => (
  <ToolPage icon="🔄" title="Format Converter" description="Convert between PNG, JPG, and WEBP instantly in your browser.">
    {(imageSrc) => <FormatConverterTool imageSrc={imageSrc} />}
  </ToolPage>
);

const FormatConverterTool = ({ imageSrc }) => {
  const [selected, setSelected] = useState(CONVERSIONS[0]);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const imgRef = useRef(null);

  const convert = async () => {
    setProcessing(true);
    try {
      const img = imgRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (selected.fmt === 'jpg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, selected.fmt, 0.92);
      setResult({ url: URL.createObjectURL(blob), fmt: selected.fmt, to: selected.to });
      toast.success(`Converted to ${selected.to}!`);
    } catch { toast.error('Conversion failed.'); }
    finally { setProcessing(false); }
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `mianpix-converted.${result.fmt}`;
    a.click();
  };

  return (
    <div className="tool-inner">
      <img ref={imgRef} src={imageSrc} alt="" style={{ display: 'none' }} />
      <div className="tool-preview-row">
        <img src={imageSrc} alt="original" className="tool-preview-img" />
      </div>

      <div className="tool-controls">
        <h3>Choose Conversion</h3>
        <div className="conversion-grid">
          {CONVERSIONS.map((c, i) => (
            <button
              key={i}
              className={`conversion-btn ${selected.from === c.from && selected.to === c.to ? 'active' : ''}`}
              onClick={() => { setSelected(c); setResult(null); }}
            >
              <span>{c.from}</span>
              <FaExchangeAlt />
              <span>{c.to}</span>
            </button>
          ))}
        </div>
        <button className="tool-action-btn" onClick={convert} disabled={processing}>
          {processing ? 'Converting…' : `⚡ Convert to ${selected.to}`}
        </button>
      </div>

      {result && (
        <motion.div className="tool-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <img src={result.url} alt="converted" className="tool-result-img" />
          <p className="result-meta">Converted to {result.to}</p>
          <button className="tool-download-btn" onClick={download}>
            <FaDownload /> Download .{result.fmt}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default FormatConverter;
