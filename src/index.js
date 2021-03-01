import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "./fbase";
import App from './components/App';
import "./style.css";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

