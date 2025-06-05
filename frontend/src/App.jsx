import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import { SocketProvider } from './context/SocketContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import './App.css';

const App = () => (
  <SocketProvider>
    <ApiProvider>
      <Router>
        <ToastContainer/>
        <AppRoutes />
      </Router>
    </ApiProvider>
  </SocketProvider>
);

export default App;

