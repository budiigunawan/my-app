import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import { Navbar } from './navbar';

export const Layout = () => {
  return (
    <Box
      as={'main'}
      bgSize={'cover'}
      bgRepeat={'no-repeat'}
      bgImage={
        'url(https://ucarecdn.com/7ae9aa34-28c8-496a-a9da-3deb7f40e51f/-/preview/1000x666/)'
      }
      minH={'100vh'}
    >
      <Box maxW={{ xl: '1152px', lg: '896px', md: '672px' }} mx={'auto'}>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
};
