// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import './styles/GlobalStyles.css';
import './App.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Tool = lazy(() => import('./pages/Tool'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Animated routes wrapper
function AnimatedRoutes() {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/tool" element={<Layout><Tool /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </AnimatePresence>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
}

function AppInner() {
  return (
    <Suspense fallback={<LoadingScreen message="Preparing MianPix..." />}>
      <AnimatedRoutes />
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppInner />
      </Router>
    </ThemeProvider>
  );
}
