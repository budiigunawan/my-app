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
          <HStack pt={'80px'} px={{ base: '16px', md: 0 }}>
            <Button>Click me</Button>
          </HStack>
        ),
      },
    ],
  },
]);
