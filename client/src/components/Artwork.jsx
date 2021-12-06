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

const Artwork = () => {
  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Box boxShadow={'md'} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box mb={2} display="flex" alignItems="baseline">
          <Badge mr={2} borderRadius="full" px="2" colorScheme="teal">
            3D
          </Badge>
          <Badge borderRadius="full" px="2" colorScheme="red">
            Photorealistic
          </Badge>
        </Box>
        <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'xl'} fontFamily={'body'}>
          Modern home
        </Heading>
        <Stack mt={3} direction={'row'} spacing={4} align={'center'}>
          <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} alt={'Author'} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={'gray.500'}>Feb 08, 2021</Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Artwork;
