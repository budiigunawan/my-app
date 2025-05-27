import type { ProfileData } from '@/lib/types';
import {
  Stack,
  Field,
  Input,
  Box,
  Button,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { Toaster, toaster } from '../ui/toaster';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Link } from 'react-router';
import { isBefore, subYears } from 'date-fns';

type AdditionalDetailsForm = {
  address: string;
  country: string;
  postalCode: string;
  dateOfBirth?: string;
  gender?: {
    value: string;
    label: string;
  };
  maritalStatus?: {
    value: string;
    label: string;
  };
};

type EditAdditionalDetailsProps = {
  isMobile?: boolean;
  data: ProfileData;
  revalidateProfileData: () => {};
};

export const EditAdditionalDetails = ({
  isMobile,
  data,
  revalidateProfileData,
}: EditAdditionalDetailsProps) => {
  const [cookies] = useCookies(['token']);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm<AdditionalDetailsForm>();
  const address = watch('address');
  const country = watch('country');
  const postalCode = watch('postalCode');

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];
  const maritalOptions = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
  ];

  const onSubmit = async (formData: AdditionalDetailsForm) => {
    try {
      setIsLoading(true);

      const { userId, user, ...payloadDefaultValue } = data;
      const payload = {
        ...payloadDefaultValue,
        address: formData.address,
        country: formData.country,
        postalCode: formData.postalCode,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender?.value,
        maritalStatus: formData.maritalStatus?.value,
      };
      await axios.put('https://bambino-api.budigunawan.com/profile', payload, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
      });

      toaster.create({
        title: 'Additional details edited',
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
        title: 'Edit additional details failed',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        address: data.address || '',
        country: data.country || '',
        postalCode: data.postalCode || '',
        dateOfBirth: data.dateOfBirth.slice(0, 10) || '',
        gender: {
          value: data.gender ?? '',
          label: data.gender ?? '',
        },
        maritalStatus: {
          value: data.maritalStatus ?? '',
          label: data.maritalStatus ?? '',
        },
      });
    }
  }, [data, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={isMobile ? '16px' : 0}>
          <Field.Root invalid={!!errors.address} required>
            <Field.Label fontWeight={'bold'}>
              Home address <Field.RequiredIndicator color={'black'} />
            </Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Input
                {...register('address', {
                  required: 'Address is required',
                  minLength: {
                    value: 5,
                    message: 'Address must be at least 5 characters',
                  },
                })}
                border={'1px solid black'}
                backgroundColor={'rgba(208,208,208,0.3)'}
                borderRadius={0}
              />
              <Field.ErrorText mt={1}>
                {errors.address?.message}
              </Field.ErrorText>
            </Flex>
          </Field.Root>
          <Field.Root invalid={!!errors.country} required>
            <Field.Label fontWeight={'bold'}>
              Country <Field.RequiredIndicator color={'black'} />
            </Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Input
                {...register('country', {
                  required: 'Country is required',
                  minLength: {
                    value: 5,
                    message: 'Country must be at least 5 characters',
                  },
                })}
                border={'1px solid black'}
                backgroundColor={'rgba(208,208,208,0.3)'}
                borderRadius={0}
              />
              <Field.ErrorText mt={1}>
                {errors.country?.message}
              </Field.ErrorText>
            </Flex>
          </Field.Root>
          <Field.Root invalid={!!errors.postalCode} required>
            <Field.Label fontWeight={'bold'}>
              Postal code <Field.RequiredIndicator color={'black'} />
            </Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Input
                {...register('postalCode', {
                  required: 'Postal code is required',
                  minLength: {
                    value: 5,
                    message: 'Postal code must be at least 5 characters',
                  },
                })}
                border={'1px solid black'}
                backgroundColor={'rgba(208,208,208,0.3)'}
                borderRadius={0}
              />
              <Field.ErrorText mt={1}>
                {errors.country?.message}
              </Field.ErrorText>
            </Flex>
          </Field.Root>
          <Field.Root invalid={!!errors.dateOfBirth}>
            <Field.Label fontWeight={'bold'}>Date of birth</Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Input
                {...register('dateOfBirth', {
                  validate: (value: any) => {
                    const minDate = subYears(new Date(), 17);
                    if (!isBefore(new Date(value), minDate)) {
                      return 'You must be at least 17 years old';
                    }
                    return true;
                  },
                })}
                border={'1px solid black'}
                backgroundColor={'rgba(208,208,208,0.3)'}
                borderRadius={0}
                type="date"
              />
              <Field.ErrorText mt={1}>
                {errors.dateOfBirth?.message}
              </Field.ErrorText>
            </Flex>
          </Field.Root>
          <Field.Root>
            <Field.Label fontWeight={'bold'}>Gender</Field.Label>
            <Box width={'100%'}>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={genderOptions}
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
            </Box>
          </Field.Root>
          <Field.Root>
            <Field.Label fontWeight={'bold'}>Marital status</Field.Label>
            <Box width={'100%'}>
              <Controller
                control={control}
                name="maritalStatus"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={maritalOptions}
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
            </Box>
          </Field.Root>

          <HStack mt={'24px'}>
            <Button
              width={'50%'}
              borderRadius={0}
              type="submit"
              loading={isLoading}
              disabled={!address || !country || !postalCode}
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
      </form>
      <Toaster />
    </>
  );
};
