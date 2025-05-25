import { Stack, Field, Badge, Wrap } from '@chakra-ui/react';

type EditPreferencesDetailsProps = {
  isMobile?: boolean;
  data: {
    selectedHobbies: string[];
    selectedSports: string[];
    selectedMusicGenres: string[];
    selectedMovies: string[];
  };
};

export const EditPreferencesDetails = ({
  isMobile,
  data,
}: EditPreferencesDetailsProps) => {
  return (
    <Stack p={isMobile ? '16px' : 0}>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Hobbies and interests</Field.Label>
        <Wrap gap={'2'}>
          {data.selectedHobbies.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </Wrap>
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>{`Favorite sport(s)`}</Field.Label>
        <Wrap gap={'2'}>
          {data.selectedSports.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </Wrap>
      </Field.Root>
      <Field.Root>
        <Field.Label
          fontWeight={'bold'}
        >{`Preferred music genre(s)`}</Field.Label>
        <Wrap gap={'2'}>
          {data.selectedMusicGenres.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </Wrap>
      </Field.Root>
      <Field.Root>
        <Field.Label
          fontWeight={'bold'}
        >{`Preferred movie/TV show(s)`}</Field.Label>
        <Wrap gap={'2'}>
          {data.selectedMovies.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </Wrap>
      </Field.Root>
    </Stack>
  );
};
