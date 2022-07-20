import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

// Configuración de tostada
const errorConfig = description => {
  return {
    title: 'Ha ocurrido un error',
    description: description,
    status: 'error',
    duration: 3000,
    isClosable: true,
  };
};

export const handleSignInError = error => {
  switch (error.code) {
    case 'auth/user-not-found':
      return () => toast(errorConfig('El email introducido no existe'));
    case 'auth/wrong-password':
      return () => toast(errorConfig('La contraseña introducida es incorrecta'));
    case 'auth/too-many-requests':
      return () =>
        toast(
          errorConfig(
            'Estás inentando acceder demasiadas veces en un periodo corto de tiempo. Inténtalo más tarde'
          )
        );
    case 'auth/popup-closed-by-user':
      return () =>
        toast(errorConfig('Has cerrado la ventana emergente antes de finalizar la operación'));
    default:
      return () =>
        toast(
          errorConfig(
            'Se ha producido un error en el inicio de sesión. Por favor inténtalo más tarde'
          )
        );
  }
};

export const handleSignUpError = error => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return () => toast(errorConfig('Ya existe una cuenta con el email introducido'));
    case 'auth/weak-password':
      return () => toast(errorConfig('La contraseña es demasiado débil'));
    default:
      return () =>
        toast(
          errorConfig('Se ha producido un error en el registro. Por favor inténtalo más tarde')
        );
  }
};

export const handleArtworkSubmitError = () =>
  toast(errorConfig('Se ha producido un error en la publicación. Por favor inténtalo más tarde'));

export const handleDeleteCommentError = () =>
  toast(
    errorConfig('Se ha producido un error al eliminar tu comentario. Por favor inténtalo más tarde')
  );

export const handleDeleteArtworkError = () =>
  toast(errorConfig('Se ha producido un error al eliminar tu obra. Por favor inténtalo más tarde'));

export const handleUpdateUserDataError = () =>
  toast(errorConfig('No se han podido actualizar tus datos. Por favor inténtalo más tarde'));

export const handleUpdateImageError = () =>
  toast(
    errorConfig('No se han podido actualizar tu foto de perfil. Por favor inténtalo más tarde')
  );

export const handleRemoveImageError = () =>
  toast(errorConfig('No se han podido eliminar tu foto de perfil. Por favor inténtalo más tarde'));
