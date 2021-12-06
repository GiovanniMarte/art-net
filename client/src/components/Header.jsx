import {
  Heading,
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeSwitcher } from './ThemeToggle';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import AuthButtons from './AuthButtons';
import UserIcon from './UserIcon';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector(({ user }) => user.currentUser);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            mr={3}
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Heading as="h1" size="lg" letterSpacing={'tighter'}>
              Artic
            </Heading>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={5}>
            {currentUser ? <UserIcon /> : <AuthButtons />}
            <ColorModeSwitcher />
          </Stack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

const Links = ['Principal', 'Comunidades', 'Tienda'];

const NavLink = ({ children }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to="/"
  >
    {children}
  </Link>
);

export default Header;
