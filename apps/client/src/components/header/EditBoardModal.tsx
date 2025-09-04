import type { SetStateAction } from "react";
import { Modal, ModalContent, ModalTitle } from "../Modal";
import Button from "../form/Button";
import axios from "axios";
import { setBoards } from "../../redux/boardSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router";
import BoardForm from "../board/BoardForm";

const EditBoardModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const currentBoard = useAppSelector((root) => root.board.currentBoard);

  return (
    <Modal controls={{ isOpen, setIsOpen }}>
      <ModalContent>
        <ModalTitle>Edit Board</ModalTitle>
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <BoardForm
            action="UPDATE"
            defaultValues={{
              name: currentBoard?.name ?? "",
              columns:
                currentBoard?.columns != null
                  ? currentBoard.columns
                  : [{ name: "" }],
            }}
          />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EditBoardModal;
