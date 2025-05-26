import type { ProfileData } from '@/lib/types';
import { Stack, Field, Input } from '@chakra-ui/react';

type SpouseDetailsProps = {
  isMobile?: boolean;
  data: ProfileData;
};

export const SpouseDetails = ({ isMobile, data }: SpouseDetailsProps) => {
  return (
    <Stack p={isMobile ? '16px' : 0}>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Salutation</Field.Label>
        <Input
          variant={'flushed'}
          border={0}
          defaultValue={data.spouseSalutation}
          readOnly
        />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>First name</Field.Label>
        <Input
          variant={'flushed'}
          border={0}
          defaultValue={data.spouseFirstName}
          readOnly
        />
      </Field.Root>
      <Field.Root>
        <Field.Label fontWeight={'bold'}>Last name</Field.Label>
        <Input
          variant={'flushed'}
          border={0}
          defaultValue={data.spouseLastName}
          readOnly
        />
      </Field.Root>
    </Stack>
  );
};
