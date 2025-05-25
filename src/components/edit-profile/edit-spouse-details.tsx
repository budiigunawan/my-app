import { Stack, Field, Input } from '@chakra-ui/react';

type EditSpouseDetailsProps = {
  isMobile?: boolean;
};

export const EditSpouseDetails = ({ isMobile }: EditSpouseDetailsProps) => {
  return (
    <Stack p={isMobile ? '16px' : 0}>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Salutation</Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={'Mrs.'} />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>First name</Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={'Dita'} />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Last name</Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={'Gunawan'} />
      </Field.Root>
    </Stack>
  );
};
