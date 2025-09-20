import { useIsMobile } from "../../hooks/useIsMobile";
import { cn } from "../../utils/utils";
import OptionsModalContent from "../OptionsModal";
import ActiveBoard from "../sidebar/ActiveBoard";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import DeleteBoardModal from "./DeleteBoardModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import EditBoardModal from "./EditBoardModal";
import Button from "../form/Button";
import AddIcon from "../../assets/icon-add-task-mobile.svg?react";
import AddTaskModal from "./AddTaskModal";
import { setIsSideBarShown } from "../../redux/appStateSlice";

const Header = () => {
  const isMobile = useIsMobile();
  const isSideBarMinimized = useAppSelector(
    (root) => root.app.isSideBarMinimized,
  );
  const [isDeleteBoardOpen, setIsDeleteBoardOpen] = useState<boolean>(false);
  const [isEditBoardOpen, setIsEditBoardOpen] = useState<boolean>(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const addTaskRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLHeadElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!headerRef.current?.contains(target as Element)) {
        if (target.closest("[data-ignore-outside]")) {
          return;
        }

        dispatch(setIsSideBarShown(false));
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="dark:bg-dark-grey fixed top-0 left-0 z-20 flex min-h-16 min-w-screen items-center gap-4 overflow-x-clip bg-white px-4 py-5 md:min-h-20.25 md:gap-0 md:!p-0 md:[&>*]:px-6 md:[&>*]:py-7"
      >
        <Logo className="md:border-lines-light dark:md:border-lines-dark md:min-h-25 md:min-w-[16.25rem] md:border-r" />
        <div
          className={cn(
            "relative flex w-full items-center gap-6 transition-all",
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
          <Button
            ref={addTaskRef}
            onClick={() => setIsAddTaskOpen(true)}
            className="mt-0 w-fit px-4.5 py-2.5"
          >
            {isMobile ? <AddIcon /> : "+ Add New Task"}
          </Button>
          <OptionsModalContent ref={ref}>
            <button
              onClick={() => setIsEditBoardOpen(!isEditBoardOpen)}
              className="text-medium text-medium-grey cursor-pointer"
            >
              Edit Board
            </button>
            <button
              onClick={() => {
                setIsDeleteBoardOpen(!isDeleteBoardOpen);
              }}
              className="text-red text-medium cursor-pointer"
            >
              Delete Board
            </button>
          </OptionsModalContent>
        </div>
      </header>
      {isDeleteBoardOpen && (
        <DeleteBoardModal
          setIsOpen={setIsDeleteBoardOpen}
          isOpen={isDeleteBoardOpen}
        />
      )}
      {isEditBoardOpen && (
        <EditBoardModal
          isOpen={isEditBoardOpen}
          setIsOpen={setIsEditBoardOpen}
        />
      )}
      {isAddTaskOpen && (
        <AddTaskModal
          triggerElement={addTaskRef}
          isOpen={isAddTaskOpen}
          setIsOpen={setIsAddTaskOpen}
        />
      )}
    </>
  );
};

export default Header;
