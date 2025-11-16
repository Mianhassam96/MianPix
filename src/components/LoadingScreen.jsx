// src/components/LoadingScreen.jsx
import React from 'react';
import './LoadingScreen.css'; // create simple styles (spinner + centered)

export default function LoadingScreen({ message = 'Loading...' }) {
  return (
    <div className="loading-screen">
      <div className="loading-inner">
        <div className="spinner" />
        <div className="loading-message">{message}</div>
      </div>
    </div>
  );
}
