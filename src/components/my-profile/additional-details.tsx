import { Stack, Field, Input } from '@chakra-ui/react';

type AdditionalDetailsProps = {
  isMobile?: boolean;
};

export const AdditionalDetails = ({ isMobile }: AdditionalDetailsProps) => {
  return (
    <Stack p={isMobile ? '16px' : 0}>
      <Field.Root required>
        <Field.Label fontWeight={'bold'}>
          Home address <Field.RequiredIndicator color={'black'} />
        </Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={'Sesame Street'} />
      </Field.Root>
      <Field.Root required>
        <Field.Label fontWeight={'bold'}>
          Country <Field.RequiredIndicator color={'black'} />
        </Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={'Indonesia'} />
      </Field.Root>
      <Field.Root required>
        <Field.Label fontWeight={'bold'}>
          Postal code <Field.RequiredIndicator color={'black'} />
        </Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={'53257'} />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Date of birth</Field.Label>
        <Input
          type="date"
          variant={'flushed'}
          border={0}
          defaultValue={'1996-07-31'}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Gender</Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={'Male'} />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Marital status</Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={'Married'} />
      </Field.Root>
    </Stack>
  );
};
