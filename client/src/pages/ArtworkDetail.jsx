import { Box, Stack, Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ArtworkDetail = () => {
  const { artworkId } = useParams();
  const artwork = useSelector(state =>
    state.artworks.list.find(artwork => artwork.id === artworkId)
  );

  return (
    <Box>
      <Stack
        align="center"
        direction={{ base: 'column', md: 'column', lg: 'row', xl: 'row', '2xl': 'row' }}
      >
        <Box flex={2} maxW={1100}>
          <Image shadow="xl" src={artwork.imageUrl} alt="Dan Abramov" />
        </Box>
        <Box flex={1}></Box>
      </Stack>
    </Box>
  );
};

export default ArtworkDetail;
