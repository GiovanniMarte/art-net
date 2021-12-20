import { Input, Stack, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

const ImagePicker = ({
  setImage,
  buttonText,
  setImageState,
  hasFileLabel,
  isRequired,
  ...restProps
}) => {
  const [selectedImage, setSelectedImage] = useState('No se ha seleccionado ninguna imagen');

  const handleChange = event => {
    if (!event.target.files[0]) return;
    setImage(event.target.files[0]);
    setSelectedImage(event.target.files[0].name);
    if (setImageState) setImageState(event.target.files[0]);
  };

  return (
    <Stack>
      <Button {...restProps} leftIcon={<FiUpload />} cursor="pointer" as="label">
        <Input type="file" accept="image/*" onChange={handleChange} />
        {buttonText}
      </Button>

      {hasFileLabel ? <Text>{selectedImage}</Text> : null}
    </Stack>
  );
};

export default ImagePicker;
