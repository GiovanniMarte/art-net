import {
  Button,
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Divider,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSettingsName, setSettingsBio, clearSettings } from '../redux/settings/settingsActions';
import { updateUserData } from '../firebase/firebase';
import ImageSettings from '../components/settings/ImageSettings';
import { handleUpdateUserDataSuccess } from '../auth-handler/successHandler';
import { handleUpdateUserDataError } from '../auth-handler/errorHandler';

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await updateUserData(currentUser.id, settings);
      dispatch(clearSettings());
      handleUpdateUserDataSuccess();
    } catch (error) {
      handleUpdateUserDataError();
    }
    setIsLoading(false);
  };

  return (
    <Flex justify="center">
      <Stack
        as="form"
        onSubmit={handleSubmit}
        spacing={4}
        w="full"
        maxW="md"
        bg={useColorModeValue('white', 'gray.700')}
        rounded="xl"
        boxShadow="lg"
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Editar perfil
        </Heading>
        <Divider />
        <FormControl id="profileImage">
          <FormLabel>Foto de perfil</FormLabel>
          <ImageSettings />
        </FormControl>
        <FormControl id="displayName">
          <FormLabel>Nombre</FormLabel>
          <Input
            value={settings.displayName}
            onChange={event => dispatch(setSettingsName(event.target.value))}
            placeholder={currentUser.displayName}
            name="displayName"
            type="text"
          />
        </FormControl>
        <FormControl id="biography">
          <FormLabel>Biografía</FormLabel>
          <Textarea
            value={settings.bio}
            onChange={event => dispatch(setSettingsBio(event.target.value))}
            minH={100}
            placeholder={currentUser.bio}
            name="biography"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            isDisabled={!(settings.displayName || settings.bio)}
            isLoading={isLoading}
            type="submit"
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
          >
            Actualizar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Settings;
