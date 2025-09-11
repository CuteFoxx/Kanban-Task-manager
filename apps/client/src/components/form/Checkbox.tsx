import { cn } from "../../utils/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = ({ ...props }: CheckboxProps) => {
  const { className, ...rest } = { ...props };
  return (
    <input
      {...rest}
      type="checkbox"
      className={cn("accent-main h-4 w-4", className)}
    />
  );
};

export default Checkbox;
