import { Box, Stack, chakra, Flex, Avatar, Link, Badge } from '@chakra-ui/react';
import { CalendarIcon, ViewIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Score from './Score';
import moment from 'moment';
import 'moment/locale/es';
import { useSelector } from 'react-redux';

const ArtworkInfo = ({ artwork }) => {
  const scores = useSelector(state => state.artworkDetail.currentScores);
  moment.locale('es');

  return (
    <Box width={{ base: 'full', md: 'full', lg: 'full', xl: 'md', '2xl': 'md' }} py={4} px={8}>
      <Flex justify={{ base: 'center', md: 'end' }} mt={-16}>
        <Avatar size="lg" src={artwork.author.profileImage || null} />
      </Flex>
      <Stack>
        <chakra.h2 fontSize={{ base: '2xl', md: '3xl' }} mt={{ base: 2, md: 0 }} fontWeight="bold">
          {artwork.title}
        </chakra.h2>
        <Flex mb={2} align="start">
          {artwork.communities.map((community, index) => (
            <Badge key={index} mr={2} borderRadius="full" px="2" colorScheme={community.badgeColor}>
              {community.name}
            </Badge>
          ))}
        </Flex>
        <chakra.p mt={2}>{artwork.description}</chakra.p>
      </Stack>
      <Stack
        my={5}
        spacing={5}
        align="start"
        direction={{ base: 'row', md: 'row', lg: 'row', xl: 'column', '2xl': 'column' }}
      >
        <Flex align="center">
          <ViewIcon />
          <chakra.h1 fontWeight="600" px={2} fontSize="sm">
            {artwork.views} visitas
          </chakra.h1>
        </Flex>
        <Flex align="center">
          <CalendarIcon />
          <chakra.h1 fontWeight="600" px={2} fontSize="sm">
            {moment(artwork.createdAt.toDate()).format('DD MMM YYYY')}
          </chakra.h1>
        </Flex>
      </Stack>
      <Flex justify="space-between">
        <Score artworkId={artwork.id} scores={scores} />
        <Link as={RouterLink} to={`/gallery/${artwork.author.id}`} fontSize="xl">
          {artwork.author.displayName}
        </Link>
      </Flex>
    </Box>
  );
};

export default ArtworkInfo;
