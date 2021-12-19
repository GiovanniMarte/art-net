import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

// Configuración de tostada
const AuthSuccess = description => {
  return {
    title: 'Éxito',
    description: description,
    status: 'success',
    duration: 3000,
    isClosable: true,
  };
};

export const handleSignOutSuccess = () => toast(AuthSuccess('Has cerrado sesión'));

export const handleSignUpSuccess = () =>
  toast(AuthSuccess('Has podido registrar tu cuenta satisfactoriamente'));
