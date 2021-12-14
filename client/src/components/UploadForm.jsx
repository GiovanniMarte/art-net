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
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { storage, createArtworkDocument } from '../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { firestore } from '../firebase/firebase';
import { setTitle, setDescription, submitArtwork } from '../redux/artwork/artworkActions';
import { setCommunities } from '../redux/communities/communitiesActions';
import CheckboxGroup from './CheckboxGroup';
import ImagePicker from './ImagePicker';
import Button from './Button';

const UploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const artwork = useSelector(state => state.artwork);
  const currentUser = useSelector(state => state.user.currentUser);
  const communities = useSelector(state => state.communities.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (communities.length) return;
    const unsubscribe = firestore.collection('communities').onSnapshot(snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
      dispatch(setCommunities(data));
    });
    return () => unsubscribe();
  }, [dispatch, communities]);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    const fileRef = storage.ref(`artworks/${image.name}`);
    try {
      await fileRef.put(image);
      const imageUrl = await fileRef.getDownloadURL();
      await createArtworkDocument({ ...artwork, imageUrl }, currentUser.displayName);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(submitArtwork());
      setIsLoading(false);
    }
  };

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack mx={'auto'} maxW={'lg'} py={10} px={6}>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack onSubmit={handleSubmit} spacing={4} as={'form'}>
            <FormControl id="title" isRequired>
              <FormLabel>Título</FormLabel>
              <Input
                value={artwork.title}
                onChange={event => dispatch(setTitle(event.target.value))}
                name="title"
                placeholder="Introduce el título de la obra"
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
            <CheckboxGroup />
            <ImagePicker setImage={setImage} />
            <Stack pt={2}>
              <Button {...(isLoading ? { isLoading } : null)} type="submit">
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
