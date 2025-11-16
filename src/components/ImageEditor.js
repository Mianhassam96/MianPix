import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { motion } from 'framer-motion';
import { 
  FaRedo, 
  FaArrowsAltH, 
  FaArrowsAltV,
  FaCrop,
  FaDownload
} from 'react-icons/fa';
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

  const handleRotate = () => setRotation((rotation + 90) % 360);
  const handleFlipH = () => setFlipH(!flipH);
  const handleFlipV = () => setFlipV(!flipV);
  const toggleCrop = () => setIsCropping(!isCropping);

  const generateCanvas = () => {
    const image = imgRef.current;
    if (!image) return null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let finalWidth = width || image.naturalWidth;
    let finalHeight = height || image.naturalHeight;

    if (rotation === 90 || rotation === 270) {
      canvas.width = finalHeight;
      canvas.height = finalWidth;
    } else {
      canvas.width = finalWidth;
      canvas.height = finalHeight;
    }

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    if (completedCrop && isCropping) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
    } else {
      ctx.drawImage(image, -finalWidth / 2, -finalHeight / 2, finalWidth, finalHeight);
    }

    ctx.restore();
    return canvas;
  };

  const handleDownload = () => {
    const canvas = generateCanvas();
    if (!canvas) return;

    const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
    canvas.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `mianpix-edited.${format}`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      },
      mimeType,
      quality
    );
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
