import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/variables.css';
import './app/styles/global.css';
import App from './app/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
