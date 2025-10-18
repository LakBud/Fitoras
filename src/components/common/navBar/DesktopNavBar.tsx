import ExerciseFilter from "@/components/filter/exercise/ExerciseFilter";
import SplitFilter from "@/components/filter/split/SplitFilter";
import { GiPowerLightning, GiWeightLiftingUp } from "react-icons/gi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollDirection } from "@/hooks/ui/useScrollDirection";
import { FiHome } from "react-icons/fi";
import { BsCalendar2Check, BsSignpostSplit } from "react-icons/bs";

const DesktopNavBar = () => {
  const location = useLocation();
  const isExercisePage = location.pathname === "/exercise";
  const isSplitPage = location.pathname === "/splits";
  const scrollUp = useScrollDirection();

  const links = [
    { to: "/", label: "Home", icon: <FiHome size={22} aria-hidden="true" /> },
    { to: "/splits", label: "Splits", icon: <BsSignpostSplit size={22} aria-hidden="true" /> },
    { to: "/calendar", label: "Calendar", icon: <BsCalendar2Check size={22} aria-hidden="true" /> },
    { to: "/exercise", label: "Exercises", icon: <GiWeightLiftingUp size={22} aria-hidden="true" /> },
  ];

  return (
    <div>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: 0 }}
        animate={{
          y: scrollUp
            ? 0
            : isExercisePage
            ? "-54%" // amount to scroll up on exercise page
            : isSplitPage
            ? "-54%" // amount to scroll up on split page
            : "", // default amount for other pages
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200"
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
    </div>
  );
};

export default DesktopNavBar;
