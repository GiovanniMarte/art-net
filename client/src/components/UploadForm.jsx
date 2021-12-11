import {
  Flex,
  Box,
  FormControl,
  HStack,
  Radio,
  RadioGroup,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { storage, createArtworkDocument } from '../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setImageUrl, setTitle, setDescription } from '../redux/artwork/artworkActions';

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('No se ha seleccionado ninguna imagen');

  const artwork = useSelector(state => state.artwork);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const handleChange = event => {
    if (!event.target.files[0]) return;
    setImage(event.target.files[0]);
    setSelectedImage(event.target.files[0].name);
    dispatch(setImageUrl(URL.createObjectURL(event.target.files[0])));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const fileRef = storage.ref(`artworks/${image.name}`);
    try {
      await fileRef.put(image);
      const imageUrl = await fileRef.getDownloadURL();
      createArtworkDocument({ ...artwork, imageUrl }, currentUser.displayName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          minW={'md'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack onSubmit={handleSubmit} spacing={3} as={'form'}>
            <FormControl id="title" isRequired>
              <FormLabel>Título</FormLabel>
              <Input
                value={artwork.title}
                onChange={event => dispatch(setTitle(event.target.value))}
                name="title"
                type="text"
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                value={artwork.description}
                onChange={event => dispatch(setDescription(event.target.value))}
                name="description"
                placeholder="Introduce la descripción de la obra"
              />
            </FormControl>
            <FormControl id="visibility" isRequired>
              <FormLabel as="legend">Visibilidad</FormLabel>
              <RadioGroup defaultValue="public">
                <HStack spacing="24px">
                  <Radio value="public">Público</Radio>
                  <Radio value="private">Privado</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Stack>
              <Button leftIcon={<FiUpload />} cursor="pointer" as="label">
                <Input type="file" onChange={handleChange} isRequired />
                Elegir imagen
              </Button>
              <Text>{selectedImage}</Text>
            </Stack>
            <Stack pt={2}>
              <Button
                type="submit"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Subir
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default UploadForm;
