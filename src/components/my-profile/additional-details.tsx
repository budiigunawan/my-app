import type { ProfileData } from '@/lib/types';
import { Stack, Field, Input } from '@chakra-ui/react';

type AdditionalDetailsProps = {
  isMobile?: boolean;
  data: ProfileData;
};

export const AdditionalDetails = ({
  isMobile,
  data,
}: AdditionalDetailsProps) => {
  return (
    <Stack p={isMobile ? '16px' : 0}>
      <Field.Root required>
        <Field.Label fontWeight={'bold'}>
          Home address <Field.RequiredIndicator color={'black'} />
        </Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={data.address} />
      </Field.Root>
      <Field.Root required>
        <Field.Label fontWeight={'bold'}>
          Country <Field.RequiredIndicator color={'black'} />
        </Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={data.country} />
      </Field.Root>
      <Field.Root required>
        <Field.Label fontWeight={'bold'}>
          Postal code <Field.RequiredIndicator color={'black'} />
        </Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={data.postalCode} />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Date of birth</Field.Label>
        <Input
          type="date"
          variant={'flushed'}
          border={0}
          defaultValue={data.dateOfBirth}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Gender</Field.Label>
        <Input variant={'flushed'} border={0} defaultValue={data.gender} />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Marital status</Field.Label>
        <Input
          variant={'flushed'}
          border={0}
          defaultValue={data.maritalStatus}
        />
      </Field.Root>
    </Stack>
  );
};
