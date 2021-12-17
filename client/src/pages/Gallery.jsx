import { Stack, Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { listenUserArtworks, listenGalleryUser, listenScoresByIds } from '../firebase/listeners';
import UserProfile from '../components/UserProfile';
import GallerySection from '../components/GallerySection';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../components/Carousel';
import { useParams } from 'react-router-dom';
import { removeGalleryUser } from '../redux/galleryUser/galleryUserActions';
import { removeArtworks } from '../redux/artworks/artworksActions';

const Gallery = () => {
  const { userId } = useParams();
  const artworks = useSelector(state => state.artworks.list);
  const galleryUser = useSelector(state => state.galleryUser);
  const dispatch = useDispatch();

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
    <Flex justifyContent="center">
      {artworks.length ? (
        <Stack maxW={1500} align="center" spacing={5}>
          <Stack spacing={10} align="center" direction="row">
            {galleryUser.user ? <UserProfile galleryUser={galleryUser} flex={1} /> : null}
            <Box flex={1}>
              <Carousel artworks={artworks} />
            </Box>
          </Stack>
          <Stack spacing={3}>
            <GallerySection
              artworks={artworks}
              gridColumns={{ sm: 1, md: 2, lg: 2, xl: 3, '2xl': 4 }}
              name="Obras"
              hasMenu
              flex={1}
            />
          </Stack>
        </Stack>
      ) : null}
    </Flex>
  );
};

export default Gallery;
