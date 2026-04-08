import React, { useState } from 'react';
import { FaEraser, FaDownload, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ToolPage from '../components/ToolPage';
import BeforeAfter from '../components/BeforeAfter';
import '../components/BackgroundRemover.css';

const STEPS = [
  'Loading AI model…',
  'Analyzing image…',
  'Removing background…',
  'Finalizing…',
];

/** Convert a data URL or object URL to a Blob without fetch() */
const toBlob = (src) =>
  new Promise((resolve, reject) => {
    // data URL — decode directly
    if (src.startsWith('data:')) {
      const [header, b64] = src.split(',');
      const mime = header.match(/:(.*?);/)[1];
      const bytes = atob(b64);
      const arr = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
      resolve(new Blob([arr], { type: mime }));
      return;
    }
    // object URL or remote URL — use fetch with no-cors fallback via Image→Canvas
    fetch(src)
      .then(r => r.blob())
      .then(resolve)
      .catch(() => {
        // fallback: draw to canvas and export
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth; c.height = img.naturalHeight;
          c.getContext('2d').drawImage(img, 0, 0);
          c.toBlob(b => b ? resolve(b) : reject(new Error('Canvas export failed')), 'image/png');
        };
        img.onerror = reject;
        img.src = src;
      });
  });

const RemoveBg = () => (
  <ToolPage
    icon="🧹"
    title="Remove Background"
    description="AI-powered background removal. Preview shown instantly, full-res PNG download."
  >
    {(imageSrc, previewSrc) => <RemoveBgTool imageSrc={imageSrc} previewSrc={previewSrc} />}
  </ToolPage>
);

const RemoveBgTool = ({ imageSrc, previewSrc }) => {
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const remove = async () => {
    setProcessing(true);
    setError('');
    setProgress(10);
    setStep(0);

    const stepTimer = setInterval(() => {
      setStep(s => Math.min(s + 1, STEPS.length - 1));
      setProgress(p => Math.min(p + 18, 85));
    }, 2000);

    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const blob = await toBlob(imageSrc);
      const out = await removeBackground(blob);
      clearInterval(stepTimer);
      setProgress(100);
      setResult(URL.createObjectURL(out));
      toast.success('Background removed!');
    } catch (err) {
      clearInterval(stepTimer);
      // eslint-disable-next-line no-console
      console.error('BG removal error:', err);
      const msg = err?.message || '';
      if (msg.includes('model') || msg.includes('fetch') || msg.includes('network')) {
        setError('Network error loading AI model. Check your connection and try again.');
      } else {
        setError('Background removal failed. Try a different image or refresh the page.');
      }
      toast.error('Background removal failed.');
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = result;
    a.download = `mianpix-no-bg-${Date.now()}.png`;
    a.click();
    toast.success('Downloaded!');
  };

  return (
    <div className="background-remover">
      {/* Instant preview */}
      {!result && (
        <div className="bg-preview-row">
          <img src={previewSrc || imageSrc} alt="original" className="bg-preview-img" />
        </div>
      )}

      {/* Progress bar */}
      {processing && (
        <motion.div className="bg-progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="tp-progress">
            <div className="tp-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="bg-step-label">
            <FaSpinner className="spinner" /> {STEPS[step]}
          </p>
        </motion.div>
      )}

      {/* Error */}
      {error && !processing && (
        <motion.div className="bg-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          ⚠️ {error}
          <button onClick={() => setError('')}>Dismiss</button>
        </motion.div>
      )}

      <button className="remove-bg-btn" onClick={remove} disabled={processing}>
        {processing
          ? <><FaSpinner className="spinner" /> Processing…</>
          : <><FaEraser /> Remove Background</>
        }
      </button>

      {result && (
        <motion.div className="processed-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <BeforeAfter beforeImage={previewSrc || imageSrc} afterImage={result} />
          <button className="download-btn" onClick={download} style={{ marginTop: '1rem' }}>
            <FaDownload /> Download Full-Res PNG
          </button>
          <button
            className="remove-bg-btn"
            onClick={() => { setResult(null); setError(''); }}
            style={{ marginTop: '0.5rem', background: 'var(--color-text-secondary)' }}
          >
            Try Again
          </button>
        </motion.div>
      )}

      <p className="info-text">
        All processing happens in your browser. Your image never leaves your device.
        <br />
        <small>Note: First use downloads the AI model (~50 MB). Subsequent uses are instant.</small>
      </p>
    </div>
  );
};

export default RemoveBg;
