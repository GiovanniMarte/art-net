import { SimpleGrid, Stack } from '@chakra-ui/react';
import Artwork from '../components/Artwork';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { listenArtworks, listenCommunities, listenScores } from '../firebase/listeners';
import { useParams } from 'react-router-dom';

const CommunityDetail = () => {
  const { communityId } = useParams();
  const artworks = useSelector(state => state.artworks.list);
  const communities = useSelector(state => state.communities.list);
  const scores = useSelector(state => state.scores.list);

  const communityArtworks = artworks.filter(artwork =>
    artwork.communities.find(community => community.id === communityId)
  );

  useEffect(() => {
    const unsubscribeCommunities = listenCommunities();
    const unsubscribeArtworks = listenArtworks();
    const unsubscribeScores = listenScores();
    return () => {
      unsubscribeCommunities();
      unsubscribeArtworks();
      unsubscribeScores();
    };
  }, []);

  return (
    <Stack align="center">
      {communities ? (
        <SimpleGrid
          justifyItems="center"
          columns={{ sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }}
          spacing={4}
        >
          {communityArtworks.map(artwork => (
            <Artwork key={artwork.id} artwork={artwork} scores={scores} hasScore hasLink />
          ))}
        </SimpleGrid>
      ) : null}
    </Stack>
  );
};

export default CommunityDetail;
