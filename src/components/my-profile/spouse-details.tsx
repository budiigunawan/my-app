import { Stack, Field, Input } from '@chakra-ui/react';

type SpouseDetailsProps = {
  isMobile?: boolean;
};

export const SpouseDetails = ({ isMobile }: SpouseDetailsProps) => {
  return (
    <Stack p={isMobile ? '16px' : 0}>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Salutation</Field.Label>
        <Input variant={'flushed'} border={0} value={'Mrs.'} />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>First name</Field.Label>
        <Input variant={'flushed'} border={0} value={'Dita'} />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Last name</Field.Label>
        <Input variant={'flushed'} border={0} value={'Gunawan'} />
      </Field.Root>
    </Stack>
  );
};
