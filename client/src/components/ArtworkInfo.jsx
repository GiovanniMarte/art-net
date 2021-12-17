import { Box, Stack, chakra, Flex, Avatar, Link, useColorModeValue } from '@chakra-ui/react';
import { CalendarIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
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
        <Avatar size="lg" src={artwork.author.profileImage || null} />
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
        {artwork.description}
      </chakra.p>

      <Stack
        my={4}
        spacing={5}
        align="start"
        direction={{ base: 'row', md: 'row', lg: 'row', xl: 'column', '2xl': 'column' }}
      >
        <Flex alignItems="center" color={useColorModeValue('gray.700', 'gray.200')}>
          <EditIcon />
          <chakra.h1 fontWeight="600" px={2} fontSize="sm">
            {artwork.score} puntos
          </chakra.h1>
        </Flex>

        <Flex alignItems="center" color={useColorModeValue('gray.700', 'gray.200')}>
          <ViewIcon />
          <chakra.h1 fontWeight="600" px={2} fontSize="sm">
            {artwork.views} visitas
          </chakra.h1>
        </Flex>

        <Flex alignItems="center" color={useColorModeValue('gray.700', 'gray.200')}>
          <CalendarIcon />
          <chakra.h1 fontWeight="600" px={2} fontSize="sm">
            {moment(artwork.createdAt.toDate()).format('DD MMM YYYY')}
          </chakra.h1>
        </Flex>
      </Stack>

      <Flex justifyContent="end">
        <Link
          as={RouterLink}
          to={`/gallery/${artwork.author.id}`}
          fontSize="xl"
          color={useColorModeValue('brand.500', 'brand.300')}
        >
          {artwork.author.displayName}
        </Link>
      </Flex>
    </Box>
  );
};

export default ArtworkInfo;
