import { createBrowserRouter } from 'react-router';
import { Layout } from '@/components/layout';
import { HStack } from '@chakra-ui/react';
import { EditProfile, Login, MyProfile, Register } from './index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <HStack pt={'80px'} px={{ base: '16px', md: 0 }}>
            <h1>Home</h1>
          </HStack>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
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
]);
