import { Stack, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const AuthButtons = () => {
  return (
    <Stack flex={{ base: 1, md: 0 }} direction={'row'} justify={'flex-end'} spacing={5}>
      <Button as={RouterLink} to="/signin" fontSize={'sm'} fontWeight={400} variant={'link'}>
        Iniciar sesión
      </Button>
      <Button
        as={RouterLink}
        to="/signup"
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bg={'pink.400'}
        _hover={{
          bg: 'pink.300',
        }}
      >
        Registrarse
      </Button>
    </Stack>
  );
};

export default AuthButtons;
