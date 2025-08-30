import { useIsMobile } from "../../hooks/useIsMobile";
import { useAppSelector } from "../../redux/hooks";
import { cn } from "../../utils/utils";
import ActiveBoard from "../sidebar/ActiveBoard";
import Logo from "./Logo";

const Header = () => {
  const isMobile = useIsMobile();
  const isSideBarMinimized = useAppSelector(
    (root) => root.app.isSideBarMinimized,
  );
  return (
    <header className="relative flex min-h-16 items-center gap-4 overflow-x-clip px-4 py-5 md:min-h-20.25 md:gap-0 md:!p-0 md:[&>*]:px-6 md:[&>*]:py-7">
      <Logo className="md:border-lines-light dark:md:border-lines-dark md:min-w-[16.25rem] md:border-r" />
      <div
        className={cn(
          "relative flex transition-all",
          [
            !isMobile &&
              "before:bg-lines-light dark:before:bg-lines-dark h-full w-full before:absolute before:bottom-0 before:left-0 before:h-[0.0625rem] before:w-[calc(100vw-16.25rem)] before:content-['']",
          ],
          [
            isSideBarMinimized &&
              !isMobile &&
              "delay-75 before:-left-[16.25rem] before:w-screen",
          ],
        )}
      >
        <ActiveBoard />
        Header
      </div>
    </header>
  );
};

export default Header;
