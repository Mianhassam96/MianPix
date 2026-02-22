import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import { FaCircle, FaSquare, FaDownload, FaPalette } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import './AvatarCreator.css';

const AvatarCreator = ({ imageSrc }) => {
  const [crop, setCrop] = useState({
    unit: '%',
    width: 80,
    height: 80,
    x: 10,
    y: 10,
    aspect: 1
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [avatarShape, setAvatarShape] = useState('circle'); // circle or square
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [useGradient, setUseGradient] = useState(false);
  const [gradientColor1, setGradientColor1] = useState('#667eea');
  const [gradientColor2, setGradientColor2] = useState('#764ba2');
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [avatarSize, setAvatarSize] = useState(400);
  
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  useEffect(() => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) return;
    
    generatePreview();
  }, [completedCrop, avatarShape, backgroundColor, useGradient, gradientColor1, gradientColor2, borderWidth, borderColor, avatarSize]);

  const generatePreview = () => {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    if (!image || !canvas || !crop) return;

    const ctx = canvas.getContext('2d');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = avatarSize;
    canvas.height = avatarSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    if (useGradient) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, gradientColor1);
      gradient.addColorStop(1, gradientColor2);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = backgroundColor;
    }

    if (avatarShape === 'circle') {
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.clip();
    } else {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw cropped image
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Draw border
    if (borderWidth > 0) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      if (avatarShape === 'circle') {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - borderWidth / 2, 0, 2 * Math.PI);
        ctx.stroke();
      } else {
        ctx.strokeRect(borderWidth / 2, borderWidth / 2, canvas.width - borderWidth, canvas.height - borderWidth);
      }
    }
  };

  const handleDownload = () => {
    const canvas = previewCanvasRef.current;
    if (!canvas) {
      toast.error('Please crop the image first');
      return;
    }

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `mianpix-avatar-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('Avatar downloaded!');
    }, 'image/png');
  };

  if (!imageSrc) {
    return (
      <div className="avatar-creator-empty">
        <p>Please upload an image to create an avatar</p>
      </div>
    );
  }

  return (
    <motion.div
      className="avatar-creator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="avatar-controls">
        <div className="control-section">
          <h3>Avatar Shape</h3>
          <div className="shape-buttons">
            <button
              className={avatarShape === 'circle' ? 'active' : ''}
              onClick={() => setAvatarShape('circle')}
            >
              <FaCircle /> Circle
            </button>
            <button
              className={avatarShape === 'square' ? 'active' : ''}
              onClick={() => setAvatarShape('square')}
            >
              <FaSquare /> Square
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Background</h3>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={useGradient}
              onChange={(e) => setUseGradient(e.target.checked)}
            />
            Use Gradient
          </label>
          
          {useGradient ? (
            <div className="gradient-controls">
              <label>
                Color 1:
                <input
                  type="color"
                  value={gradientColor1}
                  onChange={(e) => setGradientColor1(e.target.value)}
                />
              </label>
              <label>
                Color 2:
                <input
                  type="color"
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                />
              </label>
            </div>
          ) : (
            <label>
              Color:
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </label>
          )}
        </div>

        <div className="control-section">
          <h3>Border</h3>
          <label>
            Width: {borderWidth}px
            <input
              type="range"
              min="0"
              max="20"
              value={borderWidth}
              onChange={(e) => setBorderWidth(parseInt(e.target.value))}
            />
          </label>
          {borderWidth > 0 && (
            <label>
              Color:
              <input
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
              />
            </label>
          )}
        </div>

        <div className="control-section">
          <h3>Size</h3>
          <label>
            Avatar Size: {avatarSize}px
            <input
              type="range"
              min="200"
              max="800"
              step="50"
              value={avatarSize}
              onChange={(e) => setAvatarSize(parseInt(e.target.value))}
            />
          </label>
        </div>

        <button className="download-avatar-btn" onClick={handleDownload}>
          <FaDownload /> Download Avatar
        </button>
      </div>

      <div className="avatar-workspace">
        <div className="crop-area">
          <h3>Crop Your Image</h3>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            circularCrop={avatarShape === 'circle'}
          >
            <img ref={imgRef} src={imageSrc} alt="Crop" />
          </ReactCrop>
        </div>

        <div className="preview-area">
          <h3>Preview</h3>
          <div className="avatar-preview">
            <canvas ref={previewCanvasRef} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AvatarCreator;
