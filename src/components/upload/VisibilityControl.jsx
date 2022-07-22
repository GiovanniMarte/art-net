import { FormControl, HStack, Radio, RadioGroup, FormLabel } from '@chakra-ui/react';

const VisibilityControl = () => {
  return (
    <FormControl id="visibility" isRequired>
      <FormLabel as="legend">Visibilidad</FormLabel>
      <RadioGroup defaultValue="public">
        <HStack spacing="24px">
          <Radio value="public">Público</Radio>
          <Radio value="private">Privado</Radio>
        </HStack>
      </RadioGroup>
    </FormControl>
  );
};

export default VisibilityControl;
