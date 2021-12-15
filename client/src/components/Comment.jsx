import { Stack, Text, Avatar } from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/es';

const Comment = ({ comment }) => {
  moment.locale('es');

  return (
    <Stack align="center" spacing={3} direction="row">
      <Avatar />
      <Stack>
        <Stack align="center" direction="row">
          <Text fontWeight="600">{comment.user}</Text>
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
