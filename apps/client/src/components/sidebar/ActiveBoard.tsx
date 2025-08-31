import type { HTMLAttributes } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import CurrentProjectButton from "./CurrentProjectButton";
import { useAppSelector } from "../../redux/hooks";

interface ActiveBoardProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

const ActiveBoard = ({ className, ...props }: ActiveBoardProps) => {
  const isMobile = useIsMobile();
  const currentBoard = useAppSelector((root) => root.board.currentBoard);
  return isMobile ? (
    <CurrentProjectButton className={className} {...props} />
  ) : (
    <h2 className={className} {...props}>
      {currentBoard != null ? currentBoard.name : "Board not selected"}
    </h2>
  );
};

export default ActiveBoard;
