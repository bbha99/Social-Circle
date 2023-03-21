import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './providers/AuthProvider';
import TopicProvider from './providers/TopicProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <TopicProvider>
          <App />
        </TopicProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);