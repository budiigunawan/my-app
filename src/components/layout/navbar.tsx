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
import { Link } from 'react-router';
import { GiHamburgerMenu } from 'react-icons/gi';

export const Navbar = () => {
  const isAuthenticated = false;

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
          <Link to={'/'}>
            <img src={viteLogo} alt="Vite Logo" />
            <Text fontWeight={'bold'} fontSize={'larger'}>
              MyApp
            </Text>
          </Link>
        </ChakraLink>
        {isAuthenticated && (
          <Menu.Root>
            <Menu.Trigger _focus={{ outline: 'none' }}>
              <Button variant="outline" size="sm">
                <GiHamburgerMenu />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="rename">Logout</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        )}
      </Flex>
    </Box>
  );
};
