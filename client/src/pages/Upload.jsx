import { Flex, HStack, Stack, Heading, Text } from '@chakra-ui/react';

import Artwork from '../components/Artwork';
import UploadForm from '../components/UploadForm';
import { useSelector } from 'react-redux';

const Upload = () => {
  const artwork = useSelector(state => state.artwork);
  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <Flex align="center" direction="column" height="80vh">
      <Stack m={2} align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Crear nueva obra
        </Heading>
        <Text fontSize={'lg'} color={'gray.500'}>
          Introduce los datos de tu nueva obra para compartirla con los demás!
        </Text>
      </Stack>
      <HStack>
        <UploadForm />
        <Artwork artwork={artwork} currentUser={currentUser} />
      </HStack>
    </Flex>
  );
};

export default Upload;
