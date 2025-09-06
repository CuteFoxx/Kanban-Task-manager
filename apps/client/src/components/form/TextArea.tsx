import { cn } from "../../utils/utils";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = ({ ...props }: TextAreaProps) => {
  const { className, ...rest } = { ...props };

  return (
    <textarea
      {...rest}
      className={cn(
        "outline-main text-medium border-medium-grey/20 min-h-28 w-full rounded-[0.25rem] border-1 px-4 py-1.75 text-black outline-0 placeholder:text-black placeholder:opacity-25 focus-within:outline-1 dark:text-white dark:placeholder:text-white/30",
        className,
      )}
    />
  );
};

export default TextArea;
