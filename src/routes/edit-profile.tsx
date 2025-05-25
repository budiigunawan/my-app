import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  Separator,
  Stack,
  Tabs,
  Text,
  useBreakpointValue,
  Field,
  Input,
} from '@chakra-ui/react';
import { IoChevronBack, IoPersonSharp } from 'react-icons/io5';
import { Link } from 'react-router';

export const EditProfile = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box as={'section'} pt={'80px'}>
      <Stack alignItems={'flex-end'}>
        <HStack alignItems={'baseline'} width={'70%'}>
          <Text flexShrink={'1'} fontSize={'4xl'}>
            My
            <Text as={'span'} fontWeight={'bold'}>
              {' Profile'}
            </Text>
          </Text>
          <Separator flex="2" borderColor={'black'} size={'lg'} mr={'24px'} />
          <ChakraLink
            flexShrink={'1'}
            variant={'underline'}
            textDecorationColor={'black'}
            asChild
          >
            <Link to={'/my-profile'}>
              <IoChevronBack /> Go back to My Profile
            </Link>
          </ChakraLink>
        </HStack>
      </Stack>
      <Tabs.Root
        mt={'16px'}
        defaultValue="basic"
        orientation={isMobile ? 'horizontal' : 'vertical'}
        variant="plain"
        gap={isMobile ? '0' : '5%'}
      >
        <Tabs.List width={isMobile ? '100%' : '25%'}>
          <Separator />
          <Tabs.Trigger value="basic">Basic Details</Tabs.Trigger>
          <Separator />
          <Tabs.Trigger value="additional">Additional Details</Tabs.Trigger>
          <Separator />
          <Tabs.Trigger value="spouse">Spouse Details</Tabs.Trigger>
          <Separator />
          <Tabs.Trigger value="preferences">Personal Preferences</Tabs.Trigger>
          <Separator />
          <Tabs.Indicator
            rounded="none"
            backgroundColor={'transparent'}
            borderBottom={'4px solid black'}
            boxShadow={'none'}
          />
          <Separator />
        </Tabs.List>
        <Tabs.Content p={0} value="basic">
          <Flex gap={'40px'}>
            <IoPersonSharp size={'8em'} />
            <Stack>
              <Field.Root required>
                <Field.Label fontWeight={'bold'}>
                  Salutation <Field.RequiredIndicator color={'black'} />
                </Field.Label>
                <Input variant={'flushed'} border={0} value={'Mr.'} />
              </Field.Root>
              <Field.Root required>
                <Field.Label fontWeight={'bold'}>
                  Salutation <Field.RequiredIndicator color={'black'} />
                </Field.Label>
                <Input variant={'flushed'} border={0} value={'John'} />
              </Field.Root>
              <Field.Root required>
                <Field.Label fontWeight={'bold'}>
                  Last name <Field.RequiredIndicator color={'black'} />
                </Field.Label>
                <Input variant={'flushed'} border={0} value={'Doe Jr.'} />
              </Field.Root>
              <Field.Root required>
                <Field.Label fontWeight={'bold'}>
                  Email address <Field.RequiredIndicator color={'black'} />
                </Field.Label>
                <Input
                  variant={'flushed'}
                  border={0}
                  value={'johndoe@anyemail.com'}
                />
              </Field.Root>
            </Stack>
          </Flex>
        </Tabs.Content>
        <Tabs.Content p={0} value="additional">
          <Stack>
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
        </Tabs.Content>
        <Tabs.Content p={0} value="spouse">
          <Stack>
            <Field.Root>
              <Field.Label fontWeight={'bold'}>Salutation</Field.Label>
              <Input variant={'flushed'} border={0} value={'Mrs.'} />
            </Field.Root>
            <Field.Root>
              <Field.Label fontWeight={'bold'}>Salutation</Field.Label>
              <Input variant={'flushed'} border={0} value={'Dita'} />
            </Field.Root>
            <Field.Root>
              <Field.Label fontWeight={'bold'}>Last name</Field.Label>
              <Input variant={'flushed'} border={0} value={'Gunawan'} />
            </Field.Root>
          </Stack>
        </Tabs.Content>
        <Tabs.Content p={0} value="preferences">
          <Stack>
            <Field.Root>
              <Field.Label fontWeight={'bold'}>
                Hobbies and interests
              </Field.Label>
              {/* TODO: CHANGE TO COMBOBOX */}
              <Input variant={'flushed'} border={0} value={'Traveling'} />
            </Field.Root>
            <Field.Root>
              <Field.Label
                fontWeight={'bold'}
              >{`Favorite sport(s)`}</Field.Label>
              <Input variant={'flushed'} border={0} value={'Badminton'} />
            </Field.Root>
            <Field.Root>
              <Field.Label
                fontWeight={'bold'}
              >{`Preferred music genre(s)`}</Field.Label>
              <Input variant={'flushed'} border={0} value={'Pop'} />
            </Field.Root>
            <Field.Root>
              <Field.Label
                fontWeight={'bold'}
              >{`Preferred movie/TV show(s)`}</Field.Label>
              <Input variant={'flushed'} border={0} value={'Pop'} />
            </Field.Root>
          </Stack>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};
