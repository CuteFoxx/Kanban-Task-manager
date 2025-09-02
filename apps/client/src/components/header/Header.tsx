import { useParams } from "react-router";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { cn } from "../../utils/utils";
import OptionsModalContent from "../OptionsModal";
import ActiveBoard from "../sidebar/ActiveBoard";
import Logo from "./Logo";
import axios from "axios";
import { setBoards } from "../../redux/boardSlice";
import { Modal, ModalContent, ModalTitle, ModalTrigger } from "../Modal";
import { useRef, useState } from "react";
import Button from "../form/Button";

const Header = () => {
  const isMobile = useIsMobile();
  const isSideBarMinimized = useAppSelector(
    (root) => root.app.isSideBarMinimized,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const boards = useAppSelector((root) => root.board.boards);
  const currentBoard = useAppSelector((root) => root.board.currentBoard);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    if (!id) {
      throw new Error("cannot delete board without id");
    }

    axios.delete(`board/${id}`).then(() => {
      dispatch(setBoards(boards.filter((board) => board.id != +id)));
    });
  };

  return (
    <>
      <header className="relative z-20 flex min-h-16 items-center gap-4 overflow-x-clip px-4 py-5 md:min-h-20.25 md:gap-0 md:!p-0 md:[&>*]:px-6 md:[&>*]:py-7">
        <Logo className="md:border-lines-light dark:md:border-lines-dark md:min-w-[16.25rem] md:border-r" />
        <div
          className={cn(
            "relative flex w-full transition-all",
            [
              !isMobile &&
                "before:bg-lines-light dark:before:bg-lines-dark h-full before:absolute before:bottom-0 before:left-0 before:h-[0.0625rem] before:w-[calc(100vw-16.25rem)] before:content-['']",
            ],
            [
              isSideBarMinimized &&
                !isMobile &&
                "delay-75 before:-left-[16.25rem] before:w-screen",
            ],
          )}
        >
          <ActiveBoard className="mr-auto block" />
          <OptionsModalContent ref={ref}>
            <button className="text-medium text-medium-grey">Edit</button>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="text-red text-medium"
            >
              Delete
            </button>
          </OptionsModalContent>
        </div>
      </header>
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
    </>
  );
};

export default Header;
