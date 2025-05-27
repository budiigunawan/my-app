import { Flex, Stack, Field, Input, Box } from '@chakra-ui/react';
import { IoPersonSharp } from 'react-icons/io5';
import { ImageUpload } from './image-upload';
// import { Toaster, toaster } from '../ui/toaster';
// import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import type { ProfileData } from '@/lib/types';
import { useEffect } from 'react';
import Select from 'react-select';

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
  data: ProfileData;
};

export const EditBasicDetails = ({ isMobile, data }: EditBasicDetailsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<BasicDetailsForm>();

  const options = [
    { value: 'Mr.', label: 'Mr.' },
    { value: 'Ms.', label: 'Ms.' },
    { value: 'Mrs.', label: 'Mrs.' },
  ];

  const onSubmit = (formData: BasicDetailsForm) => {
    // Call your API here using axios or fetch
    console.log('Submitted Data:', formData);
  };

  useEffect(() => {
    if (data) {
      reset({
        salutation: { value: data.salutation, label: data.salutation },
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.user.email,
      });
    }
  }, [data, reset]);

  console.log(data?.firstName, 'd');

  return (
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
            <Box width={'100%'}>
              <Controller
                control={control}
                name="salutation"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
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
                      control: (baseStyles, state) => ({
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
          <Field.Root invalid={!!errors.firstName} required>
            <Field.Label fontWeight={'bold'}>
              First name <Field.RequiredIndicator color={'black'} />
            </Field.Label>
            <Input
              {...register('firstName', { required: 'First name is required' })}
              border={'1px solid black'}
              backgroundColor={'rgba(208,208,208,0.3)'}
            />
          </Field.Root>
          <Field.Root invalid={!!errors.lastName} required>
            <Field.Label fontWeight={'bold'}>
              Last name <Field.RequiredIndicator color={'black'} />
            </Field.Label>
            <Input
              {...register('lastName', { required: 'Last name is required' })}
              border={'1px solid black'}
              backgroundColor={'rgba(208,208,208,0.3)'}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label fontWeight={'bold'}>
              Email address <Field.RequiredIndicator color={'black'} />
            </Field.Label>
            <Input
              {...register('email')}
              border={'1px solid black'}
              backgroundColor={'rgba(208,208,208,0.3)'}
              disabled
            />
          </Field.Root>
        </Stack>
      </Flex>
    </form>
  );
};
