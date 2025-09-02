import { cn } from "../../utils/utils";

interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const FormError = ({ children, ...props }: FormErrorProps) => {
  const { className, ...rest } = { ...props };
  return (
    <div
      {...rest}
      className={cn("text-medium text-red absolute top-1/2 right-4", className)}
    >
      {children}
    </div>
  );
};

export default FormError;
