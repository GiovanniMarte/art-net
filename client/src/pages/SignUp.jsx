import {
  Flex,
  Box,
  Button as ChakraButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { auth, createUserDocument } from '../firebase/firebase';
import Button from '../components/Button';
import { handleSignUpError } from '../auth-handler/errorHandler';
import { handleSignUpSuccess } from '../auth-handler/successHandler';

const INITIAL_STATE = {
  displayName: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [{ displayName, email, password }, setUserCredentials] = useState(INITIAL_STATE);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      createUserDocument(user, { displayName });
      clearCredentials();
      handleSignUpSuccess()
    } catch (error) {
      handleSignUpError(error)();
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
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Registrarse
          </Heading>
          <Text fontSize="lg" color="gray.500">
            Forma parte de nuestra gran comunidad de arte!
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
            <FormControl id="displayName" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input name="displayName" value={displayName} onChange={handleChange} type="text" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input name="email" value={email} onChange={handleChange} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                />
                <InputRightElement h="full">
                  <ChakraButton
                    variant="ghost"
                    onClick={() => setShowPassword(showPassword => !showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </ChakraButton>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                {...(isLoading ? { isLoading } : null)}
                size="lg"
                type="submit"
                isDisabled={!(displayName && email && password)}
              >
                Registrarse
              </Button>
            </Stack>
            <Stack pt={5}>
              <Text fontSize="md" color="gray.500" align="center">
                Ya tienes cuenta?{' '}
                <Link as={RouterLink} to="/signin" color="blue.400">
                  Inicia sesión
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
