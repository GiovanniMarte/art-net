import { Stack, Text, Avatar, Badge, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import { useSelector } from 'react-redux';
import DeleteButton from './DeleteButton';
import { handleDeleteCommentError } from '../auth-handler/errorHandler';
import { handleDeleteCommentSuccess } from '../auth-handler/successHandler';
import { deleteComment } from '../firebase/firebase';

const Comment = ({ artworkAuthor, artworkId, comment }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  moment.locale('es');

  const deleteArtworkComment = async () => {
    try {
      await deleteComment(artworkId, comment.id);
      handleDeleteCommentSuccess();
    } catch (error) {
      handleDeleteCommentError();
    }
  };

  return (
    <Stack align="center" spacing={3} direction="row">
      <Avatar src={comment.author.profileImage} alt="Autor" />
      <Stack>
        <Stack align="center" direction="row">
          <Link as={RouterLink} to={`/gallery/${comment.author.id}`} fontWeight="600">
            {comment.author.displayName}
          </Link>
          {artworkAuthor === comment.author.displayName ? (
            <Badge colorScheme="red">Autor</Badge>
          ) : null}
          <Text color="gray.500" fontSize="sm">
            {moment(comment.createdAt.toDate()).fromNow()}
          </Text>
          {currentUser ? (
            currentUser.id === comment.author.id ? (
              <DeleteButton
                deleteHandler={deleteArtworkComment}
                title="Estas segur@?"
                body={`Si pulsas Aceptar se eliminará el comentario para siempre`}
              />
            ) : null
          ) : null}
        </Stack>
        <Text>{comment.body}</Text>
      </Stack>
    </Stack>
  );
};

export default Comment;
