import type { ProfileData } from '@/lib/types';
import { Stack, Field, Badge, Wrap } from '@chakra-ui/react';
import { useMemo } from 'react';

type PreferencesDetailsProps = {
  isMobile?: boolean;
  data: ProfileData;
};

export const PreferencesDetails = ({
  isMobile,
  data,
}: PreferencesDetailsProps) => {
  const selectedHobbies: string[] = useMemo(() => {
    if (data.hobbies) {
      return data.hobbies.split(', ');
    }

    return [];
  }, [data.hobbies]);

  const selectedSports: string[] = useMemo(() => {
    if (data.sports) {
      return data.sports.split(', ');
    }

    return [];
  }, [data.sports]);

  const selectedMusicGenres: string[] = useMemo(() => {
    if (data.musics) {
      return data.musics.split(', ');
    }

    return [];
  }, [data.musics]);

  const selectedMovies: string[] = useMemo(() => {
    if (data.movies) {
      return data.movies.split(', ');
    }

    return [];
  }, [data.movies]);

  return (
    <Stack p={isMobile ? '16px' : 0}>
      <Field.Root mt={2}>
        <Field.Label fontWeight={'bold'}>Hobbies and interests</Field.Label>
        <Wrap gap={'2'}>
          {selectedHobbies.map((hobby) => (
            <Badge key={hobby}>{hobby}</Badge>
          ))}
        </Wrap>
      </Field.Root>
      <Field.Root mt={2}>
        <Field.Label fontWeight={'bold'}>{`Favorite sport(s)`}</Field.Label>
        <Wrap gap={'2'}>
          {selectedSports.map((sport) => (
            <Badge key={sport}>{sport}</Badge>
          ))}
        </Wrap>
      </Field.Root>
      <Field.Root mt={2}>
        <Field.Label
          fontWeight={'bold'}
        >{`Preferred music genre(s)`}</Field.Label>
        <Wrap gap={'2'}>
          {selectedMusicGenres.map((music) => (
            <Badge key={music}>{music}</Badge>
          ))}
        </Wrap>
      </Field.Root>
      <Field.Root mt={2}>
        <Field.Label
          fontWeight={'bold'}
        >{`Preferred movie/TV show(s)`}</Field.Label>
        <Wrap gap={'2'}>
          {selectedMovies.map((movie) => (
            <Badge key={movie}>{movie}</Badge>
          ))}
        </Wrap>
      </Field.Root>
    </Stack>
  );
};
