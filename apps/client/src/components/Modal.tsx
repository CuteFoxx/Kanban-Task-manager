import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type SetStateAction,
} from "react";
import { cn } from "../utils/utils";

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

const ModalContext = createContext<ModalContextType | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be within Modal");
  }

  return context;
};

interface ModalProps<T = undefined> extends React.ButtonHTMLAttributes<T> {
  children?: React.ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, wrapperRef }}>
      <div ref={wrapperRef}>{children}</div>
    </ModalContext.Provider>
  );
};

export const ModalTrigger = ({
  children,
  ...props
}: ModalProps<HTMLDivElement>) => {
  const { setIsOpen, wrapperRef } = useModalContext();
  const { className, ...rest } = { ...props };
  const handleClickOutside = (e: PointerEvent) => {
    const target = e.target as Node;
    if (!wrapperRef.current?.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      {...rest}
      className={cn("cursor-pointer", className)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {children}
    </div>
  );
};

export const ModalContent = ({
  children,
  ...props
}: ModalProps<HTMLDialogElement>) => {
  const { isOpen } = useModalContext();
  const { className, ...rest } = { ...props };

  return (
    <dialog
      {...rest}
      className={cn(
        "fixed inset-1/2 z-999 -translate-x-1/2 before:pointer-events-none before:absolute before:-z-1 before:h-screen before:w-screen before:-translate-x-1/2 before:-translate-y-1/2 before:bg-black/50 before:content-['']",
        className,
      )}
      open={isOpen ?? false}
    >
      <div className="dark:bg-dark-grey mdp-8 absolute z-99 rounded-[0.375rem] bg-white p-6 pb-8 text-black dark:text-white">
        {children}
      </div>
    </dialog>
  );
};

export const ModalTitle = ({
  children,
  ...props
}: ModalProps<HTMLHeadingElement>) => {
  const { className, ...rest } = { ...props };

  return (
    <h3 {...rest} className={cn("text-heading-l mb-6", className)}>
      {children}
    </h3>
  );
};
