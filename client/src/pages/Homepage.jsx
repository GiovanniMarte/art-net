import { Grid } from '@chakra-ui/layout';
import Artwork from '../components/Artwork';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';

const Homepage = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('artworks').onSnapshot(async snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
      console.log(data);
      setArtworks(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Grid display={{ md: 'flex' }} templateColumns="repeat(5, 1fr)" gap={6}>
      {artworks.map(artwork => (
        <Artwork key={artwork.id} artwork={artwork} currentUser="Joseph" />
      ))}
    </Grid>
  );
};

export default Homepage;
