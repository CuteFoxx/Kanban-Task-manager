import type { SetStateAction } from "react";
import { Modal, ModalContent, ModalTitle } from "../Modal";
import Button from "../form/Button";
import axios from "axios";
import { setBoards } from "../../redux/boardSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router";

const DeleteBoardModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const boards = useAppSelector((root) => root.board.boards);
  const currentBoard = useAppSelector((root) => root.board.currentBoard);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const handleDelete = () => {
    if (!id) {
      throw new Error("cannot delete board without id");
    }

    axios.delete(`board/${id}`).then(() => {
      dispatch(setBoards(boards.filter((board) => board.id != +id)));
    });
  };
  return (
    <Modal controls={{ isOpen, setIsOpen }}>
      <ModalContent>
        <ModalTitle className="text-red">Delete this board?</ModalTitle>
        <span className="text-medium-grey text-medium">
          {`Are you sure you want to delete the ‘${currentBoard?.name}’ board? This
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

export default DeleteBoardModal;
