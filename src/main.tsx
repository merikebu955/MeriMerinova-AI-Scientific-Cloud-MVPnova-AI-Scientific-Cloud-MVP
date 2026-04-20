import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// --- MAIOS SYSTEM LOG INTERCEPTOR ---
// Filters out technical info messages from TensorFlow/MediaPipe to keep the console clean.
const silenceTechnicalLogs = (orig: any) => (...args: any[]) => {
  const msg = args[0];
  if (typeof msg === 'string' && (
    msg.includes('XNNPACK delegate') || 
    msg.includes('TensorFlow Lite') ||
    msg.includes('Created TensorFlow Lite')
  )) {
    return;
  }
  orig.apply(console, args);
};

console.info = silenceTechnicalLogs(console.info);
console.log = silenceTechnicalLogs(console.log);
console.warn = silenceTechnicalLogs(console.warn);
console.error = silenceTechnicalLogs(console.error);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
