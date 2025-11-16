import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './BeforeAfter.css';

const BeforeAfter = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.min(100, Math.max(0, percentage)));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      className="before-after-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div className="image-wrapper">
        {/* Before Image */}
        <div className="before-image">
          <img src={beforeImage} alt="Before" draggable="false" />
          <div className="label">Before</div>
        </div>

        {/* After Image with clip */}
        <div
          className="after-image"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src={afterImage} alt="After" draggable="false" />
          <div className="label">After</div>
        </div>

        {/* Slider */}
        <motion.div
          className="slider"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="slider-button">
            <div className="arrow-left">◀</div>
            <div className="slider-line"></div>
            <div className="arrow-right">▶</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BeforeAfter;
