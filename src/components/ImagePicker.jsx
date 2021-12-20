import { Input, Stack, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setImageUrl } from '../redux/artwork/artworkActions';

const ImagePicker = ({ setImage, buttonText, isRequired }) => {
  const [selectedImage, setSelectedImage] = useState('No se ha seleccionado ninguna imagen');
  const dispatch = useDispatch();

  const handleChange = event => {
    if (!event.target.files[0]) return;
    setImage(event.target.files[0]);
    setSelectedImage(event.target.files[0].name);
    dispatch(setImageUrl(URL.createObjectURL(event.target.files[0])));
  };

  return (
    <Stack>
      <Button leftIcon={<FiUpload />} cursor="pointer" as="label">
        <Input type="file" accept="image/*" onChange={handleChange} isRequired={isRequired} />
        {buttonText}
      </Button>
      <Text>{selectedImage}</Text>
    </Stack>
  );
};

export default ImagePicker;
