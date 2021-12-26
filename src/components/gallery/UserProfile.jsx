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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { listenFollowersById } from '../../firebase/listeners';

const UserProfile = ({ galleryUser, ...restProps }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const { user, followers } = galleryUser;
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
      w={{ sm: '400px', md: '600px', lg: '600px', xl: '440px', '2xl': '540px' }}
      height={{ sm: '100%', md: '20rem' }}
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow="xl"
    >
      {user.profileImage ? (
        <Box flex={1}>
          <Image roundedLeft="lg" objectFit="cover" boxSize="100%" src={user.profileImage} />
        </Box>
      ) : null}

      <Stack textAlign="center" flex={1} justify="space-evenly" align="center" p={4} pl={1}>
        <Stack justify="center" align="center">
          <Stack direction="row">
            <Heading fontSize="2xl" fontFamily="body">
              {user.displayName}
            </Heading>
            <Text fontWeight={600} color="gray.600" fontSize="sm" mb={4}>
              {followers.length}
            </Text>
          </Stack>
          <Text fontWeight={600} color="gray.600" size="sm" mb={4}>
            Registrad@ desde {moment(user.createdAt.toDate()).fromNow()}
          </Text>

          <Text textAlign="center" color={useColorModeValue('gray.700', 'gray.400')} px={3}>
            {user.bio}
          </Text>
        </Stack>

        {currentUser ? (
          currentUser.id !== user.id ? (
            <Stack width="100%" mt="2rem" direction="row" padding={2} alignItems="center">
              <ChakraButton flex={1} fontSize="sm">
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
