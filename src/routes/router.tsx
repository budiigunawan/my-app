import { createBrowserRouter } from 'react-router';
import { Layout } from '@/components/layout';
import { Button, HStack } from '@chakra-ui/react';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <HStack>
            <Button>Click me</Button>
          </HStack>
        ),
      },
    ],
  },
]);
