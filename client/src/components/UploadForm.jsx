import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

const UploadForm = () => {
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          minW={'md'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack as={'form'}>
            <FormControl id="title" isRequired>
              <FormLabel>Título</FormLabel>
              <Input name="title" type="text" />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Descripción</FormLabel>
              <Textarea name="description" placeholder="Introduce la descripción de la obra" />
            </FormControl>
            <Stack pt={2}>
              <Button
                type={'submit'}
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Subir
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default UploadForm;
