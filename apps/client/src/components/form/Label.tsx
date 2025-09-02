import { cn } from "../../utils/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

const Label = ({ children, ...props }: LabelProps) => {
  const { className, ...rest } = { ...props };
  return (
    <label
      {...rest}
      className={cn(
        "text-heading-s md:text-heading-l text-medium-grey mb-2 inline-block dark:text-white",
        className,
      )}
    >
      {children}
    </label>
  );
};

export default Label;
