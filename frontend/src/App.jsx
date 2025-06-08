import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import { SocketProvider } from './context/SocketContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import './App.css';

const App = () => (
  <SocketProvider>
    <ApiProvider>
      <ToastContainer/>
      <RouterProvider router={AppRoutes} />
    </ApiProvider>
  </SocketProvider>
);

export default App;

