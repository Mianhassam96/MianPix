import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  FaRedo, 
  FaArrowsAltH, 
  FaArrowsAltV,
  FaCrop,
  FaDownload,
  FaShare,
  FaCopy
} from 'react-icons/fa';
import { resizeImage, canvasToBlob } from '../utils/imageUtils';
import { addToHistory } from '../utils/storageUtils';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import './ImageEditor.css';

const ImageEditor = ({ imageSrc, onReset }) => {
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quality, setQuality] = useState(0.9);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [isCropping, setIsCropping] = useState(false);
  const [format, setFormat] = useState('png');
  
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      setWidth(Math.round(imgRef.current.naturalWidth));
      setHeight(Math.round(imgRef.current.naturalHeight));
    }
  }, [imageSrc]);

  const handleRotate = () => setRotation((r) => (r + 90) % 360);
  const handleFlipH = () => setFlipH((f) => !f);
  const handleFlipV = () => setFlipV((f) => !f);
  const toggleCrop = () => setIsCropping((c) => !c);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'r': handleRotate,
    'f': handleFlipH,
    'c': toggleCrop,
    'ctrl+d': handleDownload,
  });

  const generateCanvas = async () => {
    const image = imgRef.current;
    if (!image) return null;

    let finalWidth = Number(width) || image.naturalWidth;
    let finalHeight = Number(height) || image.naturalHeight;

    // Use Pica for high-quality resize when dimensions differ from natural
    const needsResize =
      finalWidth !== image.naturalWidth || finalHeight !== image.naturalHeight;

    // Build a source canvas first (handles crop + transform)
    const srcCanvas = document.createElement('canvas');
    const ctx = srcCanvas.getContext('2d');

    if (completedCrop && isCropping) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      srcCanvas.width = completedCrop.width * scaleX;
      srcCanvas.height = completedCrop.height * scaleY;
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0, 0,
        srcCanvas.width,
        srcCanvas.height
      );
    } else {
      const sw = rotation === 90 || rotation === 270 ? image.naturalHeight : image.naturalWidth;
      const sh = rotation === 90 || rotation === 270 ? image.naturalWidth : image.naturalHeight;
      srcCanvas.width = sw;
      srcCanvas.height = sh;
      ctx.save();
      ctx.translate(sw / 2, sh / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
      ctx.restore();
    }

    if (needsResize) {
      return await resizeImage(srcCanvas, finalWidth, finalHeight);
    }
    return srcCanvas;
  };

  async function handleDownload() {
    const canvas = await generateCanvas();
    if (!canvas) return;

    const blob = await canvasToBlob(canvas, format, quality);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `mianpix-edited.${format}`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Image downloaded successfully!');
    addToHistory({ action: 'download', format, width: canvas.width, height: canvas.height });
  };

  const handleCopyLink = async () => {
    try {
      const canvas = await generateCanvas();
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        try {
          if (navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
            toast.success('Image copied to clipboard!');
          } else {
            const dataUrl = canvas.toDataURL(`image/${format}`, quality);
            await navigator.clipboard.writeText(dataUrl);
            toast.success('Image data URL copied to clipboard!');
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Failed to copy:', err);
          toast.error('Failed to copy image. Try downloading instead.');
        }
      }, `image/${format}`, quality);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy:', err);
      toast.error('Failed to copy image.');
    }
  };

  const handleShare = async () => {
    try {
      const canvas = await generateCanvas();
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        const file = new File([blob], `mianpix-edited.${format}`, { type: blob.type });
        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: 'MianPix Edited Image', text: 'Check out my edited image from MianPix!' });
            toast.success('Image shared successfully!');
          } catch (err) {
            if (err.name !== 'AbortError') {
              // eslint-disable-next-line no-console
              console.error('Share failed:', err);
              toast.error('Failed to share image.');
            }
          }
        } else {
          toast.info('Sharing not supported. Use copy or download instead.');
        }
      }, `image/${format}`, quality);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Share failed:', err);
      toast.error('Failed to share image.');
    }
  };

  const getImageStyle = () => ({
    transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
    maxWidth: '100%',
    maxHeight: '70vh',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    transition: 'transform 0.3s ease'
  });

  return (
    <motion.div
      className="image-editor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="controls-panel"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="control-group">
          <h3>Transform</h3>
          <button onClick={handleRotate} title="Rotate 90°"><FaRedo /> Rotate</button>
          <button onClick={handleFlipH} title="Flip Horizontal"><FaArrowsAltH /> Flip H</button>
          <button onClick={handleFlipV} title="Flip Vertical"><FaArrowsAltV /> Flip V</button>
          <button onClick={toggleCrop} title="Crop"><FaCrop /> {isCropping ? 'Done Crop' : 'Crop'}</button>
        </div>

        <div className="control-group">
          <h3>Resize</h3>
          <label>Width: <input type="number" value={width} onChange={e => setWidth(e.target.value)} /></label>
          <label>Height: <input type="number" value={height} onChange={e => setHeight(e.target.value)} /></label>
        </div>

        <div className="control-group">
          <h3>Compression</h3>
          <label>Quality: {Math.round(quality*100)}%
            <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={e => setQuality(parseFloat(e.target.value))} />
          </label>
        </div>

        <div className="control-group">
          <h3>Format</h3>
          <select value={format} onChange={e => setFormat(e.target.value)}>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>

        <div className="control-group actions">
          <button className="download-btn" onClick={handleDownload}><FaDownload /> Download</button>
          <button className="share-btn" onClick={handleShare}><FaShare /> Share</button>
          <button className="copy-btn" onClick={handleCopyLink}><FaCopy /> Copy</button>
          <button className="reset-btn" onClick={onReset}>Reset Image</button>
        </div>
      </motion.div>

      <motion.div
        className="preview-panel"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h3>Preview</h3>
        {isCropping ? (
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={c => setCompletedCrop(c)}
          >
            <img ref={imgRef} src={imageSrc} alt="Preview" style={getImageStyle()} />
          </ReactCrop>
        ) : (
          <img ref={imgRef} src={imageSrc} alt="Preview" style={getImageStyle()} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ImageEditor;
