import { setIsSideBarShown } from "../../redux/appStateSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ArrowDown from "../../assets/icon-chevron-down.svg?react";
import type { HTMLAttributes } from "react";
import { cn } from "../../utils/utils";

interface CurrentProjectButtonProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

function CurrentProjectButton({
  className,
  ...props
}: CurrentProjectButtonProps) {
  const dispatch = useAppDispatch();
  const isSideBarShown = useAppSelector((root) => root.app.isSideBarShown);
  const currentProject = useAppSelector((root) => root.board.currentBoard);
  const handleClick = () => {
    dispatch(setIsSideBarShown(!isSideBarShown));
  };

  return (
    <button
      {...props}
      className={cn("!flex cursor-pointer items-center gap-2", className)}
      onClick={handleClick}
    >
      <h2 className="max-w-40 truncate whitespace-nowrap">
        {currentProject?.name ?? "Board not selected"}
      </h2>
      <ArrowDown />
    </button>
  );
}

export default CurrentProjectButton;
