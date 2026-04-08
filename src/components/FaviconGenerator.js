import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaDownload, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import JSZip from 'jszip';
import './FaviconGenerator.css';

const SIZES = [
  { size: 16, label: 'favicon-16x16.png', desc: 'Browser tab' },
  { size: 32, label: 'favicon-32x32.png', desc: 'Browser tab HD' },
  { size: 48, label: 'favicon-48x48.png', desc: 'Windows site' },
  { size: 180, label: 'apple-touch-icon.png', desc: 'iOS home screen' },
  { size: 192, label: 'android-chrome-192x192.png', desc: 'Android' },
  { size: 512, label: 'android-chrome-512x512.png', desc: 'PWA splash' },
];

const FaviconGenerator = ({ imageSrc }) => {
  const [previews, setPreviews] = useState([]);
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    if (!imageSrc) { toast.error('Upload an image first'); return; }
    setGenerating(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const generated = SIZES.map(({ size, label, desc }) => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        return { size, label, desc, dataUrl: canvas.toDataURL('image/png') };
      });
      setPreviews(generated);
      setGenerating(false);
      toast.success('Favicons generated!');
    };
    img.src = imageSrc;
  };

  const downloadAll = async () => {
    if (!previews.length) return;
    try {
      const zip = new JSZip();
      previews.forEach(({ label, dataUrl }) => {
        const base64 = dataUrl.split(',')[1];
        zip.file(label, base64, { base64: true });
      });

      // Add manifest.json
      const manifest = {
        icons: [
          { src: 'android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ]
      };
      zip.file('site.webmanifest', JSON.stringify(manifest, null, 2));

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mianpix-favicons.zip';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('All favicons downloaded as ZIP!');
    } catch {
      // fallback: download individually
      previews.forEach(({ label, dataUrl }) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = label;
        a.click();
      });
    }
  };

  const downloadOne = ({ label, dataUrl }) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = label;
    a.click();
    toast.success(`${label} downloaded!`);
  };

  const htmlSnippet = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;

  return (
    <motion.div className="favicon-generator" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="favicon-header">
        <h3><FaCode /> Favicon Generator</h3>
        <p>Generate all favicon sizes for your website in one click</p>
      </div>

      <button className="generate-btn" onClick={generate} disabled={generating || !imageSrc}>
        {generating ? 'Generating...' : '⚡ Generate All Favicons'}
      </button>

      {previews.length > 0 && (
        <>
          <div className="favicon-grid">
            {previews.map(({ size, label, desc, dataUrl }) => (
              <motion.div
                key={size}
                className="favicon-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="favicon-preview-wrap">
                  <img src={dataUrl} alt={label} style={{ width: Math.min(size, 64), height: Math.min(size, 64) }} />
                </div>
                <div className="favicon-info">
                  <span className="favicon-size">{size}×{size}</span>
                  <span className="favicon-desc">{desc}</span>
                  <span className="favicon-label">{label}</span>
                </div>
                <button className="favicon-dl-btn" onClick={() => downloadOne({ label, dataUrl })}>
                  <FaDownload />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="favicon-html">
            <h4>HTML Snippet</h4>
            <pre><code>{htmlSnippet}</code></pre>
            <button onClick={() => { navigator.clipboard.writeText(htmlSnippet); toast.success('HTML copied!'); }}>
              Copy HTML
            </button>
          </div>

          <button className="download-all-btn" onClick={downloadAll}>
            <FaDownload /> Download All as ZIP
          </button>
        </>
      )}
    </motion.div>
  );
};

export default FaviconGenerator;
