import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import './styles/GlobalStyles.css';
import './App.css';

// Pages
const Home    = lazy(() => import('./pages/Home'));
const About   = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Tool pages
const RemoveBg       = lazy(() => import('./tools/RemoveBg'));
const SmartResize    = lazy(() => import('./tools/SmartResize'));
const BgBlur         = lazy(() => import('./tools/BgBlur'));
const ThumbnailMaker = lazy(() => import('./tools/ThumbnailMaker'));
const Compressor     = lazy(() => import('./tools/Compressor'));
const FormatConverter = lazy(() => import('./tools/FormatConverter'));
const WebOptimizer   = lazy(() => import('./tools/WebOptimizer'));
const ProfilePicture = lazy(() => import('./tools/ProfilePicture'));
const PaletteExtractor = lazy(() => import('./tools/PaletteExtractor'));
const FaviconGen     = lazy(() => import('./tools/FaviconGen'));

function AnimatedRoutes() {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Main pages */}
          <Route path="/"        element={<Layout><Home /></Layout>} />
          <Route path="/about"   element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Tool pages */}
          <Route path="/tools/remove-bg"  element={<Layout><RemoveBg /></Layout>} />
          <Route path="/tools/resize"     element={<Layout><SmartResize /></Layout>} />
          <Route path="/tools/bg-blur"    element={<Layout><BgBlur /></Layout>} />
          <Route path="/tools/thumbnail"  element={<Layout><ThumbnailMaker /></Layout>} />
          <Route path="/tools/compress"   element={<Layout><Compressor /></Layout>} />
          <Route path="/tools/convert"    element={<Layout><FormatConverter /></Layout>} />
          <Route path="/tools/optimizer"  element={<Layout><WebOptimizer /></Layout>} />
          <Route path="/tools/profile"    element={<Layout><ProfilePicture /></Layout>} />
          <Route path="/tools/palette"    element={<Layout><PaletteExtractor /></Layout>} />
          <Route path="/tools/favicon"    element={<Layout><FaviconGen /></Layout>} />

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
    <Suspense fallback={<LoadingScreen message="Loading MianPix…" />}>
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
