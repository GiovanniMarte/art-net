import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button as ChakraButton,
  Heading,
  Center,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { auth, signInWithGoogle } from '../firebase/firebase';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Button from '../components/Button';
import { handleSignInError } from '../auth-handler/errorHandler';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ email, password }, setUserCredentials] = useState(INITIAL_STATE);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      clearCredentials();
    } catch (error) {
      handleSignInError(error)();
    }
    setIsLoading(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials(currentCredentials => ({ ...currentCredentials, [name]: value }));
  };

  const clearCredentials = () => setUserCredentials({ ...INITIAL_STATE });

  return (
    <Flex align="center" justify="center">
      <Stack align="center" spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Iniciar sesión </Heading>
          <Text fontSize="lg" color="gray.500" align="center">
            Introduce tu dirección de correo electrónico y contraseña para acceder a tu cuenta
          </Text>
        </Stack>
        <Box
          minW="md"
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack as="form" onSubmit={handleSubmit} spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input name="email" value={email} onChange={handleChange} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input name="password" value={password} onChange={handleChange} type="password" />
            </FormControl>
            <Stack direction={{ base: 'column', sm: 'row' }} align="start" justify="space-between">
              <Checkbox>Recordarme</Checkbox>
            </Stack>
            <Stack spacing={5}>
              <Button
                {...(isLoading ? { isLoading } : null)}
                size="lg"
                type="submit"
                isDisabled={!(email && password)}
              >
                Iniciar sesión
              </Button>
              <ChakraButton
                onClick={signInWithGoogle}
                w="full"
                variant="outline"
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Iniciar sesión con Google</Text>
                </Center>
              </ChakraButton>
            </Stack>
            <Stack pt={5}>
              <Text fontSize="md" color="gray.500" align="center">
                No tienes cuenta?{' '}
                <Link as={RouterLink} to="/signup" color="blue.400">
                  Registrate!
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
