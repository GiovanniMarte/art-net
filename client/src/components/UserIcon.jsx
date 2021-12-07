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
  const { id } = useSelector(({ user }) => user.currentUser);

  return (
    <Flex alignItems={'center'}>
      <Menu>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
          <Avatar
            size={'sm'}
            src={
              'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            }
          />
        </MenuButton>
        <MenuList>
          <MenuItem as={RouterLink} to={`/galery/${id}`}>
            Mi Galería
          </MenuItem>
          <MenuItem as={RouterLink} to={`/chats/${id}`}>
            Chats
          </MenuItem>
          <MenuItem as={RouterLink} to={`/config/${id}`}>
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
