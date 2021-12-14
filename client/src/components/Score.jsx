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
        userSelect="none"
        onClick={handleUpvote}
        boxSize={6}
        cursor="pointer"
        transition="300ms"
        _hover={{
          color: 'green.400',
        }}
      />
      <Text fontSize="md" fontWeight={500}>
        {score}
      </Text>
      <ChevronDownIcon
        userSelect="none"
        onClick={handleDownvote}
        boxSize={6}
        cursor="pointer"
        transition="300ms"
        _hover={{
          color: 'red.400',
        }}
      />
    </HStack>
  );
};

export default Score;
