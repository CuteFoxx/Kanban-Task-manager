import ChevronDown from "../../assets/icon-chevron-down.svg?react";
import { useEffect, useRef, useState } from "react";

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border-medium-grey/30 outline-main flex w-full items-center justify-between rounded-[0.25rem] border-1 px-4 py-2 text-left focus-within:outline-1 focus-within:[&>*]:rotate-180"
      >
        {/* {selected != null && options ? selected.label : options[0].label} */}
        {selected != null ? selected.label : options[0]?.label}
        {(options[0]?.label && selected == null) || "- No columns -"}
        <span className="transition-all">
          <ChevronDown />
        </span>
      </button>

      {isOpen && (
        <ul
          className="dark:bg-very-dark-grey absolute top-full left-0 z-10 m-0 w-full overflow-hidden rounded bg-white p-0 shadow-sm outline-0"
          data-ignore-outside
        >
          {options.map((o) => (
            <li
              key={o.value}
              onClick={() => {
                onChange(o.value);
                setIsOpen(false);
              }}
              className={`hover:bg-main cursor-pointer px-3 py-2 font-medium ${
                o.value === value ? "bg-main/20" : ""
              }`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Select;
