import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

// Configuración de tostada
const successConfig = description => {
  return {
    title: 'Éxito',
    description: description,
    status: 'success',
    duration: 3000,
    isClosable: true,
  };
};

export const handleSignOutSuccess = () => toast(successConfig('Has cerrado sesión'));

export const handleSignUpSuccess = () =>
  toast(successConfig('Has podido registrar tu cuenta satisfactoriamente'));

export const handleDeleteCommentSuccess = () => toast(successConfig('Has eliminado tu comentario'));

export const handleUpdateUserDataSuccess = () =>
  toast(successConfig('Tus datos se han actualizado correctamente'));

export const handleUpdateImageSuccess = () =>
  toast(successConfig('Tu foto de perfil se ha actualizado correctamente'));

export const handleRemoveImageSuccess = () =>
  toast(successConfig('Tu foto de perfil se ha eliminado correctamente'));
