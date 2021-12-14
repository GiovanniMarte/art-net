import { Text, HStack } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { upvoteArtworkDoc, downvoteArtworkDoc } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Score = ({ score, artworkId }) => {
  const history = useHistory();
  const currentUser = useSelector(state => state.user.currentUser);

  const handleUpvote = () => (currentUser ? upvoteArtworkDoc(artworkId) : redirectSignIn());
  const handleDownvote = () => (currentUser ? downvoteArtworkDoc(artworkId) : redirectSignIn());

  const redirectSignIn = () => history.push('/signin');

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
