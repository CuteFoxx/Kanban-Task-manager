import { NavLink } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import LinkIcon from "../../assets/icon-board.svg?react";
import { Modal, ModalContent, ModalTitle, ModalTrigger } from "../Modal";
import CreateBoardForm from "../board/BoardForm";

const BoardsList = () => {
  const boards = useAppSelector((root) => root.board.boards);
  return (
    <section className="flex flex-col">
      <h2 className="text-medium-grey text-medium mb-5">
        All boards ({boards.length})
      </h2>
      <>
        {boards?.map((board) => {
          return (
            <NavLink
              className="[&.active]:bg-main text-heading-m text-medium-grey hover:bg-lavander/20 hover:text-main hover:[&_path]:fill-main -ml-6.5 flex min-w-[15rem] gap-3 rounded-r-full py-3.5 pl-6 transition-all duration-200 dark:hover:bg-white [&.active]:text-white [&.active_path]:fill-white"
              key={board.id}
              to={`board/${board.id}`}
            >
              <LinkIcon />
              {board.name}
            </NavLink>
          );
        })}
      </>
      <Modal>
        <ModalTrigger className="!text-main text-heading-m [&_path]:fill-main hover:bg-lavander/20 -ml-6.5 flex items-center gap-3 rounded-r-full py-4 pl-6 dark:hover:bg-white">
          <LinkIcon />
          <span data-ignore-outside>+ Create New Board</span>
        </ModalTrigger>
        <ModalContent>
          <ModalTitle>Add New Board</ModalTitle>
          <CreateBoardForm />
        </ModalContent>
      </Modal>
    </section>
  );
};

export default BoardsList;
