import { Stack, Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { listenArtworks, listenScore } from '../firebase/listeners';
import UserProfile from '../components/UserProfile';
import GallerySection from '../components/GallerySection';
import { useSelector } from 'react-redux';
import Carousel from '../components/Carousel';

const Gallery = () => {
  const artworks = useSelector(state => state.artworks.list);

  useEffect(() => {
    const unsubscribeArtworks = listenArtworks();
    const unsubscribeScores = listenScore();
    return () => {
      unsubscribeArtworks();
      unsubscribeScores();
    };
  }, []);

  return (
    <Flex justifyContent="center">
      <Stack maxW={1500} spacing={5}>
        <Stack spacing={5} align="center" direction="row">
          <UserProfile flex={1} />
          <Box flex={2}>
            <Carousel artworks={artworks} />
          </Box>
        </Stack>
        <Stack spacing={3}>
          <GallerySection
            artworks={[artworks[0]]}
            gridColumns={{ sm: 1, md: 2, lg: 2, xl: 3, '2xl': 4 }}
            name="Obras"
            hasMenu
            flex={1}
          />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Gallery;
