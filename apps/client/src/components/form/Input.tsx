import { cn } from "../../utils/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...props }: InputProps) => {
  const { className, ...rest } = { ...props };
  return (
    <input
      {...rest}
      className={cn(
        "outline-main text-medium border-medium-grey/20 w-full rounded-[0.25rem] border-1 px-4 py-1.75 text-black outline-0 placeholder:text-black placeholder:opacity-25 focus-within:outline-1 dark:text-white dark:placeholder:text-white/35",
        className,
      )}
    />
  );
};

export default Input;
