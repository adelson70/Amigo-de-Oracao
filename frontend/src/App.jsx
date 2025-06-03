import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import { SocketProvider } from './context/SocketContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

const App = () => (
  <SocketProvider>
    <ApiProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ApiProvider>
  </SocketProvider>
);

export default App;

