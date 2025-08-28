import { useIsMobile } from "../hooks/useIsMobile";
import { setIsSideBarShown } from "../redux/appStateSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

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
      className="flex gap-2 items-center cursor-pointer"
      onClick={handleClick}
    >
      Current Project
      <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
        <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
      </svg>
    </button>
  );
}
