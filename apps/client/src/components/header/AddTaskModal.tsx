import type { SetStateAction } from "react";
import { Modal, ModalContent, ModalTitle } from "../Modal";
import TaskForm from "../board/TaskForm";

const AddTaskModal = ({
  isOpen,
  setIsOpen,
  triggerElement,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  triggerElement?: React.RefObject<HTMLElement | null>;
}) => {
  return (
    <Modal triggerElement={triggerElement} controls={{ isOpen, setIsOpen }}>
      <ModalContent>
        <ModalTitle>Add New Task</ModalTitle>
        <TaskForm />
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
