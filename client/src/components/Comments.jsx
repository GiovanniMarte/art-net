import { Stack, Box, Divider, Text, useColorModeValue } from '@chakra-ui/react';
import CommentsForm from './CommentsForm';
import Comment from './Comment';

const Comments = ({ artwork }) => {
  return (
    <Stack spacing={8} bg={useColorModeValue('white', 'gray.700')} p={5}>
      <CommentsForm artworkId={artwork.id} />
      <Stack spacing={4}>
        {artwork.comments ? (
          artwork.comments.map(artwork => (
            <Box>
              <Comment />
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
