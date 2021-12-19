import {
  Box,
  Button as ChakraButton,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import moment from 'moment';
import FollowButton from './FollowButton';
import 'moment/locale/es';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listenFollowersById } from '../firebase/listeners';

const UserProfile = ({ galleryUser, ...restProps }) => {
  const { user, followers } = galleryUser;
  const currentUser = useSelector(state => state.user.currentUser);
  moment.locale('es');

  useEffect(() => {
    const unsubscribe = listenFollowersById(user.id);
    return () => unsubscribe();
  }, [user.id]);

  return (
    <Stack
      {...restProps}
      borderWidth="1px"
      borderRadius="lg"
      w={{ sm: '400px', md: '540px' }}
      height={{ sm: '100%', md: '20rem' }}
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow="xl"
    >
      {user.profileImage ? (
        <Box flex={1}>
          <Image
            roundedLeft="lg"
            objectFit="cover"
            boxSize="100%"
            src={
              user.profileImage ||
              'https://firebasestorage.googleapis.com/v0/b/art-net.appspot.com/o/profileImages%2Fdefault.png?alt=media&token=5c62a4a6-4e2c-43f5-8ca6-4bceaeb7f021'
            }
          />
        </Box>
      ) : null}

      <Stack textAlign="center" flex={1} justify="space-evenly" align="center" p={4} pl={1}>
        <Stack justify="center" align="center">
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {user.displayName}
          </Heading>
          <Text fontWeight={600} color={'gray.600'} size="sm" mb={4}>
            Registrad@ desde {moment(user.createdAt.toDate()).fromNow()}
          </Text>
          <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
            Artista, músico y escritor. Si te gusta mi galería no te ovides de seguirme y votar mis
            obras!
          </Text>
        </Stack>

        {currentUser ? (
          currentUser.id !== user.id ? (
            <Stack width={'100%'} mt={'2rem'} direction={'row'} padding={2} alignItems={'center'}>
              <ChakraButton flex={1} fontSize={'sm'}>
                Chatear
              </ChakraButton>
              <FollowButton
                isFollowing={followers.some(follower => follower.id === currentUser.id)}
                followerId={currentUser.id}
                followedId={user.id}
                fontSize="sm"
                flex={1}
              >
                Seguir
              </FollowButton>
            </Stack>
          ) : null
        ) : null}
      </Stack>
    </Stack>
  );
};

export default UserProfile;
