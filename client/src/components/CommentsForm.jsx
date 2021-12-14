import { FormControl, Heading, Stack, Textarea, Button as ChakraButton } from '@chakra-ui/react';
import Button from './Button';
import { useState } from 'react';
import { createCommentDoc } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CommentForm = ({ artworkId }) => {
  const history = useHistory();
  const [body, setBody] = useState('');
  const currentUser = useSelector(state => state.user.currentUser);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!currentUser) {
      redirectSignIn();
      return;
    }
    try {
      await createCommentDoc(artworkId, currentUser.id, body);
      setBody('');
    } catch (error) {
      console.error(error.message);
    }
  };

  const redirectSignIn = () => history.push('/signin');

  return (
    <Stack maxW={800} spacing={3} as="form" onSubmit={handleSubmit}>
      <Heading as="h2" size="xl">
        Comentarios
      </Heading>
      <FormControl id="description" isRequired>
        <Textarea
          value={body}
          onChange={event => setBody(event.target.value)}
          name="description"
          placeholder="Añade un comentario a la obra. Recuerda ser respetuoso"
        />
      </FormControl>
      <Stack direction="row">
        <Button size="md" isDisabled={!body} type="submit">
          Comentar
        </Button>
        <ChakraButton size="md" onClick={() => setBody('')} isDisabled={!body}>
          Borrar
        </ChakraButton>
      </Stack>
    </Stack>
  );
};

export default CommentForm;
