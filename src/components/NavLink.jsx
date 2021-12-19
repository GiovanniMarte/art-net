import { Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavLink = ({ children, route, isActive, ...restProps }) => {
  return (
    <Button {...restProps} as={RouterLink} h={8} px={2} py={1} rounded="md" to={route}>
      {children}
    </Button>
  );
};

export default NavLink;
