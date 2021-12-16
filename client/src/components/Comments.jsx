import { Stack, Box, Divider, Text, useColorModeValue } from '@chakra-ui/react';
import CommentsForm from './CommentsForm';
import Comment from './Comment';
import { useEffect } from 'react';
import { listenComments } from '../firebase/listeners';

const Comments = ({ artwork }) => {
  useEffect(() => {
    const unsubscribe = listenComments(artwork.id);
    return () => unsubscribe();
  }, [artwork.id]);

  return (
    <Stack spacing={8} bg={useColorModeValue('white', 'gray.700')} p={5}>
      <CommentsForm artworkId={artwork.id} />
      <Stack spacing={4}>
        {artwork.comments.length ? (
          artwork.comments.map(comment => (
            <Box key={comment.id}>
              <Comment comment={comment} />
              <Divider mt={4} />
            </Box>
          ))
        ) : (
          <Text as="i" color="gray.500">
            No hay ningún comentario. Sé el primero en comentar!
          </Text>
        )}
      </Stack>
    </Stack>
  );
};

export default Comments;
