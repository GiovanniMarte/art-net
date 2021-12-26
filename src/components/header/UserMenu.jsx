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
import { auth } from '../../firebase/firebase';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SettingsIcon, ChatIcon, InfoIcon } from '@chakra-ui/icons';
import { handleSignOutSuccess } from '../../notifications/successHandler';

const UserMenu = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const handleSignOut = () => {
    auth.signOut();
    handleSignOutSuccess();
  };

  return (
    <Flex alignItems="center">
      <Menu>
        <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
          <Avatar size="sm" src={currentUser.profileImage || null} />
        </MenuButton>
        <MenuList>
          <MenuItem icon={<InfoIcon />} as={RouterLink} to={`/gallery/${currentUser.id}`}>
            Mi Galería
          </MenuItem>
          <MenuItem icon={<ChatIcon />} as={RouterLink} to={`/chats/${currentUser.id}`}>
            Chats
          </MenuItem>
          <MenuItem icon={<SettingsIcon />} as={RouterLink} to={`/settings/${currentUser.id}`}>
            Configuración
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleSignOut}>Cerrar sesión</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserMenu;
