import Community from '../components/community/Community';
import { SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { listenCommunities } from '../firebase/listeners';

const Communities = () => {
  const communities = useSelector(state => state.communities.list);

  useEffect(() => {
    const unsubscribe = listenCommunities();
    return () => unsubscribe();
  }, []);

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
