import ActiveBoard from "./ActiveBoard";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="relative flex min-h-16 items-center gap-4 px-4 py-5 md:min-h-[5rem]">
      <Logo />
      <ActiveBoard />
      Header
    </header>
  );
};

export default Header;
