import { updateFollow } from '../../firebase/firebase';
import { Button as ChakraButton } from '@chakra-ui/react';

const FollowButton = ({ followerId, followedId, isCommunity, isFollowing, ...restProps }) => {
  const handleClick = async () => {
    try {
      await updateFollow(followerId, followedId, isCommunity);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraButton
      {...restProps}
      onClick={handleClick}
      bg={!isFollowing ? 'blue.400' : 'red.400'}
      color="white"
      _hover={
        !isFollowing
          ? {
              bg: 'blue.500',
            }
          : {
              bg: 'red.500',
            }
      }
    >
      {!isFollowing ? 'Seguir' : 'Dejar de seguir'}
    </ChakraButton>
  );
};

export default FollowButton;
