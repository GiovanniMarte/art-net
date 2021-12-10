import { Box } from '@chakra-ui/layout';
import Artwork from '../components/Artwork';
import { useSelector } from 'react-redux';

const Homepage = () => {
  const artwork = useSelector(state => state.artwork);

  return (
    <Box>
      <Artwork artwork={artwork} currentUser="Joseph" />
    </Box>
  );
};

export default Homepage;
