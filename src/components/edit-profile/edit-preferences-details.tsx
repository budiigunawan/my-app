import type { ProfileData } from '@/lib/types';
import { Stack, Field, Flex, HStack, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import Select from 'react-select';
import { Toaster, toaster } from '../ui/toaster';
import axios from 'axios';

type Option = {
  value: string;
  label: string;
};

type PreferencesDetailsForm = {
  hobbies: Option[];
  sports: Option[];
  musics: Option[];
  movies: Option[];
};

type EditPreferencesDetailsProps = {
  isMobile?: boolean;
  data: ProfileData;
  revalidateProfileData: () => {};
};

export const EditPreferencesDetails = ({
  isMobile,
  data,
  revalidateProfileData,
}: EditPreferencesDetailsProps) => {
  const [cookies] = useCookies(['token']);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<PreferencesDetailsForm>();

  const hobbyOptions: Option[] = [
    { label: 'Reading', value: 'Reading' },
    { label: 'Traveling', value: 'Traveling' },
    { label: 'Drawing', value: 'Drawing' },
    { label: 'Gaming', value: 'Gaming' },
  ];

  const sportOptions: Option[] = [
    { label: 'Football', value: 'Football' },
    { label: 'Basketball', value: 'Basketball' },
    { label: 'Badminton', value: 'Badminton' },
    { label: 'Tennis', value: 'Tennis' },
    { label: 'Swimming', value: 'Swimming' },
  ];

  const musicOptions: Option[] = [
    { label: 'Pop', value: 'Pop' },
    { label: 'Rock', value: 'Rock' },
    { label: 'Jazz', value: 'Jazz' },
  ];

  const movieOptions: Option[] = [
    { label: 'Horror', value: 'Horror' },
    { label: 'Comedy', value: 'Comedy' },
    { label: 'Romance', value: 'Romance' },
  ];

  const onSubmit = async (formData: PreferencesDetailsForm) => {
    try {
      setIsLoading(true);

      const { userId, user, ...payloadDefaultValue } = data;
      const payload = {
        ...payloadDefaultValue,
        hobbies: formData.hobbies.map((hobby) => hobby.value),
        sports: formData.sports.map((sport) => sport.value),
        musics: formData.musics.map((music) => music.value),
        movies: formData.movies.map((movie) => movie.value),
      };

      await axios.put('https://bambino-api.budigunawan.com/profile', payload, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
      });

      toaster.create({
        title: 'Preferences details edited',
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
        title: 'Edit preferences details failed',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        hobbies:
          data?.hobbies?.map((hobby) => ({
            value: hobby,
            label: hobby,
          })) || [],
        sports:
          data?.sports?.map((sport) => ({
            value: sport,
            label: sport,
          })) || [],
        musics:
          data?.musics?.map((music) => ({
            value: music,
            label: music,
          })) || [],
        movies:
          data?.movies?.map((movie) => ({
            value: movie,
            label: movie,
          })) || [],
      });
    }
  }, [data, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={isMobile ? '16px' : 0}>
          <Field.Root invalid={!!errors.hobbies}>
            <Field.Label fontWeight={'bold'}>Hobbies and interests</Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Controller
                control={control}
                name="hobbies"
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={hobbyOptions}
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
                {errors.hobbies?.message}
              </Field.ErrorText>
            </Flex>
          </Field.Root>
          <Field.Root invalid={!!errors.sports}>
            <Field.Label fontWeight={'bold'}>{`Favorite sport(s)`}</Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Controller
                control={control}
                name="sports"
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={sportOptions}
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
              <Field.ErrorText mt={1}>{errors.sports?.message}</Field.ErrorText>
            </Flex>
          </Field.Root>
          <Field.Root invalid={!!errors.musics}>
            <Field.Label
              fontWeight={'bold'}
            >{`Preferred music genre(s)`}</Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Controller
                control={control}
                name="musics"
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={musicOptions}
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
              <Field.ErrorText mt={1}>{errors.musics?.message}</Field.ErrorText>
            </Flex>
          </Field.Root>
          <Field.Root invalid={!!errors.movies}>
            <Field.Label
              fontWeight={'bold'}
            >{`Preferred movie/TV show genre(s)`}</Field.Label>
            <Flex flexDirection={'column'} width={'100%'}>
              <Controller
                control={control}
                name="movies"
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={movieOptions}
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
              <Field.ErrorText mt={1}>{errors.movies?.message}</Field.ErrorText>
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
