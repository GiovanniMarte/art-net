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

const UserProfile = ({ user, ...restProps }) => {
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
      padding={4}
    >
      <Box flex={1} bg="blue.200">
        <Image
          objectFit="cover"
          boxSize="100%"
          src={
            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
        />
      </Box>
      <Stack flex={1} justify="space-evenly" align="center" p={1} pt={2}>
        <Stack justify="center" align="center">
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            Lindsey James
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
            @lindsey_jam3s
          </Text>
          <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
            Actress, musician, songwriter and artist. PM for work inquires or tag me in your posts
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
