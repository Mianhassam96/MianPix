import React, { useState } from 'react';
import { FaEraser, FaDownload, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ToolPage from '../components/ToolPage';
import BeforeAfter from '../components/BeforeAfter';
import '../components/BackgroundRemover.css';

const RemoveBg = () => (
  <ToolPage
    icon="🧹"
    title="Remove Background"
    description="AI-powered one-click background removal. Output is a transparent PNG."
  >
    {(imageSrc) => <RemoveBgTool imageSrc={imageSrc} />}
  </ToolPage>
);

const RemoveBgTool = ({ imageSrc }) => {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const remove = async () => {
    setProcessing(true);
    toast.info('Removing background… this may take a moment');
    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      const out = await removeBackground(blob);
      setResult(URL.createObjectURL(out));
      toast.success('Background removed!');
    } catch {
      toast.error('Failed. Please try again.');
    } finally {
      setProcessing(false);
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
      <button className="remove-bg-btn" onClick={remove} disabled={processing}>
        {processing ? <><FaSpinner className="spinner" /> Processing…</> : <><FaEraser /> Remove Background</>}
      </button>
      {result && (
        <motion.div className="processed-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <BeforeAfter beforeImage={imageSrc} afterImage={result} />
          <button className="download-btn" onClick={download} style={{ marginTop: '1rem' }}>
            <FaDownload /> Download PNG
          </button>
        </motion.div>
      )}
      <p className="info-text">All processing happens in your browser. Your image never leaves your device.</p>
    </div>
  );
};

export default RemoveBg;
