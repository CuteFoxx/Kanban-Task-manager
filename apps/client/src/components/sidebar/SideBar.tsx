import { useIsMobile } from "../../hooks/useIsMobile";
import { useAppSelector } from "../../redux/hooks";
import { cn } from "../../utils/utils";
import BoardsList from "./BoardsList";
import HideSideBar from "./HideSideBar";
import ThemeSwitch from "./ThemeSwitch";

const SideBar = () => {
  const isMobile = useIsMobile();
  const isSideBarShown = useAppSelector((root) => root.app.isSideBarShown);
  const isSideBarMinimized = useAppSelector(
    (root) => root.app.isSideBarMinimized,
  );
  return (
    <div
      className={cn(
        "before:bg-very-dark-grey/40 after:md:border-lines-light dark:after:md:border-lines-dark pointer-events-none absolute z-10 flex h-[calc(100dvh-var(--spacing)*16)] w-full flex-col items-center justify-center overflow-hidden opacity-0 transition-all before:pointer-events-none before:absolute before:top-0 before:-z-[1] before:h-screen before:w-full before:content-[''] md:pointer-events-auto md:relative md:z-20 md:h-auto md:w-[16.25rem] md:justify-end md:overflow-visible md:px-3 md:py-8 md:opacity-100 md:before:hidden after:md:absolute after:md:top-0 after:md:right-0 after:md:h-full after:md:border-r after:md:content-['']",
        [isSideBarShown && isMobile && "pointer-events-auto opacity-100"],
        [isSideBarMinimized && !isMobile && "!w-0 !p-0"],
      )}
    >
      <div
        className={cn(
          "bg-background dark:bg-background-dark flex w-fit flex-col items-center rounded-[0.5rem] p-4 md:h-full md:items-baseline md:justify-between md:p-0",
          [
            isSideBarMinimized &&
              !isMobile &&
              "w-0 p-0 [&>*:not(.hide-sidebar)]:opacity-0",
          ],
        )}
      >
        <BoardsList />
        <div className="hide-sidebar">
          {!isSideBarMinimized && <ThemeSwitch />}
          <HideSideBar className="md:mt-2 md:pl-2.75" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
