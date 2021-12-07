import { Flex, HStack, Stack, Heading, Text } from '@chakra-ui/react';

import Artwork from '../components/Artwork';
import UploadForm from '../components/UploadForm';

const Upload = () => {
  return (
    <Flex align="center" direction="column" height="80vh">
      <Stack mb={10} align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Crear nueva obra
        </Heading>
        <Text fontSize={'lg'} color={'gray.500'}>
          Introduce los datos de tu nueva obra para compartirla con los demás!
        </Text>
      </Stack>
      <HStack>
        <UploadForm />
        <Artwork />
      </HStack>
    </Flex>
  );
};

export default Upload;
