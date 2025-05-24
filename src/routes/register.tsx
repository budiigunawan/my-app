import {
  Box,
  Button,
  Field,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Link as ChakraLink,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { Link } from 'react-router';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordElement = (isConfirm: boolean, currentValue: boolean) => {
    return (
      <IconButton
        variant={'ghost'}
        _hover={{ background: 'transparent' }}
        onClick={() =>
          isConfirm
            ? setShowConfirmPassword(!showConfirmPassword)
            : setShowPassword(!showPassword)
        }
      >
        {currentValue ? <BiHide /> : <BiShow />}
      </IconButton>
    );
  };

  return (
    <Box as={'section'} pt={'220px'} width={{ md: '600px' }} margin={'0 auto'}>
      <Flex direction={'column'} alignItems={'center'}>
        <Text as={'h1'} fontSize={{ md: '5xl', base: '2xl' }}>
          Welcome to{' '}
          <Text as={'span'} fontWeight={'bold'}>
            myApp
          </Text>
        </Text>
        <Box
          height={'4px'}
          width={{ md: '160px', base: '120px' }}
          background={'black'}
        />
      </Flex>
      <Flex
        direction={{ md: 'row-reverse' }}
        justifyContent={{ md: 'normal', base: 'center' }}
      >
        <form>
          <Stack
            width={{ md: '400px' }}
            gap="4"
            maxW="sm"
            mt={'40px'}
            alignItems={{ base: 'flex-end' }}
          >
            <Field.Root flexDir={'row'} alignItems={'center'} required>
              <Field.Label
                justifyContent={'flex-end'}
                width={'40%'}
                gap={0}
                fontSize={{ md: 'lg', base: 'sm' }}
              >
                User ID <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <Input border={'1px solid black'} />
              {/* <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText> */}
            </Field.Root>

            <Field.Root flexDir={'row'} alignItems={'center'} required>
              <Field.Label
                justifyContent={'flex-end'}
                width={'40%'}
                gap={0}
                fontSize={{ md: 'lg', base: 'sm' }}
              >
                Password <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <InputGroup
                endElement={togglePasswordElement(false, showPassword)}
              >
                <Input
                  border={'1px solid black'}
                  type={showPassword ? 'text' : 'password'}
                />
              </InputGroup>
              {/* <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText> */}
            </Field.Root>

            <Field.Root flexDir={'row'} alignItems={'center'} required>
              <Field.Label
                justifyContent={'flex-end'}
                width={'40%'}
                gap={0}
                fontSize={{ md: 'lg', base: 'sm' }}
              >
                Confirm Password <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <InputGroup
                endElement={togglePasswordElement(true, showConfirmPassword)}
              >
                <Input
                  border={'1px solid black'}
                  type={showConfirmPassword ? 'text' : 'password'}
                />
              </InputGroup>
              {/* <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText> */}
            </Field.Root>

            <Button width={'70%'} type="submit">
              Register
            </Button>
          </Stack>
        </form>
      </Flex>
      <Flex justifyContent={'center'} mt={'32px'} gap={'4px'}>
        <Text>Have account?</Text>
        <ChakraLink
          asChild
          variant={'underline'}
          fontWeight={'medium'}
          textDecorationColor={'black'}
        >
          <Link to={'/login'}>Login here.</Link>
        </ChakraLink>
      </Flex>
    </Box>
  );
};
