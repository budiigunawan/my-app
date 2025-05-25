import {
  EditAdditionalDetails,
  EditBasicDetails,
  EditSpouseDetails,
} from '@/components/edit-profile';
import { EditPreferencesDetails } from '@/components/edit-profile/edit-preferences-details';
import {
  Box,
  HStack,
  Link as ChakraLink,
  Separator,
  Stack,
  Tabs,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router';

export const EditProfile = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const preferencesData = {
    selectedHobbies: ['Traveling', 'Reading'],
    selectedSports: ['Badminton', 'Football'],
    selectedMusicGenres: ['Pop', 'Jazz', 'Rock'],
    selectedMovies: ['Spiderman 1', 'Spiderman 2', 'Spiderman 3'],
  };

  const tabsList = [
    {
      title: 'Basic',
      value: 'basic',
      content: <EditBasicDetails isMobile={isMobile} />,
    },
    {
      title: 'Additional Details',
      value: 'additional',
      content: <EditAdditionalDetails isMobile={isMobile} />,
    },
    {
      title: 'Spouse Details',
      value: 'spouse',
      content: <EditSpouseDetails isMobile={isMobile} />,
    },
    {
      title: 'Personal Preferences',
      value: 'preferences',
      content: (
        <EditPreferencesDetails data={preferencesData} isMobile={isMobile} />
      ),
    },
  ];

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
          {tabsList.map((tabs) => (
            <React.Fragment key={tabs.value}>
              <Tabs.Trigger
                py={{ base: '32px', md: '8px' }}
                _selected={{ fontWeight: 'bold' }}
                value={tabs.value}
              >
                {tabs.title}
              </Tabs.Trigger>
              <Separator />
            </React.Fragment>
          ))}
          <Tabs.Indicator
            rounded="none"
            backgroundColor={'transparent'}
            borderBottom={'4px solid black'}
            boxShadow={'none'}
          />
          <Separator />
        </Tabs.List>
        {tabsList.map((tabs) => (
          <Tabs.Content p={0} value={tabs.value} key={`${tabs.value}-content`}>
            {tabs.content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Box>
  );
};
