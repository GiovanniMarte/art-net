import Community from '../components/Community';
import { SimpleGrid } from '@chakra-ui/react';
import { firestore } from '../firebase/firebase';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCommunities } from '../redux/communities/communitiesActions';

const Communities = () => {
  const communities = useSelector(state => state.communities.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (communities.length) return;
    const unsubscribe = firestore.collection('communities').onSnapshot(snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
      dispatch(setCommunities(data));
    });
    return () => unsubscribe();
  }, [dispatch, communities]);

  return (
    <SimpleGrid
      justifyItems="center"
      columns={{ sm: 2, md: 3, lg: 4, xl: 5, '2xl': 6 }}
      spacing={4}
    >
      {communities.map(community => (
        <Community key={community.id} community={community} />
      ))}
    </SimpleGrid>
  );
};

export default Communities;
