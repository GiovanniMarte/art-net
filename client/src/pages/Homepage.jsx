import { SimpleGrid } from '@chakra-ui/react';
import Artwork from '../components/Artwork';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { listenArtworks, listenScore } from '../firebase/listeners';

const Homepage = () => {
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
    <SimpleGrid
      justifyItems="center"
      columns={{ sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }}
      spacing={4}
    >
      {artworks.map(artwork => (
        <Artwork key={artwork.id} artwork={artwork} hasScore hasLink />
      ))}
    </SimpleGrid>
  );
};

export default Homepage;
