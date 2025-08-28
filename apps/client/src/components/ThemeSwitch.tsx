import { setTheme } from "../redux/appStateSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const ThemeSwitch = () => {
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
    <input
      type="checkbox"
      defaultChecked={theme == "dark"}
      onChange={handleChange}
    />
  );
};

export default ThemeSwitch;
