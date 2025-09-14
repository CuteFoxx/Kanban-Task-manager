import { useIsMobile } from "../../hooks/useIsMobile";
import { useAppSelector } from "../../redux/hooks";
import DarkLogo from "../../assets/logo-dark.svg?react";
import LightLogo from "../../assets/logo-light.svg?react";
import LogoMobile from "../../assets/logo-mobile.svg?react";

const Logo = ({ className }: { className?: string }) => {
  const isMobile = useIsMobile();
  const theme = useAppSelector((state) => state.app.theme);

  if (theme == null) {
    return (
      <div className={className}>
        <DarkLogo />
      </div>
    );
  }

  return (
    <div className={className}>
      {isMobile ? (
        <LogoMobile />
      ) : theme === "light" ? (
        <DarkLogo />
      ) : (
        <LightLogo />
      )}
    </div>
  );
};

export default Logo;
