import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { appRoute } from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';

ReactDOM.render(
    <RouterProvider router={appRoute}/>,
  document.getElementById('root')
);
reportWebVitals();
