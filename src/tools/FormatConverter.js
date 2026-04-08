import { useState, useRef } from 'react';
import { FaDownload, FaExchangeAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ToolPage from '../components/ToolPage';
import { canvasToBlob, formatBytes, dataUrlSize } from '../utils/imageUtils';
import './tools.css';

const CONVERSIONS = [
  { from: 'PNG',  to: 'JPG',  fmt: 'jpg'  },
  { from: 'JPG',  to: 'PNG',  fmt: 'png'  },
  { from: 'WEBP', to: 'PNG',  fmt: 'png'  },
  { from: 'PNG',  to: 'WEBP', fmt: 'webp' },
  { from: 'JPG',  to: 'WEBP', fmt: 'webp' },
  { from: 'WEBP', to: 'JPG',  fmt: 'jpg'  },
];

const FormatConverter = () => (
  <ToolPage icon="🔄" title="Format Converter"
    description="Convert PNG ↔ JPG ↔ WEBP instantly. Preview and download in one click.">
    {(imageSrc, previewSrc) => <FormatConverterTool imageSrc={imageSrc} previewSrc={previewSrc} />}
  </ToolPage>
);

const FormatConverterTool = ({ imageSrc, previewSrc }) => {
  const [selected, setSelected] = useState(CONVERSIONS[0]);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const imgRef = useRef(null);
  const origSize = dataUrlSize(imageSrc);

  const convert = async (conv) => {
    setProcessing(true);
    try {
      const img = imgRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (conv.fmt === 'jpg') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, conv.fmt, 0.92);
      const url = URL.createObjectURL(blob);
      setResult({ url, fmt: conv.fmt, to: conv.to, size: blob.size });
      // Auto-download
      const a = document.createElement('a');
      a.href = url; a.download = `mianpix-converted.${conv.fmt}`; a.click();
      toast.success(`Converted to ${conv.to} — downloaded!`);
    } catch { toast.error('Conversion failed.'); }
    finally { setProcessing(false); }
  };

  const handleSelect = (c) => {
    setSelected(c);
    setResult(null);
  };

  return (
    <div className="tool-inner">
      <img ref={imgRef} src={imageSrc} alt="" style={{ display: 'none' }} />

      <div className="tool-preview-row">
        <img src={previewSrc || imageSrc} alt="original" className="tool-preview-img" />
        <p className="result-meta" style={{ marginTop: '0.5rem' }}>
          Original: {formatBytes(origSize)}
        </p>
      </div>

      <div className="tool-controls">
        <h3>Choose Conversion</h3>
        <div className="conversion-grid">
          {CONVERSIONS.map((c, i) => (
            <button key={i}
              className={`conversion-btn ${selected.from === c.from && selected.to === c.to ? 'active' : ''}`}
              onClick={() => handleSelect(c)}>
              <span>{c.from}</span><FaExchangeAlt /><span>{c.to}</span>
            </button>
          ))}
        </div>
        <button className="tool-action-btn" onClick={() => convert(selected)} disabled={processing}>
          {processing ? 'Converting…' : `⚡ Convert to ${selected.to} & Download`}
        </button>
      </div>

      {result && (
        <motion.div className="tool-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="size-compare">
            <div className="size-box"><span>Original</span><strong>{formatBytes(origSize)}</strong></div>
            <div className="size-arrow">→</div>
            <div className="size-box compressed">
              <span>{result.to}</span><strong>{formatBytes(result.size)}</strong>
            </div>
          </div>
          <button className="tool-download-btn" onClick={() => {
            const a = document.createElement('a');
            a.href = result.url; a.download = `mianpix-converted.${result.fmt}`; a.click();
          }}><FaDownload /> Download .{result.fmt}</button>
        </motion.div>
      )}
    </div>
  );
};

export default FormatConverter;
