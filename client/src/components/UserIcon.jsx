import {
  Flex,
  Menu,
  Avatar,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { auth } from '../firebase/firebase';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserIcon = () => {
  const currentUser = useSelector(({ user }) => user.currentUser);

  return (
    <Flex alignItems={'center'}>
      <Menu>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
          <Avatar size={'sm'} src={currentUser.profileImage || null} />
        </MenuButton>
        <MenuList>
          <MenuItem as={RouterLink} to={`/galery/${currentUser.id}`}>
            Mi Galería
          </MenuItem>
          <MenuItem as={RouterLink} to={`/chats/${currentUser.id}`}>
            Chats
          </MenuItem>
          <MenuItem as={RouterLink} to={`/config/${currentUser.id}`}>
            Configuración
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => auth.signOut()}>Cerrar sesión</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserIcon;
