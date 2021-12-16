import { Stack, Text, Avatar, Badge } from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/es';

const Comment = ({ artworkAuthor, comment }) => {
  moment.locale('es');

  return (
    <Stack align="center" spacing={3} direction="row">
      <Avatar src={comment.author.profileImage} alt="Autor" />
      <Stack>
        <Stack align="center" direction="row">
          <Text fontWeight="600">{comment.author.displayName}</Text>
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
