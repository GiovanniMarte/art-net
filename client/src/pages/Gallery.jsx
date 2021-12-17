import { Stack, Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { listenUserArtworks, listenScore, listenUser } from '../firebase/listeners';
import UserProfile from '../components/UserProfile';
import GallerySection from '../components/GallerySection';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../components/Carousel';
import { useParams } from 'react-router-dom';
import { setGalleryUser, removeGalleryUser } from '../redux/galleryUser/galleryUserActions';

const Gallery = () => {
  const { userId } = useParams();
  const artworks = useSelector(state => state.artworks.list);
  const user = useSelector(state => state.galleryUser.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeUser = listenUser(userId, setGalleryUser);
    const unsubscribeUserArtworks = listenUserArtworks(userId);
    const unsubscribeScores = listenScore();
    return () => {
      dispatch(removeGalleryUser());
      unsubscribeUser();
      unsubscribeUserArtworks();
      unsubscribeScores();
    };
  }, [dispatch, userId]);

  return (
    <Flex justifyContent="center">
      {artworks.length === 1 ? (
        <Stack maxW={1500} align="center" spacing={5}>
          <Stack spacing={10} align="center" direction="row">
            {user ? <UserProfile user={user} flex={2} /> : null}
            <Box flex={3}>
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
