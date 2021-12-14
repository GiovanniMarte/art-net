import { Stack, Text, Avatar } from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/es';

const Comment = () => {
  const comment = { user: 'Nirets', body: 'Hola que tal compañero', createdAt: new Date() };
  moment.locale('es');
  return (
    <Stack align="center" spacing={3} direction="row">
      <Avatar />
      <Stack>
        <Stack align="center" direction="row">
          <Text fontWeight="600">{comment.user}</Text>
          <Text color="gray.500" fontSize="sm">
            {moment(comment.createdAt).format('DD MMM YYYY')}
          </Text>
        </Stack>
        <Text>{comment.body}</Text>
      </Stack>
    </Stack>
  );
};

export default Comment;
