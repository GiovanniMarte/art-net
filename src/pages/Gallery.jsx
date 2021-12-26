import { Stack, Box, Text, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { listenUserArtworks, listenGalleryUser, listenScoresByIds } from '../firebase/listeners';
import UserProfile from '../components/gallery/UserProfile';
import GallerySection from '../components/gallery/GallerySection';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../components/gallery/Carousel';
import { useParams } from 'react-router-dom';
import { removeGalleryUser } from '../redux/galleryUser/galleryUserActions';
import { removeArtworks } from '../redux/artworks/artworksActions';

const Gallery = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const artworks = useSelector(state => state.artworks.list);
  const galleryUser = useSelector(state => state.galleryUser);

  useEffect(() => {
    dispatch(removeArtworks());
    const unsubscribeUser = listenGalleryUser(userId);
    const unsubscribeUserArtworks = listenUserArtworks(userId);
    return () => {
      dispatch(removeGalleryUser());
      unsubscribeUser();
      unsubscribeUserArtworks();
    };
  }, [dispatch, userId]);

  useEffect(() => {
    const artworkIds = artworks.map(artwork => artwork.id);
    if (!artworkIds.length) return;
    const usubscribeScores = listenScoresByIds(artworkIds);
    return () => usubscribeScores();
  }, [artworks]);

  return (
    <Flex justify="center">
      {galleryUser.user ? (
        <Stack maxW={1500} align="center" spacing={5}>
          <Stack
            direction={{
              base: 'column',
              sm: 'column',
              md: 'column',
              lg: 'column',
              xl: 'row',
              '2xl': 'row',
            }}
            spacing={10}
            align="center"
          >
            <UserProfile galleryUser={galleryUser} flex={1} />
            {artworks.length ? (
              <Box flex={1}>
                <Carousel artworks={artworks} />
              </Box>
            ) : null}
          </Stack>
          {artworks.length ? (
            <GallerySection
              artworks={artworks}
              gridColumns={{ sm: 1, md: 2, lg: 2, xl: 3, '2xl': 4 }}
              name="Obras"
              hasMenu
              flex={1}
            />
          ) : (
            <Text pt={3} as="i" color="gray.500">
              Este usuario no ha publicado ninguna obra todavía
            </Text>
          )}
        </Stack>
      ) : null}
    </Flex>
  );
};

export default Gallery;
