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
        <Input variant={'flushed'} border={0} value={'Sesame Street'} />
      </Field.Root>
      <Field.Root required>
        <Field.Label fontWeight={'bold'}>
          Country <Field.RequiredIndicator color={'black'} />
        </Field.Label>
        <Input variant={'flushed'} border={0} value={'Indonesia'} />
      </Field.Root>
      <Field.Root required>
        <Field.Label fontWeight={'bold'}>
          Postal code <Field.RequiredIndicator color={'black'} />
        </Field.Label>
        <Input variant={'flushed'} border={0} value={'53257'} />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Date of birth</Field.Label>
        <Input
          type="date"
          variant={'flushed'}
          border={0}
          value={'1996-07-31'}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Gender</Field.Label>
        <Input variant={'flushed'} border={0} value={'Male'} />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Marital status</Field.Label>
        <Input variant={'flushed'} border={0} value={'Married'} />
      </Field.Root>
    </Stack>
  );
};
