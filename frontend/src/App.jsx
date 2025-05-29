import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

const App = () => (
  <ApiProvider>
    <Router>
      <AppRoutes />
    </Router>
  </ApiProvider>
);

export default App;

