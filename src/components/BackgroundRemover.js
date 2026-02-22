import React, { useState } from 'react';
import { FaEraser, FaDownload, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './BackgroundRemover.css';

const BackgroundRemover = ({ image, onImageProcessed }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);

  const removeBackground = async () => {
    if (!image) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    toast.info('Removing background... This may take a moment');

    try {
      // Dynamic import for background removal
      const { removeBackground: removeBg } = await import('@imgly/background-removal');
      
      // Convert data URL to blob if needed
      let imageBlob;
      if (typeof image === 'string') {
        const response = await fetch(image);
        imageBlob = await response.blob();
      } else {
        imageBlob = image;
      }
      
      const blob = await removeBg(imageBlob);
      const url = URL.createObjectURL(blob);
      
      setProcessedImage(url);
      if (onImageProcessed) {
        onImageProcessed(url);
      }
      toast.success('Background removed successfully!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Background removal error:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `mianpix-no-bg-${Date.now()}.png`;
    link.click();
    toast.success('Image downloaded!');
  };

  return (
    <div className="background-remover">
      <h3>Background Remover</h3>
      
      <button
        className="remove-bg-btn"
        onClick={removeBackground}
        disabled={isProcessing || !image}
      >
        {isProcessing ? (
          <>
            <FaSpinner className="spinner" />
            Processing...
          </>
        ) : (
          <>
            <FaEraser />
            Remove Background
          </>
        )}
      </button>

      {processedImage && (
        <div className="processed-preview">
          <img src={processedImage} alt="No background" />
          <button className="download-btn" onClick={downloadImage}>
            <FaDownload />
            Download PNG
          </button>
        </div>
      )}

      <p className="info-text">
        One-click background removal. Output will be a transparent PNG.
      </p>
    </div>
  );
};

export default BackgroundRemover;
