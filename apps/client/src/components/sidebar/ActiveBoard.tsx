import type { HTMLAttributes } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import CurrentProjectButton from "./CurrentProjectButton";

interface ActiveBoardProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

const ActiveBoard = ({ className, ...props }: ActiveBoardProps) => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <CurrentProjectButton className={className} {...props} />
  ) : (
    <h2 className={className} {...props}>
      Current Project
    </h2>
  );
};

export default ActiveBoard;
