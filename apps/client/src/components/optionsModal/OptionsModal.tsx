import { useEffect, useRef, useState } from "react";
import OptionsIcon from "../../assets/icon-vertical-ellipsis.svg?react";

const OptionsModal = ({
  icon = <OptionsIcon />,
  children,
}: {
  icon?: React.ReactElement;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: PointerEvent) => {
    const target = e.target as Node;
    if (!ref.current?.contains(target)) {
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
    <div className="relative" ref={ref}>
      <button onClick={() => setIsOpen((prev) => !prev)}>{icon}</button>
      <dialog
        className="bg-background dark:bg-background-darkest-dark absolute -translate-x-full rounded-[0.5rem] p-4 transition-all"
        open={isOpen}
      >
        {children}
      </dialog>
    </div>
  );
};

export default OptionsModal;
