import { Box, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setArtworks } from '../redux/artworks/artworksActions';
import ImageFade from '../components/ImageFade';
import { getDocumentById } from '../firebase/firebase';
import Comments from '../components/Comments';
import ArtworkInfo from '../components/ArtworkInfo';

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
    <Box>
      {artwork ? (
        <Stack>
          <Stack
            align="center"
            justify="center"
            direction={{ base: 'column', md: 'column', lg: 'column', xl: 'row', '2xl': 'row' }}
          >
            <Box>
              <ImageFade
                maxH={800}
                cursor="zoom-in"
                shadow="xl"
                src={artwork.imageUrl}
                alt={artwork.title}
              />
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
