import { Text, HStack } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateScore } from '../firebase/firebase';

const Score = ({ artwork }) => {
  const history = useHistory();
  const currentUser = useSelector(state => state.user.currentUser);
  const scores = useSelector(state => state.scores.list);

  const getCurrentScores = () => scores.filter(score => score.artworkId === artwork.id);

  const getArtworkScore = () => getCurrentScores().reduce((accum, score) => accum + score.value, 0);

  const getUserScore = () => {
    const score = getCurrentScores().find(score => score.userId === currentUser.id);
    return score ? score.value : 0;
  };

  const handleUpvote = () => {
    if (!currentUser) {
      redirectSignIn();
      return;
    }
    const vote = getUserScore() === 1 ? 0 : 1;
    updateScore(artwork.id, currentUser.id, vote);
  };

  const handleDownvote = () => {
    if (!currentUser) {
      redirectSignIn();
      return;
    }
    const vote = getUserScore() === -1 ? 0 : -1;
    updateScore(artwork.id, currentUser.id, vote);
  };

  const redirectSignIn = () => history.push('/signin');

  return (
    <HStack borderWidth="1px" borderRadius="lg">
      <ChevronUpIcon
        userSelect="none"
        onClick={handleUpvote}
        boxSize={6}
        cursor="pointer"
        transition="300ms"
        color={currentUser ? (getUserScore() === 1 ? 'green.400' : 'white') : 'white'}
        _hover={{
          color: 'green.400',
        }}
      />
      <Text fontSize="md" fontWeight={500}>
        {getArtworkScore()}
      </Text>
      <ChevronDownIcon
        userSelect="none"
        onClick={handleDownvote}
        boxSize={6}
        cursor="pointer"
        transition="300ms"
        color={currentUser ? (getUserScore() === -1 ? 'red.400' : 'white') : 'white'}
        _hover={{
          color: 'red.400',
        }}
      />
    </HStack>
  );
};

export default Score;
