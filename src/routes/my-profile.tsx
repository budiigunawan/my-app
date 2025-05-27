import {
  AdditionalDetails,
  BasicDetails,
  PreferencesDetails,
  SpouseDetails,
} from '@/components/my-profile';
import { profileDataDefaultValue, type ProfileData } from '@/lib/types';
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
import { RiBallPenFill } from 'react-icons/ri';
import { Link } from 'react-router';

export const MyProfile = () => {
  const [cookies] = useCookies(['token']);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [profileData, setProfileData] = useState<ProfileData>(
    profileDataDefaultValue
  );

  const tabsList = [
    {
      title: 'Basic',
      value: 'basic',
      content: <BasicDetails isMobile={isMobile} data={profileData} />,
    },
    {
      title: 'Additional Details',
      value: 'additional',
      content: <AdditionalDetails isMobile={isMobile} data={profileData} />,
    },
    {
      title: 'Spouse Details',
      value: 'spouse',
      content: <SpouseDetails isMobile={isMobile} data={profileData} />,
    },
    {
      title: 'Personal Preferences',
      value: 'preferences',
      content: <PreferencesDetails data={profileData} isMobile={isMobile} />,
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
          setProfileData({
            ...data.profile,
            hobbies: data.profile?.hobbies.split(', ') ?? [],
            sports: data.profile?.sports.split(', ') ?? [],
            musics: data.profile?.musics.split(', ') ?? [],
            movies: data.profile?.hobbies.split(', ') ?? [],
          });
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
