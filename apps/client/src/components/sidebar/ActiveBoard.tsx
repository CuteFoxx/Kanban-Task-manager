import { useIsMobile } from "../../hooks/useIsMobile";
import { setIsSideBarShown } from "../../redux/appStateSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ArrowDown from "../../assets/icon-chevron-down.svg?react";
const ActiveBoard = () => {
  const isMobile = useIsMobile();
  return isMobile ? <CurrentProjectButton /> : <h2>Current Project</h2>;
};

export default ActiveBoard;

function CurrentProjectButton() {
  const dispatch = useAppDispatch();
  const isSideBarShown = useAppSelector((root) => root.app.isSideBarShown);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsSideBarShown(!isSideBarShown));
  };

  return (
    <button
      className="flex cursor-pointer items-center gap-2"
      onClick={handleClick}
    >
      Current Project
      <ArrowDown />
    </button>
  );
}
