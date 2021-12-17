import {
  Box,
  Button as ChakraButton,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Button from './Button';
import moment from 'moment';
import 'moment/locale/es';

const UserProfile = ({ user, ...restProps }) => {
  moment.locale('es');

  return (
    <Stack
      {...restProps}
      borderWidth="1px"
      borderRadius="lg"
      w={{ sm: '100%', md: '540px' }}
      height={{ sm: '476px', md: '20rem' }}
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

      <Stack flex={1} justify="space-evenly" align="center" p={4} pl={1}>
        <Stack justify="center" align="center">
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {user.displayName}
          </Heading>
          <Text fontWeight={600} color={'gray.600'} size="sm" mb={4}>
            Registrado desde {moment(user.createdAt.toDate()).fromNow()}
          </Text>
          <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
            Actress, musician, songwriter and artist. PM for work inquires or tag me in your posts.
          </Text>
        </Stack>

        <Stack width={'100%'} mt={'2rem'} direction={'row'} padding={2} alignItems={'center'}>
          <ChakraButton flex={1} fontSize={'sm'}>
            Chatear
          </ChakraButton>
          <Button fontSize="sm" flex={1}>
            Seguir
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserProfile;
