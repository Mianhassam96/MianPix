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

const RemoveBg = () => (
  <ToolPage icon="🧹" title="Remove Background"
    description="AI-powered background removal. Preview shown instantly, full-res PNG download.">
    {(imageSrc, previewSrc) => <RemoveBgTool imageSrc={imageSrc} previewSrc={previewSrc} />}
  </ToolPage>
);

const RemoveBgTool = ({ imageSrc, previewSrc }) => {
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const remove = async () => {
    setProcessing(true);
    setProgress(10);
    setStep(0);

    // Simulate step progression
    const stepTimer = setInterval(() => {
      setStep(s => Math.min(s + 1, STEPS.length - 1));
      setProgress(p => Math.min(p + 20, 85));
    }, 1800);

    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      const out = await removeBackground(blob);
      clearInterval(stepTimer);
      setProgress(100);
      setResult(URL.createObjectURL(out));
      toast.success('Background removed!');
    } catch {
      clearInterval(stepTimer);
      toast.error('Failed. Please try again.');
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
      {/* Show preview immediately */}
      {!result && (
        <div className="bg-preview-row">
          <img src={previewSrc || imageSrc} alt="original" className="bg-preview-img" />
        </div>
      )}

      {/* Progress */}
      {processing && (
        <motion.div className="bg-progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="tp-progress">
            <div className="tp-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="bg-step-label"><FaSpinner className="spinner" /> {STEPS[step]}</p>
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
        </motion.div>
      )}

      <p className="info-text">All processing in your browser. Your image never leaves your device.</p>
    </div>
  );
};

export default RemoveBg;
