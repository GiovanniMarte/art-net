import { Text, HStack } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { upvoteArtworkDoc, downvoteArtworkDoc } from '../firebase/firebase';

const Score = ({ score, artworkId }) => {
  const handleUpvote = () => upvoteArtworkDoc(artworkId);
  const handleDownvote = () => downvoteArtworkDoc(artworkId);

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
