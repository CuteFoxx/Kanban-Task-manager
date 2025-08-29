import { useIsMobile } from "../hooks/useIsMobile";
import { useAppSelector } from "../redux/hooks";
import { cn } from "../utils/utils";
import ThemeSwitch from "./ThemeSwitch";

const SideBar = () => {
  const isSideBarShown = useAppSelector((root) => root.app.isSideBarShown);
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "before:bg-very-dark-grey/40 after:md:border-lines-light dark:after:md:border-lines-dark pointer-events-none absolute flex h-[calc(100dvh-var(--spacing)*16)] w-full flex-col items-center justify-center overflow-hidden opacity-0 transition-all before:pointer-events-none before:absolute before:top-0 before:-z-[1] before:h-screen before:w-full before:content-[''] md:pointer-events-auto md:relative md:z-20 md:h-[calc(100dvh-5rem)] md:w-[16.25rem] md:overflow-visible md:opacity-100 md:before:hidden after:md:absolute after:md:-top-[5rem] after:md:right-0 after:md:h-screen after:md:border-r after:md:content-['']",
        [isSideBarShown && isMobile && "pointer-events-auto opacity-100"],
      )}
    >
      <div className="bg-background dark:bg-background-dark flex w-fit flex-col items-center rounded-[0.5rem] p-4">
        SideBar
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default SideBar;
