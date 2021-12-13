import { Text, HStack } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { upvoteArtwork, downvoteArtwork } from '../redux/artworks/artworksActions';
import { upvoteArtworkDoc, downvoteArtworkDoc } from '../firebase/firebase';

const Score = ({ score, artworkId }) => {
  const dispatch = useDispatch();

  const handleUpvote = () => {
    upvoteArtworkDoc(artworkId);
    dispatch(upvoteArtwork(artworkId));
  };
  const handleDownvote = () => {
    downvoteArtworkDoc(artworkId);
    dispatch(downvoteArtwork(artworkId));
  };

  return (
    <HStack borderWidth="1px" borderRadius="lg">
      <ChevronUpIcon
        onClick={handleUpvote}
        boxSize={6}
        _hover={{
          color: 'green.500',
        }}
      />
      <Text fontSize="md" fontWeight={500}>
        {score}
      </Text>
      <ChevronDownIcon
        onClick={handleDownvote}
        boxSize={6}
        transition="300ms"
        _hover={{
          color: 'red.500',
        }}
      />
    </HStack>
  );
};

export default Score;
