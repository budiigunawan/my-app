import {
  AdditionalDetails,
  BasicDetails,
  PreferencesDetails,
  SpouseDetails,
} from '@/components/my-profile';
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
import { RiBallPenFill } from 'react-icons/ri';
import { Link } from 'react-router';

export const MyProfile = () => {
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
      content: <BasicDetails isMobile={isMobile} />,
    },
    {
      title: 'Additional Details',
      value: 'additional',
      content: <AdditionalDetails isMobile={isMobile} />,
    },
    {
      title: 'Spouse Details',
      value: 'spouse',
      content: <SpouseDetails isMobile={isMobile} />,
    },
    {
      title: 'Personal Preferences',
      value: 'preferences',
      content: (
        <PreferencesDetails data={preferencesData} isMobile={isMobile} />
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
            <Link to={'/edit-profile'}>
              Edit Profile <RiBallPenFill />
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
        <Tabs.List width={isMobile ? '100%' : '25%'} p={isMobile ? 4 : 0}>
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
