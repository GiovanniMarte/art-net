import { IconButton, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Modal from '../Modal';

const DeleteButton = ({ actionHandler, message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} size="xs" aria-label="Eliminar" icon={<DeleteIcon />} />
      <Modal actionHandler={actionHandler} onClose={onClose} isOpen={isOpen} body={message} />
    </>
  );
};

export default DeleteButton;
