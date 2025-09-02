import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import OptionsIcon from "../assets/icon-vertical-ellipsis.svg?react";

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
        <button onClick={() => setIsOpen((prev) => !prev)}>{icon}</button>
        <dialog
          className="bg-background dark:bg-background-darkest-dark absolute -translate-x-full rounded-[0.5rem] p-4 transition-all dark:text-white"
          open={isOpen}
        >
          {children}
        </dialog>
      </div>
    );
  },
);

export default OptionsModal;
