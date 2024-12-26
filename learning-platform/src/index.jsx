import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Use BrowserRouter
import { Provider } from 'react-redux'; 
import store from './store/index'; 
import AppRoutes from './Routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter> {/* Wrap with BrowserRouter */}
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
