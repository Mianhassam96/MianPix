import React from 'react';
import { FaReact, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h1>About MianPix</h1>
        <p>
          MianPix is a simple, fast, and free online image editing tool built with modern web technologies.
          Edit your images directly in your browser without uploading to any server - your privacy is guaranteed.
        </p>

        <section className="tech-stack">
          <h2>Built With</h2>
          <div className="tech-icons">
            <div className="tech-item">
              <FaReact size={60} />
              <span>React</span>
            </div>
            <div className="tech-item">
              <FaJs size={60} />
              <span>JavaScript</span>
            </div>
            <div className="tech-item">
              <FaHtml5 size={60} />
              <span>HTML5</span>
            </div>
            <div className="tech-item">
              <FaCss3Alt size={60} />
              <span>CSS3</span>
            </div>
          </div>
        </section>

        <section className="features-list">
          <h2>What Can You Do?</h2>
          <ul>
            <li>Upload images from your device or via URL</li>
            <li>Resize images to custom dimensions</li>
            <li>Rotate and flip images</li>
            <li>Crop images with precision</li>
            <li>Adjust compression quality</li>
            <li>Export to PNG, JPG, or WEBP formats</li>
            <li>All processing happens in your browser - no server uploads</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
