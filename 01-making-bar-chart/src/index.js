import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App width={width} height={height} margin={margin} />
  </React.StrictMode>
);
