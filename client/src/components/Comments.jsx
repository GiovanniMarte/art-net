import {
  Box,
  FormControl,
  Heading,
  Stack,
  Textarea,
  useColorModeValue,
  Button as ChakraButton,
} from '@chakra-ui/react';
import Button from './Button';
import { useState } from 'react';
import { createCommentDoc } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Comments = ({ artwork }) => {
  const history = useHistory();
  const [body, setBody] = useState('');
  const currentUser = useSelector(state => state.user.currentUser);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await createCommentDoc(artwork.id, currentUser.id, body);
      setBody('');
    } catch (error) {
      console.error(error.message);
    }
  };

  const redirectSignIn = () => history.push('/signin');

  return (
    <Box bg={useColorModeValue('white', 'gray.700')} p={5}>
      <Heading as="h2" size="xl" mb={5}>
        Comentarios
      </Heading>
      <Stack maxW={800} spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl id="description" isRequired>
          <Textarea
            value={body}
            onChange={event => (currentUser ? setBody(event.target.value) : redirectSignIn())}
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
    </Box>
  );
};

export default Comments;
