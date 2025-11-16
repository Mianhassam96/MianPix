// src/components/Footer.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`footer ${theme}`}>
      <small>MianPix © {new Date().getFullYear()} — Built with ❤️ by MultiMian</small>
    </footer>
  );
}
