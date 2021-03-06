import { Flex, Stack, Heading, Text } from '@chakra-ui/react';

import Artwork from '../components/artwork/Artwork';
import UploadForm from '../components/upload/UploadForm';
import { useSelector } from 'react-redux';

const Upload = () => {
  const artwork = useSelector(state => state.artwork);

  return (
    <Flex align="center" justify="center" direction="column">
      <Stack m={2} align="center">
        <Heading fontSize="4xl" textAlign="center">
          Crear nueva obra
        </Heading>
        <Text align="center" fontSize="lg" color="gray.500">
          Introduce los datos de tu nueva obra para compartirla con los demás!
        </Text>
      </Stack>
      <Stack
        direction={{ base: 'column', md: 'column', lg: 'row', xl: 'row', '2xl': 'row' }}
        align="center"
      >
        <UploadForm />
        <Artwork isPreview artwork={artwork} />
      </Stack>
    </Flex>
  );
};

export default Upload;
