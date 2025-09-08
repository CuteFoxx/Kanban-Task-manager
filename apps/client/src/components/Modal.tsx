import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
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

interface ModalProps<T = undefined> extends React.HTMLAttributes<T> {
  children?: React.ReactNode;
  controls?: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  };
  triggerElement?: React.RefObject<HTMLElement | null>;
}

export const Modal = ({
  children,
  controls,
  triggerElement,
  ...rest
}: ModalProps<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false);
  let wrapperRef = useRef<HTMLDivElement | null>(null);

  const normalizedControls = {
    isOpen: controls?.isOpen ?? isOpen,
    setIsOpen: controls?.setIsOpen ?? setIsOpen,
  };

  const handleClickOutside = (e: PointerEvent) => {
    const target = e.target as Element;

    if (target.closest("[data-ignore-outside]")) {
      return;
    }

    if (triggerElement != null && target == triggerElement.current) {
      return;
    }

    // Wasnt able figure out something better for nested modals at the moment
    // would appreciate any tips and tricks
    if (!wrapperRef.current?.contains(target) && !target.closest("dialog")) {
      normalizedControls.setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <ModalContext.Provider
      value={{
        isOpen: controls?.isOpen != null ? controls.isOpen : isOpen,
        setIsOpen: controls?.setIsOpen != null ? controls.setIsOpen : setIsOpen,
        wrapperRef,
      }}
    >
      <div ref={wrapperRef} {...rest}>
        {children}
      </div>
    </ModalContext.Provider>
  );
};

export const ModalTrigger = ({
  children,
  ...props
}: ModalProps<HTMLDivElement>) => {
  const { setIsOpen } = useModalContext();
  const { className, ...rest } = { ...props };

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
        "fixed top-1/2 right-4 z-999 w-screen before:pointer-events-none before:absolute before:-z-1 before:h-screen before:w-screen before:-translate-y-1/2 before:bg-black/50 before:content-['']",
        className,
      )}
      open={isOpen ?? false}
    >
      <div className="dark:bg-dark-grey xs:-translate-x-1/2 xs:left-1/2 fixed top-1/2 right-4 left-4 z-99 w-[calc(100vw-var(--spacing)*12)] max-w-[30rem] -translate-y-1/2 rounded-[0.375rem] bg-white p-6 pb-8 text-black md:p-8 dark:text-white">
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
