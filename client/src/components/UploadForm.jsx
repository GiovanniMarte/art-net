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
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import { storage, createArtworkDocument } from '../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { firestore } from '../firebase/firebase';
import {
  setImageUrl,
  setTitle,
  setDescription,
  addCommunity,
  removeCommunity,
} from '../redux/artwork/artworkActions';
import { setCommunities } from '../redux/communities/communitiesActions';

const UploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('No se ha seleccionado ninguna imagen');

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

  const handleChange = event => {
    if (!event.target.files[0]) return;
    setImage(event.target.files[0]);
    setSelectedImage(event.target.files[0].name);
    dispatch(setImageUrl(URL.createObjectURL(event.target.files[0])));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    const fileRef = storage.ref(`artworks/${image.name}`);
    try {
      await fileRef.put(image);
      const imageUrl = await fileRef.getDownloadURL();
      createArtworkDocument({ ...artwork, imageUrl }, currentUser.displayName);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleCheckboxChange = event => {
    const { checked, value } = event.target;
    const { id, name, badgeColor } = communities.find(community => community.id === value);
    const communityPreview = { id, name, badgeColor };
    if (checked) {
      dispatch(addCommunity(communityPreview));
    } else {
      dispatch(removeCommunity(communityPreview));
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
          <Stack onSubmit={handleSubmit} spacing={4} as={'form'}>
            <FormControl id="title" isRequired>
              <FormLabel>Título</FormLabel>
              <Input
                value={artwork.title}
                onChange={event => dispatch(setTitle(event.target.value))}
                name="title"
                type="text"
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
            <FormControl id="visibility" isRequired>
              <FormLabel as="legend">Comunidades</FormLabel>
              {communities.map(community => (
                <Checkbox
                  onChange={handleCheckboxChange}
                  value={community.id}
                  mr={3}
                  key={community.id}
                  isChecked={artwork.communities.some(
                    communityPrev => communityPrev.id === community.id
                  )}
                >
                  {community.name}
                </Checkbox>
              ))}
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
                {...(isLoading ? { isLoading } : null)}
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
