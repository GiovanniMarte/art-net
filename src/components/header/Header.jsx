import {
  Heading,
  Button,
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ThemeToggle';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FiUpload } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import AuthButtons from './AuthButtons';
import UserMenu from './UserMenu';
import NavLink from './NavLink';
import { Link as RouterLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector(({ user }) => user.currentUser);

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          mr={3}
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Heading as="h1" size="lg" letterSpacing="tighter">
            Artic
          </Heading>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink leftIcon={<AiFillHome />} route="/">
              Principal
            </NavLink>
            <NavLink leftIcon={<FaUsers />} route="/communities">
              Comunidades
            </NavLink>
          </HStack>
        </HStack>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          align="center"
          direction="row"
          spacing={5}
        >
          {currentUser ? (
            <Button
              leftIcon={<FiUpload />}
              as={RouterLink}
              to="/upload"
              size="sm"
              fontSize="sm"
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              _hover={{
                bg: 'pink.300',
              }}
            >
              Subir
            </Button>
          ) : null}
          {currentUser ? <UserMenu /> : <AuthButtons />}
          <ColorModeSwitcher />
        </Stack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <NavLink leftIcon={<AiFillHome />} route="/">
              Principal
            </NavLink>
            <NavLink leftIcon={<FaUsers />} route="/communities">
              Comunidades
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
