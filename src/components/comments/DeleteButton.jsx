import { IconButton, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Modal from '../Modal';

const DeleteButton = ({ actionHandler }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} size="xs" aria-label="Eliminar" icon={<DeleteIcon />} />
      <Modal
        actionHandler={actionHandler}
        onClose={onClose}
        isOpen={isOpen}
        body={`Si pulsas Aceptar se eliminará el comentario para siempre`}
      />
    </>
  );
};

export default DeleteButton;
