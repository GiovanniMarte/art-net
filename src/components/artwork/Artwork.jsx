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
import ConditionalWrapper from '../ConditionalWrapper';
import ImageFade from '../ImageFade';
import DeleteButton from '../comments/DeleteButton';
import { useSelector } from 'react-redux';
import { deleteArtwork } from '../../firebase/functions';
import { handleDeleteArtworkSuccess } from '../../notifications/successHandler';
import { handleDeleteArtworkError } from '../../notifications/errorHandler';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import es from 'date-fns/esm/locale/es';

const Artwork = ({ artwork, scores, isPreview }) => {
  const currentUser = useSelector(state => state.user.currentUser);

  const deleteArtworkHandler = async () => {
    try {
      await deleteArtwork(artwork);
      handleDeleteArtworkSuccess();
    } catch (error) {
      handleDeleteArtworkError();
    }
  };

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
        <HStack spacing={3}>
          <Heading color={useColorModeValue('gray.700', 'white')} fontSize="xl" fontFamily="body">
            {artwork.title}
          </Heading>
          {!isPreview && currentUser && currentUser.id === artwork.author.id && (
            <DeleteButton
              actionHandler={deleteArtworkHandler}
              message={`Si pulsas Aceptar se eliminará la obra para siempre`}
            />
          )}
        </HStack>
        <HStack justify="space-between" mt={3} spacing={4} align="center">
          <HStack>
            <Avatar
              src={isPreview ? currentUser.profileImage : artwork.author.profileImage}
              alt="Autor"
            />
            <Stack direction="column" spacing={0} fontSize="sm">
              <Text fontWeight={600}>
                {isPreview ? currentUser.displayName : artwork.author.displayName}
              </Text>
              <Text color="gray.500">
                {artwork.createdAt
                  ? formatDistanceToNow(artwork.createdAt.toDate(), {
                      addSuffix: true,
                      locale: es,
                    })
                  : formatDistanceToNow(new Date(), { addSuffix: true, locale: es })}
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
