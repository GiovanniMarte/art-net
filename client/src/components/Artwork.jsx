import {
  Box,
  Badge,
  Stack,
  Avatar,
  Text,
  Heading,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import Score from './Score';
import { Link } from 'react-router-dom';
import ConditionalWrapper from './ConditionalWrapper';
import ImageFade from './ImageFade';
import moment from 'moment';
import 'moment/locale/es';

const Artwork = ({ artwork, currentUser, scores, isPreview }) => {
  moment.locale('es');

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow="lg"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="300ms"
      _hover={{
        transform: 'translateY(-3px)',
        boxShadow: 'xl',
      }}
    >
      <ConditionalWrapper
        condition={!isPreview}
        wrapper={children => <Link to={`/artwork/${artwork.id}`}>{children}</Link>}
      >
        <ImageFade
          cursor="pointer"
          w={400}
          h={250}
          objectFit="cover"
          src={artwork.imageUrl}
          alt="image preview"
        />
      </ConditionalWrapper>
      <Box mx={4} my={3}>
        <Box mb={2} display="flex" alignItems="baseline">
          {artwork.communities.map((community, index) => (
            <Badge key={index} mr={2} borderRadius="full" px="2" colorScheme={community.badgeColor}>
              {community.name}
            </Badge>
          ))}
        </Box>
        <Heading color={useColorModeValue('gray.700', 'white')} fontSize="xl" fontFamily="body">
          {artwork.title}
        </Heading>
        <HStack justify="space-between" mt={3} spacing={4} align="center">
          <HStack>
            <Avatar
              src={isPreview ? currentUser.profileImg : artwork.author.profileImage}
              alt="Autor"
            />
            <Stack direction="column" spacing={0} fontSize="sm">
              <Text fontWeight={600}>
                {isPreview ? currentUser.displayName : artwork.author.displayName}
              </Text>
              <Text color="gray.500">
                {artwork.createdAt
                  ? moment(artwork.createdAt.toDate()).fromNow()
                  : moment(new Date()).fromNow()}
              </Text>
            </Stack>
          </HStack>
          {isPreview ? null : <Score artworkId={artwork.id} scores={scores} />}
        </HStack>
      </Box>
    </Box>
  );
};

export default Artwork;
