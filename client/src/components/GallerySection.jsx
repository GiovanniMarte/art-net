import {
  Stack,
  Heading,
  Divider,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Artwork from './Artwork';

const GallerySection = ({ artworks, name, hasMenu, gridColumns, ...restProps }) => {
  return (
    <Stack {...restProps}>
      <Stack spacing={3} align="center" direction="row">
        <Heading as="h2" size="xl">
          {name}
        </Heading>
        {hasMenu ? (
          <Menu>
            <MenuButton as={ChakraButton} rightIcon={<ChevronDownIcon />}>
              Todas
            </MenuButton>
            <MenuList>
              <MenuItem>Mi Galería</MenuItem>
              <MenuItem>Chats</MenuItem>
              <MenuItem>Configuración</MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </Stack>
      <Divider />
      <SimpleGrid justifyItems="center" columns={gridColumns} spacing={4}>
        {artworks.map(artwork => (
          <Artwork key={artwork.id} artwork={artwork} hasScore hasLink />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default GallerySection;
