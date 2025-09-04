import { useIsMobile } from "../../hooks/useIsMobile";
import { cn } from "../../utils/utils";
import OptionsModalContent from "../OptionsModal";
import ActiveBoard from "../sidebar/ActiveBoard";
import Logo from "./Logo";
import { useRef, useState } from "react";
import DeleteBoardModal from "./DeleteBoardModal";
import { useAppSelector } from "../../redux/hooks";
import EditBoardModal from "./EditBoardModal";

const Header = () => {
  const isMobile = useIsMobile();
  const isSideBarMinimized = useAppSelector(
    (root) => root.app.isSideBarMinimized,
  );
  const [isDeleteBoardOpen, setIsDeleteBoardOpen] = useState<boolean>(false);
  const [isEditBoardOpen, setIsEditBoardOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

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
            <button
              onClick={() => setIsEditBoardOpen(!isEditBoardOpen)}
              className="text-medium text-medium-grey"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setIsDeleteBoardOpen(!isDeleteBoardOpen);
              }}
              className="text-red text-medium"
            >
              Delete
            </button>
          </OptionsModalContent>
        </div>
      </header>
      <DeleteBoardModal
        setIsOpen={setIsDeleteBoardOpen}
        isOpen={isDeleteBoardOpen}
      />
      <EditBoardModal isOpen={isEditBoardOpen} setIsOpen={setIsEditBoardOpen} />
    </>
  );
};

export default Header;
