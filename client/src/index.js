import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './providers/AuthProvider';
import TopicProvider from './providers/TopicProvider';
import actionCable from 'actioncable';

const CableApp = {};
CableApp.cable = actionCable.createConsumer('ws://localhost:3001/cable');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TopicProvider>
          <App cable={CableApp.cable} />
        </TopicProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);