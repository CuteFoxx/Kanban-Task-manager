import { cn } from "../../utils/utils";

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const FormItem = ({ children, ...props }: FormItemProps) => {
  const { className, ...rest } = { ...props };
  return (
    <div {...rest} className={cn("relative flex flex-col", className)}>
      {children}
    </div>
  );
};

export default FormItem;
