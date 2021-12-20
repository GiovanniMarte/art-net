import { Box, Stack, Avatar, AvatarBadge, IconButton, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../components/Modal';
import ImagePicker from '../components/ImagePicker';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { removeProfileImage, updateProfileImage } from '../firebase/firebase';
import {
  handleRemoveImageSuccess,
  handleUpdateUserDataSuccess,
} from '../auth-handler/successHandler';
import { handleRemoveImageError, handleUpdateUserDataError } from '../auth-handler/errorHandler';

const ImageSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [image, setImage] = useState(null);
  const currentUser = useSelector(state => state.user.currentUser);

  const handleRemoveImage = async () => {
    setIsRemoveLoading(true);
    try {
      await removeProfileImage(currentUser.id);
      handleRemoveImageSuccess();
    } catch (error) {
      handleRemoveImageError();
    }
    setIsRemoveLoading(false);
  };

  useEffect(() => {
    if (!image) return;
    const handleUpdateImage = async () => {
      setIsUpdateLoading(true);
      try {
        await updateProfileImage(currentUser.id, image);
        handleUpdateUserDataSuccess();
      } catch (error) {
        handleUpdateUserDataError();
      }
      setIsUpdateLoading(false);
    };
    handleUpdateImage();
  }, [image, currentUser.id]);

  return (
    <Stack align="center" justify="space-between" direction={['column', 'row']} spacing={6}>
      <Avatar size="xl" src={currentUser.profileImage}>
        {currentUser.profileImage ? (
          <>
            <AvatarBadge
              as={IconButton}
              isLoading={isRemoveLoading}
              disabled={isUpdateLoading}
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
      <Box flex={1}>
        <ImagePicker
          isLoading={isUpdateLoading}
          disabled={isRemoveLoading}
          setImage={setImage}
          buttonText="Cambiar foto"
        />
      </Box>
    </Stack>
  );
};

export default ImageSettings;
