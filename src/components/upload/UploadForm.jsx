import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  createArtworkDocument,
  updateCommunityArtworksCounter,
  uploadImage,
} from '../../firebase/functions';
import { listenCommunities } from '../../firebase/listeners';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTitle,
  setDescription,
  clearArtwork,
  setImageUrl,
} from '../../redux/artwork/artworkActions';
import CheckboxGroup from './CheckboxGroup';
import VisibilityControl from './VisibilityControl';
import ImagePicker from '../ImagePicker';
import Button from '../Button';
import { useHistory } from 'react-router-dom';
import { handleArtworkSubmitError } from '../../notifications/errorHandler';
import { removeCommunities } from '../../redux/communities/communitiesActions';

const UploadForm = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const artwork = useSelector(state => state.artwork);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = listenCommunities();
    return () => {
      dispatch(removeCommunities());
      unsubscribe();
    };
  }, [dispatch]);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const imageUrl = await uploadImage('artworks', image);
      const artworkRef = await createArtworkDocument({ ...artwork, imageUrl }, currentUser);

      const communities = artwork.communities.map(community => community.id);
      updateCommunityArtworksCounter(communities, 1);

      redirectArtwork(artworkRef.id);
      dispatch(clearArtwork());
    } catch (error) {
      handleArtworkSubmitError();
    }
    setIsLoading(false);
  };

  const setImageState = image => dispatch(setImageUrl(URL.createObjectURL(image)));

  const redirectArtwork = artworkId => history.push(`/artwork/${artworkId}`);

  return (
    <Flex align="center" justify="center">
      <Stack mx="auto" maxW="lg" py={10} px={{ base: 0, sm: 0, lg: 6 }}>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack onSubmit={handleSubmit} spacing={4} as="form">
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
            <VisibilityControl />
            <CheckboxGroup />
            <ImagePicker
              hasFileLabel
              setImageState={setImageState}
              buttonText="Elegir imagen"
              setImage={setImage}
              isRequired
            />
            <Stack pt={2}>
              <Button size="lg" {...(isLoading ? { isLoading } : null)} type="submit">
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
