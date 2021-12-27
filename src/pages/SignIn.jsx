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
import { auth } from '../firebase/firebase';
import { provider } from '../firebase/firebase';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Button from '../components/Button';
import { handleSignInError } from '../notifications/errorHandler';
import useForm from '../hooks/useForm';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [{ email, password }, handleChange] = useForm(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      handleSignInError(error)();
    }
    setIsLoading(false);
  };

  const handleGoogleClick = async () => {
    setIsGoogleLoading(true);
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      handleSignInError(error)();
    }
    setIsGoogleLoading(false);
  };

  return (
    <Flex align="center" justify="center">
      <Stack mx="auto" maxW="lg" spacing={8} py={10} px={{ base: 0, sm: 8 }}>
        <Stack align="center">
          <Heading fontSize="4xl">Iniciar sesión </Heading>
          <Text fontSize="lg" color="gray.500" align="center">
            Introduce tu dirección de correo electrónico y contraseña para acceder a tu cuenta
          </Text>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
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
                isLoading={isLoading}
                disabled={isLoading || isGoogleLoading || !(email && password)}
                size="lg"
                type="submit"
              >
                Iniciar sesión
              </Button>
              <ChakraButton
                onClick={handleGoogleClick}
                isLoading={isGoogleLoading}
                disabled={isGoogleLoading || isLoading}
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
