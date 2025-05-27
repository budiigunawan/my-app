import { Stack, Field, Input, Flex, Button, HStack } from '@chakra-ui/react';
import axios from 'axios';
import { Toaster, toaster } from '../ui/toaster';
import { useForm, Controller } from 'react-hook-form';
import type { ProfileData } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import { useCookies } from 'react-cookie';

type SpouseDetailsForm = {
  spouseSalutation: {
    value: string;
    label: string;
  };
  spouseFirstName: string;
  spouseLastName: string;
};

type EditSpouseDetailsProps = {
  isMobile?: boolean;
  data: ProfileData;
  revalidateProfileData: () => {};
};

export const EditSpouseDetails = ({
  isMobile,
  data,
  revalidateProfileData,
}: EditSpouseDetailsProps) => {
  const [cookies] = useCookies(['token']);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<SpouseDetailsForm>();

  const salutationOptions = [
    { value: 'Mr.', label: 'Mr.' },
    { value: 'Ms.', label: 'Ms.' },
    { value: 'Mrs.', label: 'Mrs.' },
  ];

  const onSubmit = async (formData: SpouseDetailsForm) => {
    try {
      setIsLoading(true);

      const { userId, user, ...payloadDefaultValue } = data;
      const payload = {
        ...payloadDefaultValue,
        spouseSalutation: formData.spouseSalutation.value,
        spouseFirstName: formData.spouseFirstName,
        spouseLastName: formData.spouseLastName,
      };
      await axios.put('https://bambino-api.budigunawan.com/profile', payload, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
      });

      toaster.create({
        title: 'Spouse details edited',
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
        title: 'Edit spouse details failed',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        spouseSalutation: {
          value: data.spouseSalutation ?? '',
          label: data.spouseSalutation ?? '',
        },
        spouseFirstName: data.spouseFirstName || '',
        spouseLastName: data.spouseLastName || '',
      });
    }
  }, [data, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={isMobile ? '16px' : 0}>
          <Field.Root invalid={!!errors.spouseSalutation}>
            <Field.Label fontWeight={'bold'}>Salutation</Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Controller
                control={control}
                name="spouseSalutation"
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
                {errors.spouseSalutation?.message}
              </Field.ErrorText>
            </Flex>
          </Field.Root>
          <Field.Root invalid={!!errors.spouseFirstName}>
            <Field.Label fontWeight={'bold'}>First name</Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Input
                {...register('spouseFirstName', {
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
                {errors.spouseFirstName?.message}
              </Field.ErrorText>
            </Flex>
          </Field.Root>
          <Field.Root invalid={!!errors.spouseLastName}>
            <Field.Label fontWeight={'bold'}>Last name</Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Input
                {...register('spouseLastName', {
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
                {errors.spouseLastName?.message}
              </Field.ErrorText>
            </Flex>
          </Field.Root>

          <HStack mt={'24px'}>
            <Button
              width={'50%'}
              borderRadius={0}
              type="submit"
              loading={isLoading}
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
