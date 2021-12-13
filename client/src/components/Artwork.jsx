import {
  Box,
  Badge,
  Image,
  Stack,
  Avatar,
  Text,
  Heading,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import Score from './Score';

const Artwork = ({ artwork, currentUser, hasScore }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      className="card"
      boxShadow="lg"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="300ms"
      cursor="pointer"
      _hover={{
        transform: 'translateY(-3px)',
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
        <HStack justify="space-between" mt={3} spacing={4} align={'center'}>
          <HStack>
            <Avatar src={artwork.author} alt={'Author'} />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>{artwork.author || currentUser.displayName}</Text>
              <Text color={'gray.500'}>{'Feb 08, 2021'}</Text>
            </Stack>
          </HStack>
          {hasScore ? <Score score={artwork.score} artworkId={artwork.id} /> : null}
        </HStack>
      </Box>
    </Box>
  );
};

export default Artwork;
