import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './styles.css';
import './pages.css';
import './motion.css';
import App from './App';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
