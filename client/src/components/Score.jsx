import { Text, HStack } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

const Score = () => {
  return (
    <HStack borderWidth="1px" borderRadius="lg">
      <ChevronUpIcon
        boxSize={6}
        _hover={{
          color: 'green.500',
        }}
      />
      <Text fontSize="md" fontWeight={500}>
        0
      </Text>
      <ChevronDownIcon
        boxSize={6}
        transition="300ms"
        _hover={{
          color: 'red.500',
        }}
      />
    </HStack>
  );
};

export default Score;
