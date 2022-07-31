import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const width = window.innerWidth * 0.9;
const height = 400;
const margin = {
  top: 30,
  right: 50,
  bottom: 50,
  left: 50
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App width={width} height={height} margin={margin} />
  </React.StrictMode>
);