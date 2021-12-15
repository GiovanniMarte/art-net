import { Stack, Box, Divider, Text, useColorModeValue } from '@chakra-ui/react';
import CommentsForm from './CommentsForm';
import Comment from './Comment';
import { useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { setArtworkDetailComments } from '../redux/artwork-detail/artworkDetailActions';

const Comments = ({ artwork }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firestore
      .collection(`/artworks/${artwork.id}/comments`)
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
        dispatch(setArtworkDetailComments(data));
      });
    return () => unsubscribe();
  }, [dispatch, artwork.id]);

  return (
    <Stack spacing={8} bg={useColorModeValue('white', 'gray.700')} p={5}>
      <CommentsForm artworkId={artwork.id} />
      <Stack spacing={4}>
        {artwork.comments ? (
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
