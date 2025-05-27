import {
  EditAdditionalDetails,
  EditBasicDetails,
  EditSpouseDetails,
} from '@/components/edit-profile';
import { EditPreferencesDetails } from '@/components/edit-profile/edit-preferences-details';
import { type ProfileData, profileDataDefaultValue } from '@/lib/types';
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
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router';

export const EditProfile = () => {
  const [cookies] = useCookies(['token']);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [profileData, setProfileData] = useState<ProfileData>(
    profileDataDefaultValue
  );

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
      content: <EditBasicDetails isMobile={isMobile} data={profileData} />,
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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch('https://bambino-api.budigunawan.com/profile', {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        const data = await res.json();

        if (data.profile) {
          setProfileData(data.profile);
        } else {
          const response = await fetch(
            'https://bambino-api.budigunawan.com/auth/me',
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );

          const authData = await response.json();
          const userData = authData.user;
          setProfileData({
            ...profileData,
            user: {
              email: userData.email,
              username: userData.username,
            },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfileData();
  }, [cookies.token]);

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
          <Tabs.Content
            p={0}
            value={tabs.value}
            key={`${tabs.value}-content`}
            width={isMobile ? '100%' : '75%'}
          >
            {tabs.content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Box>
  );
};
