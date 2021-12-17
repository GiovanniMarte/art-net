import { Heading, Box, Text, Stack, useColorModeValue } from '@chakra-ui/react';
import ImageFade from './ImageFade';
import { Link } from 'react-router-dom';

const Community = ({ community }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      className="community"
      maxW="270px"
      w="full"
      boxShadow="lg"
      rounded="md"
      overflow="hidden"
      transition="300ms"
      _hover={{
        transform: 'translateY(-3px)',
        boxShadow: 'xl',
      }}
    >
      <Link to={`/community/${community.id}`}>
        <ImageFade h={120} w="full" src={community.banner} objectFit="cover" />
      </Link>
      <Box p={6}>
        <Stack spacing={0} align="center" mb={5}>
          <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
            {community.name}
          </Heading>
          <Text align="center" color="gray.500" noOfLines={2}>
            {community.description}
          </Text>
        </Stack>

        <Stack direction="row" justify="center" spacing={6}>
          <Stack spacing={0} align="center">
            <Text fontWeight={600}>{community.artworkCount}</Text>
            <Text fontSize="sm" color="gray.500">
              Obras
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Community;
