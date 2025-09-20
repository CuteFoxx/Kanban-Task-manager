import HideIcon from "../../assets/icon-hide-sidebar.svg?react";
import ShowIcon from "../../assets/icon-show-sidebar.svg?react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { setIsSideBarMinimized } from "../../redux/appStateSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { cn } from "../../utils/utils";

interface HideSideBarProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const HideSideBar = ({ className, ...props }: HideSideBarProps) => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const isSideBarMinimized = useAppSelector(
    (root) => root.app.isSideBarMinimized,
  );
  const handleClick = () => {
    dispatch(setIsSideBarMinimized(isSideBarMinimized ? false : true));
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={cn(
        className,
        "!text-medium-grey text-heading-m hidden cursor-pointer md:flex md:items-center md:gap-2.5",
        [
          isSideBarMinimized &&
            !isMobile &&
            "bg-main hover:!bg-lavander fixed bottom-8 left-0 !m-0 flex min-h-12 !w-fit min-w-14 justify-center rounded-r-full text-[0px] !opacity-100 transition-all",
        ],
        [
          "w-full md:-ml-6 md:max-w-[17.375rem] md:rounded-r-full md:py-3.5 md:!pl-6 md:hover:bg-white",
        ],
      )}
    >
      {isSideBarMinimized ? <ShowIcon /> : <HideIcon />}
      Hide Sidebar
    </button>
  );
};

export default HideSideBar;
