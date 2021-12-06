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
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const SignIn = () => {
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
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Recordarme</Checkbox>
              </Stack>
              <Button
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Iniciar sesión
              </Button>
              <Stack>
                <Text fontSize={'md'} color={'gray.500'} align={'center'}>
                  No tienes cuenta?{' '}
                  <Link as={RouterLink} to="/signup" color={'blue.400'}>
                    Registrate!
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
