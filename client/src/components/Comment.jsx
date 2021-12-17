import { Stack, Text, Avatar, Badge, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

const Comment = ({ artworkAuthor, comment }) => {
  moment.locale('es');

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
        </Stack>
        <Text>{comment.body}</Text>
      </Stack>
    </Stack>
  );
};

export default Comment;
