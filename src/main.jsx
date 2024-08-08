import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { R3fPreview } from './R3fPreview';
import './styles.css';
import './three';

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <R3fPreview />
    </StrictMode>,
  );
} catch {
  console.info('R3F failed to render');
}
