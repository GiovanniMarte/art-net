import {
  Button,
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import ImagePicker from '../components/ImagePicker';
import { useSelector } from 'react-redux';

const Settings = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <Flex justify="center">
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Editar perfil
        </Heading>
        <FormControl id="userName">
          <FormLabel>Foto de perfil</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <ImagePicker buttonText="Cambiar foto" />
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="displayName">
          <FormLabel>Nombre</FormLabel>
          <Input placeholder={currentUser.displayName} name="displayName" type="text" />
        </FormControl>
        <FormControl id="biography">
          <FormLabel>Biografía</FormLabel>
          <Textarea placeholder={currentUser.bio} name="biography" />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
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
