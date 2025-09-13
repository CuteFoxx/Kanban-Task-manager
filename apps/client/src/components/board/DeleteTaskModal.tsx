import { type SetStateAction } from "react";
import type { Task } from "../../types/task";
import { Modal, ModalContent, ModalTitle } from "../Modal";
import Button from "../form/Button";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTasks } from "../../redux/tasksSlice";

const DeleteTaskModal = ({
  isOpen,
  setIsOpen,
  task,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  task: Task;
}) => {
  const tasks = useAppSelector((root) => root.tasks.value);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    axios.delete(`task/${task.id}`).then((res) => {
      const data: Task | null = res.data;

      if (data && tasks) {
        dispatch(setTasks(tasks.filter((item) => item.id !== task.id)));
      }
    });
  };

  if (tasks == null) {
    return;
  }

  return (
    <Modal controls={{ isOpen, setIsOpen }}>
      <ModalContent>
        <ModalTitle className="text-red">Delete this task?</ModalTitle>
        <span className="text-medium-grey text-medium">
          {`Are you sure you want to delete the ‘${task?.title}’ task? This
            action will remove all columns and tasks and cannot be reversed.`}
        </span>
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <Button
            className="!mt-0"
            onClick={() => {
              handleDelete();
              setIsOpen(false);
            }}
            intent={"danger"}
          >
            Delete
          </Button>
          <Button
            className="!mt-0"
            onClick={() => setIsOpen(false)}
            intent={"light"}
          >
            Cancel
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTaskModal;
