import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage/index';
import AboutPage from '../pages/AboutPage';
import NotFound from '../pages/NotFound/index';
import RoomLimit from '../pages/RoomLimit/index';
import RoomLobby from '../pages/RoomLobby';
import LoginPage from '../pages/LoginPage';
import DashPage from '../pages/DashPage/index';
import RecoveryPassword from '../pages/RecoveyPassword';

import { publicLoader } from './loaders/publicLoader';
import { protectedLoader } from './loaders/protectedLoader';
import { verifyTokenSalaLoader } from './loaders/verifyTokenSalaLoader';
import { verifyTokenRecoveryLoader } from './loaders/verifyTokenRecoveryLoader';

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: publicLoader
  },
  {
    path: '/dashboard',
    element: <DashPage />,
    loader: protectedLoader
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/room/limit/:room',
    element: <RoomLimit />
  },
  {
    path: '/room/lobby',
    element: <RoomLobby />,
    loader: verifyTokenSalaLoader
  },
  {
    path: '/room/lobby/:room',
    element: <RoomLobby />,
    loader: verifyTokenSalaLoader
  },
  {
    path: '/recuperar-senha/:token',
    element: <RecoveryPassword />,
    loader: verifyTokenRecoveryLoader
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default AppRoutes;
