import { useAppSelector } from "../redux/hooks";
import { cn } from "../utils/utils";
import ThemeSwitch from "./ThemeSwitch";

const SideBar = () => {
  const isSideBarShown = useAppSelector((root) => root.app.isSideBarShown);

  return (
    <div
      className={cn(
        "absolute  w-full h-[calc(100vh-var(--spacing)*16)]  transition-all pointer-events-none opacity-0  before:content-['']  before:bg-very-dark-grey/40 before:w-full  before:absolute before:-z-[1] before:top-0 before:h-screen flex items-center overflow-hidden justify-center",
        [isSideBarShown && "opacity-100 pointer-events-auto"]
      )}
    >
      <div className="bg-background dark:bg-background-dark p-4 rounded-[0.5rem]">
        SideBar
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default SideBar;
