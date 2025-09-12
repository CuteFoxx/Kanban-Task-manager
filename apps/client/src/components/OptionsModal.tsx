import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import OptionsIcon from "../assets/icon-vertical-ellipsis.svg?react";
import { cn } from "../utils/utils";

interface OptionsModalProps {
  icon?: React.ReactElement;
  children: React.ReactNode;
}

const OptionsModal = forwardRef<HTMLDivElement, OptionsModalProps>(
  ({ icon = <OptionsIcon />, children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    if (ref != null) {
      useImperativeHandle(ref, () => wrapperRef.current!);
    }

    const handleClickOutside = (e: PointerEvent) => {
      const target = e.target as Node;

      if (!wrapperRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={wrapperRef}>
        <button className="px-2" onClick={() => setIsOpen((prev) => !prev)}>
          {icon}
        </button>
        <dialog
          className={cn(
            "bg-background dark:bg-background-darkest-dark text-medium absolute w-max max-w-3xs -translate-x-full rounded-[0.5rem] p-4 shadow-sm transition-all dark:text-white",
            isOpen && "flex flex-col items-start gap-2",
          )}
          open={isOpen}
        >
          {children}
        </dialog>
      </div>
    );
  },
);

export default OptionsModal;
