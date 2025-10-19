import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ExerciseFilter from "@/components/filters/exercise/ExerciseFilter";
import SplitFilter from "@/components/filters/split/SplitFilter";

type Link = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

type MobileNavBarProps = {
  links: Link[];
};

const MobileNavBar = ({ links }: MobileNavBarProps) => {
  const location = useLocation();
  const isExercisePage = location.pathname === "/exercise";
  const isSplitPage = location.pathname === "/splits";

  return (
    <>
      {(isExercisePage || isSplitPage) && (
        <div className="fixed top-0 left-0 right-0 z-50">
          {isExercisePage && <ExerciseFilter />}
          {isSplitPage && <SplitFilter />}
        </div>
      )}

      <motion.nav
        role="navigation"
        aria-label="Bottom navigation"
        initial={false}
        className="
          fixed bottom-0 left-0 right-0
          bg-white/95 backdrop-blur-xl shadow-t-lg z-20 border-t border-gray-200
          pb-[calc(env(safe-area-inset-bottom)+0.5rem)]
        "
      >
        <ul className="flex justify-around items-center py-2">
          {links.map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                aria-label={label}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md text-xs font-semibold transition-all",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
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
  );
};

export default MobileNavBar;
