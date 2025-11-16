import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaLink } from 'react-icons/fa';
import './ImageUpload.css';

const ImageUpload = ({ onImageLoad }) => {
  const [urlInput, setUrlInput] = useState('');

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageLoad(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: false
  });

  const handleUrlLoad = () => {
    if (urlInput) {
      onImageLoad(urlInput);
      setUrlInput('');
    }
  };

  return (
    <div className="image-upload">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <FaUpload size={48} />
        <p>Drag & drop an image here, or click to select</p>
        <p className="supported-formats">Supports: PNG, JPG, JPEG, GIF, WEBP</p>
      </div>
      
      <div className="url-upload">
        <FaLink />
        <input
          type="text"
          placeholder="Or paste image URL here"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleUrlLoad()}
        />
        <button onClick={handleUrlLoad}>Load</button>
      </div>
    </div>
  );
};

export default ImageUpload;
