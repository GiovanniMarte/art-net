import { Box, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setArtworks, updateArtwork } from '../redux/artworks/artworksActions';
import ImageFade from '../components/ImageFade';
import Comments from '../components/Comments';
import ArtworkInfo from '../components/ArtworkInfo';
import { firestore } from '../firebase/firebase';

const ArtworkDetail = () => {
  const { artworkId } = useParams();
  const artwork = useSelector(state =>
    state.artworks.list.find(artwork => artwork.id === artworkId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firestore.doc(`/artworks/${artworkId}`).onSnapshot(snapshot => {
      const newArtwork = { ...snapshot.data(), id: snapshot.id };
      artwork ? dispatch(updateArtwork(newArtwork)) : dispatch(setArtworks([newArtwork]));
    });
    return () => unsubscribe();
  }, [dispatch, artworkId]);

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
