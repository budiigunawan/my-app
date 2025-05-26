import { HStack, Text } from '@chakra-ui/react';

export const Home = () => {
  return (
    <HStack pt={'80px'} px={{ base: '16px', md: 0 }}>
      <Text as={'h1'} fontSize={'5xl'} fontWeight={'bold'}>
        Home
      </Text>
    </HStack>
  );
};
