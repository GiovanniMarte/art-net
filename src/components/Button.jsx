import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ children, ...restProps }) => {
  return (
    <ChakraButton
      {...restProps}
      bg={'blue.400'}
      color={'white'}
      _hover={{
        bg: 'blue.500',
      }}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
