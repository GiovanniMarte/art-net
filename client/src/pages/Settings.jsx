import React from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Avatar,
  Button,
} from '@chakra-ui/react';

const Settings = () => {
  return (
    <Box p={10}>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Configuración
              </Heading>
              <Text mt={1} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                Esta información se mostrará públicamente así que ten cuidado con lo que compartes.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, 'md']}
              overflow={{ sm: 'hidden' }}
            >
              <Stack px={4} py={5} spacing={6} p={{ sm: 6 }}>
                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel htmlFor="first_name" fontSize="sm" fontWeight="md">
                    Nombre
                  </FormLabel>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 4]}>
                  <FormLabel htmlFor="email_address" fontSize="sm" fontWeight="md">
                    Dirección de correo
                  </FormLabel>
                  <Input
                    type="text"
                    name="email_address"
                    id="email_address"
                    autoComplete="email"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <div>
                  <FormControl id="email" mt={1}>
                    <FormLabel fontSize="sm" fontWeight="md">
                      Acerca de
                    </FormLabel>
                    <Textarea
                      placeholder="Soy un artista independiente..."
                      mt={1}
                      rows={3}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{ sm: 'sm' }}
                    />
                    <FormHelperText>Descripción breve sobre tí</FormHelperText>
                  </FormControl>
                </div>

                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="md">
                    Foto
                  </FormLabel>
                  <Flex alignItems="center" mt={1}>
                    <Avatar boxSize={12} />
                    <Button
                      type="button"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: 'none' }}
                    >
                      Cambiar
                    </Button>
                  </Flex>
                </FormControl>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue('gray.50', 'gray.900')}
                textAlign="right"
              >
                <Button type="submit">Guardar</Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
