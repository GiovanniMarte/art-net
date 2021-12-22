import { SimpleGrid, Stack, Heading, Divider, IconButton } from '@chakra-ui/react';
import Artwork from '../components/Artwork';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  listenCommunity,
  listenCommunityArtworks,
  listenScoresByIds,
} from '../firebase/listeners';
import { useParams } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeCommunities } from '../redux/communities/communitiesActions';

const CommunityDetail = () => {
  const { communityId } = useParams();
  const artworks = useSelector(state => state.artworks.list);
  const scores = useSelector(state => state.scores.list);
  const community = useSelector(state => state.communities.list[0]);
  const dispatch = useDispatch();

  const communityArtworks = artworks.filter(artwork =>
    artwork.communities.find(community => community.id === communityId)
  );

  useEffect(() => {
    dispatch(removeCommunities());
    const unsubscribeCommunity = listenCommunity(communityId);
    return () => {
      unsubscribeCommunity();
    };
  }, [dispatch, communityId]);

  useEffect(() => {
    if (!community) return;
    const unsubscribeArtworks = listenCommunityArtworks(community);
    return () => unsubscribeArtworks();
  }, [community]);

  useEffect(() => {
    if (!artworks) return;
    const unsubscribeScores = listenScoresByIds(artworks.map(artwork => artwork.id));
    return () => unsubscribeScores();
  }, [artworks]);

  return (
    <>
      {community ? (
        <Stack spacing={3}>
          <Stack spacing={3} align="center" direction="row">
            <IconButton
              as={RouterLink}
              to="/communities"
              size="md"
              icon={<ArrowBackIcon />}
              aria-label="Back to communities"
            />
            <Heading as="h2" size="xl" mr={3}>
              {community.name}
            </Heading>
          </Stack>
          <Divider />
          <SimpleGrid
            justifyItems="center"
            columns={{ sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }}
            spacing={4}
          >
            {communityArtworks.map(artwork => (
              <Artwork key={artwork.id} artwork={artwork} scores={scores} hasScore hasLink />
            ))}
          </SimpleGrid>
        </Stack>
      ) : null}
    </>
  );
};

export default CommunityDetail;
