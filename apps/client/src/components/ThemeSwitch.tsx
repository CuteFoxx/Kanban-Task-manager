import { setTheme } from "../redux/appStateSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { cn } from "../utils/utils";
import Sun from "../assets/icon-light-theme.svg?react";
import Moon from "../assets/icon-dark-theme.svg?react";

const ThemeSwitch = ({ className }: { className?: string }) => {
  const theme = useAppSelector((root) => root.app.theme);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      dispatch(setTheme("dark"));
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      dispatch(setTheme("light"));
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

  return (
    <div className="bg-background-darkest dark:bg-background-darkest-dark flex min-w-[14.6875rem] items-center justify-center gap-6 rounded-[0.375rem] py-[0.875rem]">
      <Sun />
      <label
        className="bg-main relative flex min-h-5 w-10 gap-2 rounded-[0.75rem] text-[0px] [--item-size:0.875rem] before:absolute before:top-1/2 before:left-1 before:h-[var(--item-size)] before:w-[var(--item-size)] before:-translate-y-1/2 before:rounded-full before:bg-white before:transition-all before:content-[''] has-[input:checked]:before:left-[calc(100%-var(--item-size)-var(--spacing))]"
        htmlFor="theme-switch"
      >
        Theme switch
        <input
          id="theme-switch"
          className={cn(["appearance-none", className])}
          type="checkbox"
          defaultChecked={theme == "dark"}
          onChange={handleChange}
        />
      </label>
      <Moon />
    </div>
  );
};

export default ThemeSwitch;
