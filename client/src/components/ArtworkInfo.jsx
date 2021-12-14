import { Box, Stack, chakra, Flex, Image, Link, useColorModeValue } from '@chakra-ui/react';
import { CalendarIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import moment from 'moment';
import 'moment/locale/es';

const ArtworkInfo = ({ artwork }) => {
  moment.locale('es');

  return (
    <Box
      width={{ base: 'full', md: 'full', lg: 'full', xl: 'md', '2xl': 'md' }}
      py={4}
      px={8}
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Flex justifyContent={{ base: 'center', md: 'end' }} mt={-16}>
        <Image
          w={20}
          h={20}
          fit="cover"
          rounded="full"
          borderStyle="solid"
          borderWidth={2}
          borderColor={useColorModeValue('brand.500', 'brand.400')}
          alt="Testimonial avatar"
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
        />
      </Flex>

      <chakra.h2
        color={useColorModeValue('gray.800', 'white')}
        fontSize={{ base: '2xl', md: '3xl' }}
        mt={{ base: 2, md: 0 }}
        fontWeight="bold"
      >
        {artwork.title}
      </chakra.h2>
      <chakra.p mt={2} color={useColorModeValue('gray.600', 'gray.200')}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque
        natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
        minus consequuntur!
      </chakra.p>

      <Stack
        my={4}
        spacing={5}
        align="start"
        direction={{ base: 'row', md: 'row', lg: 'row', xl: 'column', '2xl': 'column' }}
      >
        <Flex alignItems="center" color={useColorModeValue('gray.700', 'gray.200')}>
          <EditIcon />
          <chakra.h1 px={2} fontSize="sm">
            {artwork.score} puntos
          </chakra.h1>
        </Flex>

        <Flex alignItems="center" color={useColorModeValue('gray.700', 'gray.200')}>
          <ViewIcon />
          <chakra.h1 px={2} fontSize="sm">
            {artwork.views} visitas
          </chakra.h1>
        </Flex>

        <Flex alignItems="center" color={useColorModeValue('gray.700', 'gray.200')}>
          <CalendarIcon />
          <chakra.h1 px={2} fontSize="sm">
            {moment(artwork.createdAt.toDate()).format('DD/MM/YYYY')} (
            {moment(artwork.createdAt.toDate()).fromNow()})
          </chakra.h1>
        </Flex>
      </Stack>

      <Flex justifyContent="end">
        <Link fontSize="xl" color={useColorModeValue('brand.500', 'brand.300')}>
          {artwork.author}
        </Link>
      </Flex>
    </Box>
  );
};

export default ArtworkInfo;
