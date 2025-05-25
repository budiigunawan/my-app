import {
  Box,
  Flex,
  Link as ChakraLink,
  Text,
  Menu,
  Button,
  Portal,
} from '@chakra-ui/react';
import viteLogo from '/vite.svg';
import { Link, useNavigate } from 'react-router';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useCookies } from 'react-cookie';

export const Navbar = () => {
  const [cookies, _, removeCookies] = useCookies(['token']);
  const isAuthenticated = !!cookies.token;
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookies('token', { path: '/' });
    navigate('/login');
  };

  return (
    <Box position={'fixed'} top={0} width={'100%'} zIndex={10}>
      <Flex
        maxW={{ xl: '1152px', lg: '896px', md: '672px' }}
        height={'56px'}
        justifyContent={'space-between'}
        px={{ base: '16px', md: 0 }}
      >
        <ChakraLink
          asChild
          display={'flex'}
          _hover={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
        >
          <Link to={'/home'}>
            <img src={viteLogo} alt="Vite Logo" />
            <Text fontWeight={'bold'} fontSize={'larger'}>
              myApp
            </Text>
          </Link>
        </ChakraLink>
        {isAuthenticated && (
          <Menu.Root>
            <Menu.Trigger _focus={{ outline: 'none' }}>
              <Button as={'div'} variant="ghost" size="xl">
                <GiHamburgerMenu />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="home" asChild>
                    <Link to={'/'}>Home</Link>
                  </Menu.Item>
                  <Menu.Item value="my-profile" asChild>
                    <Link to={'/my-profile'}>My Profile</Link>
                  </Menu.Item>
                  <Menu.Item value="edit-profile" asChild>
                    <Link to={'/edit-profile'}>Edit Profile</Link>
                  </Menu.Item>
                  <Menu.Item value="logout" onClick={handleLogout}>
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        )}
      </Flex>
    </Box>
  );
};
