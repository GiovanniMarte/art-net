import { Fade, Image, useDisclosure } from '@chakra-ui/react';

const ImageFade = ({ ...restProps }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Fade in={isOpen}>
      <Image {...restProps} onLoad={onToggle} />
    </Fade>
  );
};

export default ImageFade;
