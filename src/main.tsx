import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// CRITICAL: Leaflet CSS must be imported before the App component
import 'leaflet/dist/leaflet.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);