import {
  Modal as ChakraModal,
  IconButton,
  Button,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const DeleteButton = ({ title, body, deleteHandler }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onClose();
    deleteHandler();
  };

  return (
    <>
      <IconButton onClick={onOpen} size="xs" aria-label="Search database" icon={<DeleteIcon />} />
      <ChakraModal isCentered blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{body}</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleClick} colorScheme="red">
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default DeleteButton;
