import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <Box
      as={'main'}
      maxW={{ xl: '1152px', lg: '896px', md: '672px' }}
      mx={'auto'}
      minH={{ lg: '824px', base: '700px' }}
    >
      <Outlet />
    </Box>
  );
};
