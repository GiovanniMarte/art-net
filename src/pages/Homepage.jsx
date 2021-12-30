import { SimpleGrid } from '@chakra-ui/react';
import Artwork from '../components/artwork/Artwork';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenArtworks, listenScores } from '../firebase/listeners';
import { removeArtworks } from '../redux/artworks/artworksActions';
import { removeScores } from '../redux/scores/scoresActions';

const Homepage = () => {
  const artworks = useSelector(state => state.artworks.list);
  const scores = useSelector(state => state.scores.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeArtworks = listenArtworks();
    const unsubscribeScores = listenScores();
    return () => {
      dispatch(removeArtworks());
      dispatch(removeScores());
      unsubscribeArtworks();
      unsubscribeScores();
    };
  }, [dispatch]);

  return (
    <SimpleGrid
      justifyItems="center"
      columns={{ sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }}
      spacing={4}
    >
      {artworks.map(artwork => (
        <Artwork key={artwork.id} artwork={artwork} scores={scores} hasScore hasLink />
      ))}
    </SimpleGrid>
  );
};

export default Homepage;
