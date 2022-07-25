import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const width = window.innerWidth * 0.9;
const height = 400;
const margin = {
  top: 15,
  right: 15,
  bottom: 40,
  left: 60
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App width={width} height={height} margin={margin} />
  </React.StrictMode>
);
