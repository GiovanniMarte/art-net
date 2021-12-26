import { SimpleGrid } from '@chakra-ui/react';
import Artwork from '../components/artwork/Artwork';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { listenArtworks, listenScores } from '../firebase/listeners';

const Homepage = () => {
  const artworks = useSelector(state => state.artworks.list);
  const scores = useSelector(state => state.scores.list);

  useEffect(() => {
    const unsubscribeArtworks = listenArtworks();
    const unsubscribeScores = listenScores();
    return () => {
      unsubscribeArtworks();
      unsubscribeScores();
    };
  }, []);

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
