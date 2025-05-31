import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NotFound from '../pages/NotFound/index';
import RoomLimit from '../pages/RoomLimit/index';
import RoomLobby from '../pages/RoomLobby';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/room/limit/:room" element={<RoomLimit />} />
    <Route path="/room/lobby" element={<RoomLobby />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
