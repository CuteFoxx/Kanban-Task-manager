import ActiveBoard from "./ActiveBoard";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="relative flex min-h-16 items-center gap-4 px-4 py-5">
      <Logo />
      <ActiveBoard />
      Header
    </header>
  );
};

export default Header;
