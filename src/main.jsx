import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// Self-hosted Gelasio (body copy) and Oswald (menu labels, titles, HUD text),
// loaded once here instead of in every component that renders text in them.
import '@fontsource/gelasio/400.css';
import '@fontsource/gelasio/700.css';
import '@fontsource/oswald/700.css';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
