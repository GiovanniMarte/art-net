import { SimpleGrid } from '@chakra-ui/layout';
import Artwork from '../components/Artwork';
import { useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setArtworks } from '../redux/artworks/artworksActions';

const Homepage = () => {
  const artworks = useSelector(state => state.artworks.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (artworks.length) return;
    const unsubscribe = firestore.collection('artworks').onSnapshot(snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
      dispatch(setArtworks(data));
    });
    return () => unsubscribe();
  }, [dispatch, artworks]);

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }} spacing={4}>
      {artworks.map(artwork => (
        <Artwork key={artwork.id} artwork={artwork} hasScore hasLink />
      ))}
    </SimpleGrid>
  );
};

export default Homepage;
