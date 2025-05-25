import { Flex, Stack, Field, Input, Box } from '@chakra-ui/react';
import { IoPersonSharp } from 'react-icons/io5';
import { ImageUpload } from './image-upload';

type EditBasicDetailsProps = {
  isMobile?: boolean;
};

export const EditBasicDetails = ({ isMobile }: EditBasicDetailsProps) => {
  return (
    <Flex
      gap={isMobile ? '20px' : '40px'}
      flexDirection={isMobile ? 'column' : 'row'}
      p={isMobile ? '16px' : 0}
    >
      <Box margin={'0 auto'}>
        <IoPersonSharp size={'8em'} />
        <ImageUpload />
      </Box>
      <Stack>
        <Field.Root required>
          <Field.Label fontWeight={'bold'}>
            Salutation <Field.RequiredIndicator color={'black'} />
          </Field.Label>
          <Input variant={'flushed'} border={0} defaultValue={'Mr.'} />
        </Field.Root>
        <Field.Root required>
          <Field.Label fontWeight={'bold'}>
            Salutation <Field.RequiredIndicator color={'black'} />
          </Field.Label>
          <Input variant={'flushed'} border={0} defaultValue={'John'} />
        </Field.Root>
        <Field.Root required>
          <Field.Label fontWeight={'bold'}>
            Last name <Field.RequiredIndicator color={'black'} />
          </Field.Label>
          <Input variant={'flushed'} border={0} defaultValue={'Doe Jr.'} />
        </Field.Root>
        <Field.Root required>
          <Field.Label fontWeight={'bold'}>
            Email address <Field.RequiredIndicator color={'black'} />
          </Field.Label>
          <Input
            variant={'flushed'}
            border={0}
            defaultValue={'johndoe@anyemail.com'}
          />
        </Field.Root>
      </Stack>
    </Flex>
  );
};
