import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/utils";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const button = cva(
  "text-medium  mt-6 w-full cursor-pointer rounded-[1.25rem] p-2  transition-all  ",
  {
    variants: {
      intent: {
        primary: ["bg-main", "hover:bg-lavander", "dark:bg-main text-white"],
        light: ["text-main", "bg-main/10", "dark:bg-white"],
        danger: ["bg-red", "dark:bg-red"],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);
interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {
  ref?: React.RefObject<HTMLButtonElement | null>;
}

const Button = ({ children, intent, ref, ...props }: ButtonProps) => {
  const { className, ...rest } = { ...props };

  return (
    <button ref={ref} {...rest} className={cn(button({ intent }), className)}>
      {children ? children : "Submit"}
    </button>
  );
};

export default Button;
