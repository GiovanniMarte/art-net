import { SimpleGrid, Stack, Heading, Divider, IconButton } from '@chakra-ui/react';
import Artwork from '../components/artwork/Artwork';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenCommunity, listenCommunityArtworks, listenScoresByIds } from '../firebase/listeners';
import { useParams } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { removeCommunities } from '../redux/communities/communitiesActions';
import { removeArtworks } from '../redux/artworks/artworksActions';
import { removeScores } from '../redux/scores/scoresActions';

const CommunityDetail = () => {
  const { communityId } = useParams();
  const dispatch = useDispatch();
  const artworks = useSelector(state => state.artworks.list);
  const scores = useSelector(state => state.scores.list);
  const community = useSelector(state => state.communities.list);

  const communityArtworks = artworks.filter(artwork =>
    artwork.communities.find(community => community.id === communityId)
  );

  useEffect(() => {
    const unsubscribeCommunity = listenCommunity(communityId);
    return () => {
      dispatch(removeCommunities());
      dispatch(removeArtworks());
      dispatch(removeScores());
      unsubscribeCommunity();
    };
  }, [dispatch, communityId]);

  useEffect(() => {
    if (!community.length) return;
    const unsubscribeArtworks = listenCommunityArtworks(community[0]);
    console.log('Listening artworks');
    return () => unsubscribeArtworks();
  }, [community]);

  useEffect(() => {
    if (!artworks.length) return;
    const unsubscribeScores = listenScoresByIds(artworks.map(artwork => artwork.id));
    console.log('Listening scores');
    return () => unsubscribeScores();
  }, [artworks]);

  return (
    <>
      {community.length ? (
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
              {community[0].name}
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
