import useBreakpoint from "@/hooks/ui/useBreakpoint";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";
import { FiHome } from "react-icons/fi";
import { BsCalendar2Check, BsSignpostSplit } from "react-icons/bs";
import { GiWeightLiftingUp } from "react-icons/gi";

const links = [
  { to: "/", label: "Home", icon: <FiHome size={22} aria-hidden="true" /> },
  { to: "/splits", label: "Splits", icon: <BsSignpostSplit size={22} aria-hidden="true" /> },
  { to: "/calendar", label: "Calendar", icon: <BsCalendar2Check size={22} aria-hidden="true" /> },
  { to: "/exercise", label: "Exercises", icon: <GiWeightLiftingUp size={22} aria-hidden="true" /> },
];

const NavBar = () => {
  const { isDesktop } = useBreakpoint();

  return <>{isDesktop ? <DesktopNavBar links={links} /> : <MobileNavBar links={links} />}</>;
};

export default NavBar;
