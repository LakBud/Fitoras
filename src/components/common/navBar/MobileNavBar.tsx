import { useScrollDirection } from "@/hooks/ui/useScrollDirection";
import { BsCalendar2Check, BsSignpostSplit } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ExerciseFilter from "@/components/filter/exercise/ExerciseFilter";
import SplitFilter from "@/components/filter/split/SplitFilter";

const MobileNavBar = () => {
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
      {isExercisePage && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50"
          initial={{ y: 0 }}
          animate={{ y: scrollUp ? 0 : "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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
    </div>
  );
};

export default MobileNavBar;
