import { useState, useRef } from 'react';
import { FaEraser, FaDownload, FaSpinner, FaCopy } from 'react-icons/fa';
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

/** Convert data URL → Blob without fetch() — works offline, no CORS issues */
const dataUrlToBlob = (src) =>
  new Promise((resolve, reject) => {
    if (src.startsWith('data:')) {
      try {
        const [header, b64] = src.split(',');
        const mime = header.match(/:(.*?);/)[1];
        const binary = atob(b64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        resolve(new Blob([bytes], { type: mime }));
      } catch (e) { reject(e); }
      return;
    }
    // object URL / remote — draw via canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext('2d').drawImage(img, 0, 0);
      c.toBlob(b => b ? resolve(b) : reject(new Error('toBlob failed')), 'image/png');
    };
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = src;
  });

const RemoveBg = () => (
  <ToolPage
    icon="🧹"
    title="Remove Background"
    description="AI-powered background removal. Instant preview, full-res transparent PNG download."
  >
    {(imageSrc, previewSrc) => <RemoveBgTool imageSrc={imageSrc} previewSrc={previewSrc} />}
  </ToolPage>
);

const RemoveBgTool = ({ imageSrc, previewSrc }) => {
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [resultBlob, setResultBlob] = useState(null);
  const [error, setError] = useState('');
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const remove = async () => {
    setProcessing(true);
    setError('');
    setResult(null);
    setResultBlob(null);
    setProgress(8);
    setStep(0);

    let s = 0, p = 8;
    timerRef.current = setInterval(() => {
      s = Math.min(s + 1, STEPS.length - 1);
      p = Math.min(p + 16, 82);
      setStep(s);
      setProgress(p);
    }, 2200);

    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const inputBlob = await dataUrlToBlob(imageSrc);
      // No extra options — use library defaults for maximum compatibility
      const outputBlob = await removeBackground(inputBlob);
      clearTimer();
      setProgress(100);
      setResult(URL.createObjectURL(outputBlob));
      setResultBlob(outputBlob);
      toast.success('Background removed!');
    } catch (err) {
      clearTimer();
      setProgress(0);
      // eslint-disable-next-line no-console
      console.error('BG removal error:', err);
      const msg = String(err?.message || err || '').toLowerCase();
      if (msg.includes('fetch') || msg.includes('network') || msg.includes('load')) {
        setError('Could not load AI model. Check your internet connection and try again.');
      } else if (msg.includes('memory') || msg.includes('oom')) {
        setError('Image too large for your device. Try a smaller image.');
      } else {
        setError('Background removal failed. Try a different image or refresh the page.');
      }
      toast.error('Background removal failed.');
    } finally {
      setProcessing(false);
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result;
    a.download = `mianpix-no-bg-${Date.now()}.png`;
    a.click();
    toast.success('Downloaded!');
  };

  const copyToClipboard = async () => {
    if (!resultBlob) return;
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': resultBlob })]);
      toast.success('Copied to clipboard!');
    } catch {
      toast.info('Copy not supported in this browser. Use Download instead.');
    }
  };

  const reset = () => { setResult(null); setResultBlob(null); setError(''); setProgress(0); };

  return (
    <div className="background-remover">
      {!result && (
        <div className="bg-preview-row">
          <img src={previewSrc || imageSrc} alt="original" className="bg-preview-img" />
        </div>
      )}

      {processing && (
        <motion.div className="bg-progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="tp-progress">
            <div className="tp-progress-fill" style={{ width: `${progress}%`, transition: 'width 0.4s ease' }} />
          </div>
          <p className="bg-step-label"><FaSpinner className="spinner" /> {STEPS[step]}</p>
        </motion.div>
      )}

      {error && !processing && (
        <motion.div className="bg-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          ⚠️ {error}
          <button onClick={() => setError('')}>Dismiss</button>
        </motion.div>
      )}

      {!result && (
        <button className="remove-bg-btn" onClick={remove} disabled={processing}>
          {processing ? <><FaSpinner className="spinner" /> Processing…</> : <><FaEraser /> Remove Background</>}
        </button>
      )}

      {result && (
        <motion.div className="processed-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <BeforeAfter beforeImage={previewSrc || imageSrc} afterImage={result} />
          <div className="bg-result-actions">
            <button className="download-btn" onClick={download}><FaDownload /> Download PNG</button>
            <button className="bg-copy-btn" onClick={copyToClipboard}><FaCopy /> Copy to Clipboard</button>
            <button className="bg-retry-btn" onClick={reset}>↩ Try Again</button>
          </div>
        </motion.div>
      )}

      <p className="info-text">
        All processing in your browser. Your image never leaves your device.
        <br />
        <small>First use downloads the AI model (~25 MB). Subsequent uses are instant.</small>
      </p>
    </div>
  );
};

export default RemoveBg;
