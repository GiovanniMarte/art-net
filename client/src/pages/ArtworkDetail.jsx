import { Box, Stack, Avatar, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setArtworks } from '../redux/artworks/artworksActions';
import ImageFade from '../components/ImageFade';
import { getDocumentById } from '../firebase/firebase';

const ArtworkDetail = () => {
  const { artworkId } = useParams();
  const artwork = useSelector(state =>
    state.artworks.list.find(artwork => artwork.id === artworkId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (artwork) return;
    const getArtwork = async () => {
      const artwork = await getDocumentById('artworks', artworkId);
      dispatch(setArtworks([artwork]));
    };
    getArtwork();
  }, [dispatch, artworkId, artwork]);

  return (
    <Stack
      align="center"
      direction={{ base: 'column', md: 'column', lg: 'row', xl: 'row', '2xl': 'row' }}
    >
      <Box flex={2} maxW={1100}>
        {artwork ? (
          <ImageFade cursor="zoom-in" shadow="xl" src={artwork.imageUrl} alt={artwork.title} />
        ) : null}
      </Box>
      <Box flex={1}>
        <Stack>
          <Avatar size="lg" src={null} />
        </Stack>
      </Box>
    </Stack>
  );
};

export default ArtworkDetail;
