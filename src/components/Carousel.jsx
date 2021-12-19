import { Flex, Text, Stack, Image, Box, HStack, Heading } from '@chakra-ui/react';
import { useState } from 'react';

const Carousel = ({ artworks }) => {
  const arrowStyles = {
    cursor: 'pointer',
    pos: 'absolute',
    top: '50%',
    w: 'auto',
    mt: '-22px',
    p: '16px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: '0.3s ease',
    borderRadius: '0 3px 3px 0',
    userSelect: 'none',
    _hover: {
      opacity: 0.8,
      bg: 'black',
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = artworks.length;

  const prevSlide = () => {
    setCurrentSlide(s => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(s => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = slide => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <Flex
      display={{ base: 'none', sm: 'none', md: 'flex' }}
      borderRadius="lg"
      boxShadow="lg"
      w={700}
      pos="relative"
      overflow="hidden"
    >
      <Flex h="400px" w="full" {...carouselStyle}>
        {artworks.map((artwork, index) => (
          <Box key={`slide-${index}`} boxSize="full" shadow="md" flex="none">
            <Text color="white" fontSize="xs" p="8px 12px" fontWeight={600} pos="absolute" top="0">
              {index + 1} / {slidesCount}
            </Text>
            <Image src={artwork.imageUrl} boxSize="full" backgroundSize="cover" />
            <Stack
              p="8px 12px"
              pos="absolute"
              bottom="24px"
              textAlign="center"
              w="full"
              mb={3}
              color="white"
            >
              <Heading opacity={0.9} fontSize="2xl" fontFamily="body">
                {artwork.title}
              </Heading>
            </Stack>
          </Box>
        ))}
      </Flex>
      <Text {...arrowStyles} left="0" onClick={prevSlide}>
        &#10094;
      </Text>
      <Text {...arrowStyles} right="0" onClick={nextSlide}>
        &#10095;
      </Text>
      <HStack justify="center" pos="absolute" bottom="8px" w="full">
        {Array.from({ length: slidesCount }).map((_, slide) => (
          <Box
            key={`dots-${slide}`}
            cursor="pointer"
            boxSize={['7px', '15px']}
            m="0 2px"
            bg={currentSlide === slide ? 'blackAlpha.800' : 'blackAlpha.500'}
            rounded="50%"
            display="inline-block"
            transition="background-color 0.6s ease"
            _hover={{ bg: 'blackAlpha.800' }}
            onClick={() => setSlide(slide)}
          ></Box>
        ))}
      </HStack>
    </Flex>
  );
};

export default Carousel;
