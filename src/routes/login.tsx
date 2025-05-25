import { toaster, Toaster } from '@/components/ui/toaster';
import {
  Box,
  Button,
  Checkbox,
  Field,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Link as ChakraLink,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { BiShow, BiHide } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router';

type LoginForm = {
  email: string;
  password: string;
  keepMeLoggedIn: string | boolean;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const togglePasswordElement = (
    <IconButton
      variant={'ghost'}
      _hover={{ background: 'transparent' }}
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <BiHide /> : <BiShow />}
    </IconButton>
  );

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://bambino-api.budigunawan.com/auth/login',
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      const token = response.data.token;
      if (token) {
        setCookie('token', token, {
          path: '/',
          maxAge:
            // 1 year if true, 1 day if false
            data.keepMeLoggedIn === 'on' ? 60 * 60 * 24 * 365 : 60 * 60 * 24,
          sameSite: 'lax',
        });

        navigate('/my-profile');
      }
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Your email and/or password does not match',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                Email
                <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <Input
                {...register('email', { required: 'Email is required' })}
                border={'1px solid black'}
                type="email"
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
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
              <InputGroup endElement={togglePasswordElement}>
                <Input
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  border={'1px solid black'}
                  type={showPassword ? 'text' : 'password'}
                />
              </InputGroup>
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Checkbox.Root
              width={'70%'}
              my={'8px'}
              {...register('keepMeLoggedIn')}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control border={'1px solid black'} />
              <Checkbox.Label>Keep me logged in</Checkbox.Label>
            </Checkbox.Root>

            <Button width={'70%'} type="submit" loading={isLoading}>
              Login
            </Button>
          </Stack>
        </form>
      </Flex>
      <Flex justifyContent={'center'} mt={'32px'} gap={'4px'}>
        <Text>No account?</Text>
        <ChakraLink
          asChild
          variant={'underline'}
          fontWeight={'medium'}
          textDecorationColor={'black'}
        >
          <Link to={'/register'}>Register here.</Link>
        </ChakraLink>
      </Flex>
      <Toaster />
    </Box>
  );
};
