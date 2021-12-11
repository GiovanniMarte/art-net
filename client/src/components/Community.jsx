import { Heading, Box, Image, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react';

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
    >
      <Image h="120px" w="full" src={community.banner} objectFit="cover" />

      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {community.name}
          </Heading>
          <Text align="center" color={'gray.500'}>
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
        <Button
          w={'full'}
          mt={8}
          size="lg"
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
          Seguir
        </Button>
      </Box>
    </Box>
  );
};

export default Community;
