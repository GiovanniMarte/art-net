import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Center,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [{ email, password }, setUserCredentials] = useState(INITIAL_STATE);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      clearCredentials();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials(currentCredentials => ({ ...currentCredentials, [name]: value }));
  };

  const clearCredentials = () => setUserCredentials({ ...INITIAL_STATE });

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack align={'center'} spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Iniciar sesión </Heading>
          <Text fontSize={'lg'} color={'gray.500'} align={'center'}>
            Introduce tu dirección de correo electrónico y contraseña para acceder a tu cuenta
          </Text>
        </Stack>
        <Box
          minW={'md'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack as={'form'} onSubmit={handleSubmit} spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input name="email" value={email} onChange={handleChange} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input name="password" value={password} onChange={handleChange} type="password" />
            </FormControl>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Checkbox>Recordarme</Checkbox>
            </Stack>
            <Stack spacing={5}>
              <Button
                type={'submit'}
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Iniciar sesión
              </Button>
              <Button w={'full'} maxW={'md'} variant={'outline'} leftIcon={<FcGoogle />}>
                <Center>
                  <Text>Iniciar sesión con Google</Text>
                </Center>
              </Button>
            </Stack>
            <Stack pt={5}>
              <Text fontSize={'md'} color={'gray.500'} align={'center'}>
                No tienes cuenta?
                <Link as={RouterLink} to="/signup" color={'blue.400'}>
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
