import { SimpleGrid } from '@chakra-ui/layout';
import Artwork from '../components/Artwork';
import { useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setArtworks } from '../redux/artworks/artworksActions';
import { setScores } from '../redux/scores/scoresActions';

const Homepage = () => {
  const artworks = useSelector(state => state.artworks.list);
  const dispatch = useDispatch();

  // Subscribirse a la colección de artworks y puntuación
  useEffect(() => {
    const unsubscribeArtworks = firestore.collection('artworks').onSnapshot(snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
      dispatch(setArtworks(data));
    });

    const unsubscribeScores = firestore.collection('scores').onSnapshot(snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push({ ...doc.data() }));
      dispatch(setScores(data));
    });
    return () => {
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
        <Artwork key={artwork.id} artwork={artwork} hasScore hasLink />
      ))}
    </SimpleGrid>
  );
};

export default Homepage;
