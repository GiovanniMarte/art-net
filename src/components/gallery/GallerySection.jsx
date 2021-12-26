import {
  Stack,
  Flex,
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
import Artwork from '../artwork/Artwork';
import { useSelector } from 'react-redux';

const GallerySection = ({ artworks, name = 'Section', hasMenu, gridColumns, ...restProps }) => {
  const scores = useSelector(state => state.scores.list);

  return (
    <Stack spacing={3} {...restProps}>
      <Flex align="center">
        <Heading as="h2" size="xl" mr={3}>
          {name}
        </Heading>
        {hasMenu ? (
          <Menu>
            <MenuButton size="sm" as={ChakraButton} rightIcon={<ChevronDownIcon />}>
              Mostrar
            </MenuButton>
            <MenuList>
              <MenuItem>Todas</MenuItem>
              <MenuItem>Privadas</MenuItem>
              <MenuItem>En venta</MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </Flex>
      <Divider />
      <SimpleGrid justifyItems="center" columns={gridColumns} spacing={4}>
        {artworks.map(artwork => (
          <Artwork key={artwork.id} artwork={artwork} scores={scores} hasScore hasLink />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default GallerySection;
