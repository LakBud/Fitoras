import useBreakpoint from "@/hooks/ui/useBreakpoint";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  const { isDesktop } = useBreakpoint();

  return <>{isDesktop ? <DesktopNavBar /> : <MobileNavBar />}</>;
};

export default NavBar;
