import { Fade, Image } from '@chakra-ui/react';
import { useState } from 'react';

const ImageFade = ({ ...restProps }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Fade in={isLoaded}>
      <Image {...restProps} onLoad={() => setIsLoaded(true)} />
    </Fade>
  );
};

export default ImageFade;
