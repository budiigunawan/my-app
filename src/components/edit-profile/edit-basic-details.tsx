import {
  Flex,
  Stack,
  Field,
  Input,
  Box,
  Button,
  HStack,
} from '@chakra-ui/react';
import { IoPersonSharp } from 'react-icons/io5';
import { ImageUpload } from './image-upload';
import { Toaster, toaster } from '../ui/toaster';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import type { ProfileData } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import { useCookies } from 'react-cookie';

type BasicDetailsForm = {
  salutation: {
    value: string;
    label: string;
  };
  firstName: string;
  lastName: string;
  email: string;
};

type EditBasicDetailsProps = {
  isMobile?: boolean;
  isNewProfile: boolean;
  data: ProfileData;
  revalidateProfileData: () => {};
};

export const EditBasicDetails = ({
  isMobile,
  isNewProfile,
  data,
  revalidateProfileData,
}: EditBasicDetailsProps) => {
  const [cookies] = useCookies(['token']);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm<BasicDetailsForm>();
  const salutation = watch('salutation');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');

  const salutationOptions = [
    { value: 'Mr.', label: 'Mr.' },
    { value: 'Ms.', label: 'Ms.' },
    { value: 'Mrs.', label: 'Mrs.' },
  ];

  const onSubmit = async (formData: BasicDetailsForm) => {
    try {
      setIsLoading(true);

      const { userId, user, ...payloadDefaultValue } = data;
      const payload = {
        ...payloadDefaultValue,
        salutation: formData.salutation.value,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      await axios({
        method: isNewProfile ? 'post' : 'put',
        url: 'https://bambino-api.budigunawan.com/profile',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
        data: payload,
      });

      toaster.create({
        title: 'Basic details edited',
        type: 'success',
        onStatusChange({ status }) {
          if (status === 'unmounted') {
            revalidateProfileData();
          }
        },
      });
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Edit basic details failed',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        salutation: {
          value: data.salutation ?? '',
          label: data.salutation ?? '',
        },
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.user.email,
      });
    }
  }, [data, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          gap={isMobile ? '20px' : '40px'}
          flexDirection={isMobile ? 'column' : 'row'}
          p={isMobile ? '16px' : 0}
        >
          <Box>
            <IoPersonSharp size={'8em'} />
            <ImageUpload />
          </Box>
          <Stack width={'50%'}>
            <Field.Root invalid={!!errors.salutation} required>
              <Field.Label fontWeight={'bold'}>
                Salutation <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <Flex flexDirection={'column'} width={'100%'}>
                <Controller
                  control={control}
                  rules={{ required: 'Salutation is required' }}
                  name="salutation"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={salutationOptions}
                      onChange={(val) => field.onChange(val)}
                      value={field.value}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: '#D0D0D0',
                          primary: 'black',
                        },
                      })}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          backgroundColor: 'rgba(208,208,208,0.3)',
                          border: '1px solid black',
                          color: 'black',
                        }),
                      }}
                    />
                  )}
                />
                <Field.ErrorText mt={1}>
                  {errors.salutation?.message}
                </Field.ErrorText>
              </Flex>
            </Field.Root>
            <Field.Root invalid={!!errors.firstName} required>
              <Field.Label fontWeight={'bold'}>
                First name <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <Flex flexDirection={'column'} width={'100%'}>
                <Input
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters',
                    },
                  })}
                  border={'1px solid black'}
                  backgroundColor={'rgba(208,208,208,0.3)'}
                  borderRadius={0}
                />
                <Field.ErrorText mt={1}>
                  {errors.firstName?.message}
                </Field.ErrorText>
              </Flex>
            </Field.Root>
            <Field.Root invalid={!!errors.lastName} required>
              <Field.Label fontWeight={'bold'}>
                Last name <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <Flex flexDirection={'column'} width={'100%'}>
                <Input
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters',
                    },
                  })}
                  border={'1px solid black'}
                  backgroundColor={'rgba(208,208,208,0.3)'}
                  borderRadius={0}
                />
                <Field.ErrorText mt={1}>
                  {errors.lastName?.message}
                </Field.ErrorText>
              </Flex>
            </Field.Root>
            <Field.Root required>
              <Field.Label fontWeight={'bold'}>
                Email address <Field.RequiredIndicator color={'black'} />
              </Field.Label>
              <Input
                {...register('email')}
                border={'1px solid black'}
                backgroundColor={'rgba(208,208,208,0.3)'}
                borderRadius={0}
                disabled
              />
            </Field.Root>

            <HStack mt={'24px'}>
              <Button
                width={'50%'}
                borderRadius={0}
                type="submit"
                loading={isLoading}
                disabled={!salutation || !firstName || !lastName || !email}
              >
                {`Save & Update`}
              </Button>
              <Button
                width={'50%'}
                borderRadius={0}
                variant={'outline'}
                border={'1px solid black'}
                asChild
              >
                <Link to={'/my-profile'}>Cancel</Link>
              </Button>
            </HStack>
          </Stack>
        </Flex>
      </form>
      <Toaster />
    </>
  );
};
