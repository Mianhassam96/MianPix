// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children }) {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
