import { Box, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ImageFade from '../components/ImageFade';
import Comments from '../components/Comments';
import ArtworkInfo from '../components/ArtworkInfo';
import { removeArtworkDetail } from '../redux/artwork-detail/artworkDetailActions';
import { listenArtwork } from '../firebase/listeners';

const ArtworkDetail = () => {
  const { artworkId } = useParams();
  const { currentArtworkDetail: artwork, hasData } = useSelector(state => state.artworkDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = listenArtwork(artworkId);
    return () => {
      dispatch(removeArtworkDetail());
      unsubscribe();
    };
  }, [dispatch, artworkId]);

  return (
    <Box>
      {hasData ? (
        <Stack>
          <Stack
            align="center"
            justify="center"
            direction={{ base: 'column', md: 'column', lg: 'column', xl: 'row', '2xl': 'row' }}
          >
            <Box>
              <ImageFade maxH={800} shadow="xl" src={artwork.imageUrl} alt={artwork.title} />
            </Box>
            <ArtworkInfo artwork={artwork} />
          </Stack>
          <Comments artwork={artwork} />
        </Stack>
      ) : null}
    </Box>
  );
};

export default ArtworkDetail;
