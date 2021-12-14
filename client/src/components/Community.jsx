import {
  Heading,
  Box,
  Image,
  Text,
  Stack,
  Fade,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Button from './Button';

const Community = ({ community }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      className="community"
      maxW="270px"
      w="full"
      boxShadow="lg"
      rounded="md"
      overflow="hidden"
    >
      <Fade in={isOpen}>
        <Image onLoad={onToggle} h="120px" w="full" src={community.banner} objectFit="cover" />
      </Fade>

      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {community.name}
          </Heading>
          <Text align="center" color={'gray.500'} noOfLines={2}>
            {community.description}
          </Text>
        </Stack>

        <Stack direction={'row'} justify={'center'} spacing={6}>
          <Stack spacing={0} align={'center'}>
            <Text fontWeight={600}>{community.followers}</Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              Seguidores
            </Text>
          </Stack>
          <Stack spacing={0} align={'center'}>
            <Text fontWeight={600}>{community.artworks}</Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              Obras
            </Text>
          </Stack>
        </Stack>
        <Button w={'full'} mt={8}>
          Seguir
        </Button>
      </Box>
    </Box>
  );
};

export default Community;
