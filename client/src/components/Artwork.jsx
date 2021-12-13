import {
  Box,
  Badge,
  Image,
  Stack,
  Avatar,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

const Artwork = ({ artwork, currentUser }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      className="card"
      boxShadow="lg"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'xl',
      }}
    >
      <Box m={2}>
        <Image
          rounded="lg"
          w={400}
          h={250}
          objectFit="cover"
          src={artwork.imageUrl}
          alt="image preview"
        />
      </Box>
      <Box mx={4} my={3}>
        <Box mb={2} display="flex" alignItems="baseline">
          {artwork.communities.map((community, index) => (
            <Badge key={index} mr={2} borderRadius="full" px="2" colorScheme={community.badgeColor}>
              {community.name}
            </Badge>
          ))}
        </Box>
        <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'xl'} fontFamily={'body'}>
          {artwork.title}
        </Heading>
        <Stack mt={3} direction={'row'} spacing={4} align={'center'}>
          <Avatar src={currentUser.profileImage || null} alt={'Author'} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{artwork.author || currentUser.displayName}</Text>
            <Text color={'gray.500'}>{'Feb 08, 2021'}</Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Artwork;
