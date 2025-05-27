import { toaster, Toaster } from '@/components/ui/toaster';
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
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiShow, BiHide } from 'react-icons/bi';
import { useNavigate, Link } from 'react-router';

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const username = watch('username');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

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

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      await axios.post(
        'https://bambino-api.budigunawan.com/auth/register',
        {
          username: data.username,
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
      toaster.create({
        title: 'Account created',
        type: 'success',
        onStatusChange({ status }) {
          if (status === 'unmounted') {
            navigate('/login');
          }
        },
      });
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Registration failed',
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
            <Field.Root flexDir={'row'} invalid={!!errors.username} required>
              <Field.Label
                justifyContent={'flex-end'}
                width={'40%'}
                gap={0}
                fontSize={{ md: 'lg', base: 'sm' }}
              >
                Username <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <Flex flexDirection={'column'} width={'100%'}>
                <Input
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 6,
                      message: 'Username must be at least 6 characters',
                    },
                  })}
                  border={'1px solid black'}
                />
                <Field.ErrorText mt={1}>
                  {errors.username?.message}
                </Field.ErrorText>
              </Flex>
            </Field.Root>

            <Field.Root
              flexDir={'row'}
              alignItems={'center'}
              invalid={!!errors.email}
              required
            >
              <Field.Label
                justifyContent={'flex-end'}
                width={'40%'}
                gap={0}
                fontSize={{ md: 'lg', base: 'sm' }}
              >
                Email <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <Flex flexDirection={'column'} width={'100%'}>
                <Input
                  {...register('email', { required: 'Email is required' })}
                  border={'1px solid black'}
                  type="email"
                />
                <Field.ErrorText mt={1}>
                  {errors.email?.message}
                </Field.ErrorText>
              </Flex>
            </Field.Root>

            <Field.Root
              flexDir={'row'}
              alignItems={'center'}
              invalid={!!errors.password}
              required
            >
              <Field.Label
                justifyContent={'flex-end'}
                width={'40%'}
                gap={0}
                fontSize={{ md: 'lg', base: 'sm' }}
              >
                Password <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <Flex flexDirection={'column'} width={'100%'}>
                <InputGroup
                  endElement={togglePasswordElement(false, showPassword)}
                >
                  <Input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    border={'1px solid black'}
                    type={showPassword ? 'text' : 'password'}
                  />
                </InputGroup>
                <Field.ErrorText mt={1}>
                  {errors.password?.message}
                </Field.ErrorText>
              </Flex>
            </Field.Root>

            <Field.Root
              flexDir={'row'}
              alignItems={'center'}
              invalid={!!errors.confirmPassword}
              required
            >
              <Field.Label
                justifyContent={'flex-end'}
                width={'40%'}
                gap={0}
                fontSize={{ md: 'lg', base: 'sm' }}
              >
                Confirm Password <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <Flex flexDirection={'column'} width={'100%'}>
                <InputGroup
                  endElement={togglePasswordElement(true, showConfirmPassword)}
                >
                  <Input
                    {...register('confirmPassword', {
                      validate: (val) =>
                        val === watch('password') || 'Password does not match',
                    })}
                    border={'1px solid black'}
                    type={showConfirmPassword ? 'text' : 'password'}
                  />
                </InputGroup>
                <Field.ErrorText mt={1}>
                  {errors.confirmPassword?.message}
                </Field.ErrorText>
              </Flex>
            </Field.Root>

            <Button
              width={'70%'}
              type="submit"
              loading={isLoading}
              disabled={!username || !email || !password || !confirmPassword}
            >
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
      <Toaster />
    </Box>
  );
};
