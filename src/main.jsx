import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/hanken-grotesk';
import './styles.css';
import './components.css';
import './navbar.css';
import './pages.css';
import './motion.css';
import App from './App';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
