import { Stack, Avatar, AvatarBadge, IconButton, Center, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../components/Modal';
import ImagePicker from '../components/ImagePicker';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { removeProfileImage, updateProfileImage } from '../firebase/firebase';

const ImageSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);

  const handleRemoveImage = async () => {
    setIsLoading(true);
    try {
      await removeProfileImage(currentUser.id);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleUpdateImage = () => {};

  return (
    <Stack direction={['column', 'row']} spacing={6}>
      <Center>
        <Avatar size="xl" src={currentUser.profileImage}>
          {currentUser.profileImage ? (
            <>
              <AvatarBadge
                as={IconButton}
                isLoading={isLoading}
                onClick={onOpen}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="Eliminar imagen"
                icon={<SmallCloseIcon />}
              />
              <Modal
                body={`Si pulsas Aceptar se eliminará tu foto de perfil`}
                isOpen={isOpen}
                onClose={onClose}
                actionHandler={handleRemoveImage}
              />
            </>
          ) : null}
        </Avatar>
      </Center>
      <Center w="full">
        <ImagePicker buttonText="Cambiar foto" />
      </Center>
    </Stack>
  );
};

export default ImageSettings;
