import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// entry point used by Vite; render into #react-root injected by PHP
const root = document.getElementById('react-root');
if (root) {
  ReactDOM.createRoot(root).render(<App />);
}
