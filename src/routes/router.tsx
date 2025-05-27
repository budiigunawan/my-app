import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from '@/components/layout';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { EditProfile, Home, Login, MyProfile, Register } from './index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/home',
            element: <Home />,
          },
          {
            path: '/my-profile',
            element: <MyProfile />,
          },
          {
            path: '/edit-profile',
            element: <EditProfile />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);
