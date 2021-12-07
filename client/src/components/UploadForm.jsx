import {
  Flex,
  Box,
  FormControl,
  HStack,
  Radio,
  RadioGroup,
  FormLabel,
  Input,
  Stack,
  Button,
  Progress,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

const UploadForm = () => {
  const [image, setImage] = useState(null);

  const handleChange = event => {
    setImage(event.target.files[0]);
  };

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
          <Stack spacing={3} as={'form'}>
            <FormControl id="title" isRequired>
              <FormLabel>Título</FormLabel>
              <Input name="title" type="text" />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Descripción</FormLabel>
              <Textarea name="description" placeholder="Introduce la descripción de la obra" />
            </FormControl>
            <FormControl id="visibility" isRequired>
              <FormLabel as="legend">Visibilidad</FormLabel>
              <RadioGroup defaultValue="public">
                <HStack spacing="24px">
                  <Radio value="public">Público</Radio>
                  <Radio value="private">Privado</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Stack>
              <Button leftIcon={<FiUpload />} cursor="pointer" as="label">
                <input type="file" onChange={handleChange} />
                Elegir imagen
              </Button>
              <Progress size="xs" value={0} />
            </Stack>
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
