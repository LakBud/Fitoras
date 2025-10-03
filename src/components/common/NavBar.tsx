import { FiHome } from "react-icons/fi";
import { GiPowerLightning, GiWeightLiftingUp } from "react-icons/gi";
import { BsCalendar2Check, BsSignpostSplit } from "react-icons/bs";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ExerciseFilter from "../exercise/ExerciseFilter";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import { useScrollDirection } from "../../hooks/ui/useScrollDirection";
import SplitFilter from "../split/SplitFilter";

const NavBar = () => {
  const location = useLocation();
  const isExercisePage = location.pathname === "/exercise";
  const isSplitPage = location.pathname === "/splits";
  const { isDesktop, isMobile } = useBreakpoint();
  const scrollUp = useScrollDirection();

  const links = [
    { to: "/", label: "Home", icon: <FiHome size={22} aria-hidden="true" /> },
    { to: "/splits", label: "Splits", icon: <BsSignpostSplit size={22} aria-hidden="true" /> },
    { to: "/calendar", label: "Calendar", icon: <BsCalendar2Check size={22} aria-hidden="true" /> },
    { to: "/exercise", label: "Exercises", icon: <GiWeightLiftingUp size={22} aria-hidden="true" /> },
  ];

  return (
    <>
      {/* 🖥 Desktop Navigation */}
      {isDesktop && (
        <motion.nav
          role="navigation"
          aria-label="Main navigation"
          initial={{ y: 0 }}
          animate={{ y: scrollUp ? 0 : -65 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200"
        >
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-md"
            >
              <GiPowerLightning className="text-red-600 text-3xl drop-shadow-md" aria-hidden="true" />
              <span className="text-2xl font-extrabold text-red-700 tracking-wide">Fitoras</span>
            </Link>

            <ul className="flex items-center gap-6">
              {links.map(({ to, icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    aria-label={label}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
                        isActive ? "bg-red-600 text-white shadow-md" : "text-gray-800 hover:text-red-600 hover:bg-red-50",
                      ].join(" ")
                    }
                  >
                    {icon}
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {isExercisePage && <ExerciseFilter />}
          {isSplitPage && <SplitFilter />}
        </motion.nav>
      )}

      {/* 📱 Mobile Navigation */}
      {isMobile && (
        <>
          {isExercisePage && (
            <motion.div
              className="sticky top-0 z-50"
              initial={{ y: 0 }}
              animate={{ y: scrollUp ? 0 : -60 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ExerciseFilter />
            </motion.div>
          )}
          {isSplitPage && (
            <motion.div className="sticky top-0 z-50">
              <SplitFilter />
            </motion.div>
          )}

          <motion.nav
            role="navigation"
            aria-label="Bottom navigation"
            initial={false}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-t-lg z-50 border-t border-gray-200"
          >
            <ul className="flex justify-around items-center py-2">
              {links.map(({ to, icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    aria-label={label}
                    className={({ isActive }) =>
                      [
                        "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                        isActive ? "text-red-600" : "text-gray-700 hover:text-red-600",
                      ].join(" ")
                    }
                  >
                    {icon}
                    <span className="text-[10px]">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </>
  );
};

export default NavBar;
