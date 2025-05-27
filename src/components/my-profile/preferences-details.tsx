import type { ProfileData } from '@/lib/types';
import { Stack, Field, Badge, Wrap } from '@chakra-ui/react';

type PreferencesDetailsProps = {
  isMobile?: boolean;
  data: ProfileData;
};

export const PreferencesDetails = ({
  isMobile,
  data,
}: PreferencesDetailsProps) => {
  return (
    <Stack p={isMobile ? '16px' : 0}>
      <Field.Root mt={2}>
        <Field.Label fontWeight={'bold'}>Hobbies and interests</Field.Label>
        <Wrap gap={'2'}>
          {data.hobbies.map((hobby) => (
            <Badge key={hobby}>{hobby}</Badge>
          ))}
        </Wrap>
      </Field.Root>
      <Field.Root mt={2}>
        <Field.Label fontWeight={'bold'}>{`Favorite sport(s)`}</Field.Label>
        <Wrap gap={'2'}>
          {data.sports.map((sport) => (
            <Badge key={sport}>{sport}</Badge>
          ))}
        </Wrap>
      </Field.Root>
      <Field.Root mt={2}>
        <Field.Label
          fontWeight={'bold'}
        >{`Preferred music genre(s)`}</Field.Label>
        <Wrap gap={'2'}>
          {data.musics.map((music) => (
            <Badge key={music}>{music}</Badge>
          ))}
        </Wrap>
      </Field.Root>
      <Field.Root mt={2}>
        <Field.Label
          fontWeight={'bold'}
        >{`Preferred movie/TV show(s)`}</Field.Label>
        <Wrap gap={'2'}>
          {data.movies.map((movie) => (
            <Badge key={movie}>{movie}</Badge>
          ))}
        </Wrap>
      </Field.Root>
    </Stack>
  );
};
