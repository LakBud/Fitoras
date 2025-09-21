import { FiHome } from "react-icons/fi";
import { GiPowerLightning, GiWeightLiftingUp } from "react-icons/gi";
import { BsCalendar2Check, BsSignpostSplit } from "react-icons/bs";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ExerciseFilter from "../exercise/ExerciseFilter";

const NavBar = () => {
  const location = useLocation();
  const isExercisePage = location.pathname === "/exercise";

  const links = [
    { to: "/", label: "Home", icon: <FiHome size={22} /> },
    { to: "/splits", label: "Splits", icon: <BsSignpostSplit size={22} /> },
    { to: "/calendar", label: "Calendar", icon: <BsCalendar2Check size={22} /> },
    { to: "/exercise", label: "Exercises", icon: <GiWeightLiftingUp size={22} /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={false}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:block bg-white shadow-lg sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <GiPowerLightning className="text-red-500 text-3xl drop-shadow-md" />
            <h1 className="text-2xl font-extrabold text-red-500 tracking-wide">Fitoras</h1>
          </Link>

          {/* Desktop Links */}
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive ? "bg-red-500 text-white shadow-md" : "text-gray-700 hover:text-red-500 hover:bg-red-50"
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ExerciseFilter (desktop only) */}
        {isExercisePage && <ExerciseFilter />}
      </motion.nav>

      {/* Mobile ExerciseFilter on top */}
      {isExercisePage && (
        <div className="md:hidden sticky top-0 z-50">
          <ExerciseFilter />
        </div>
      )}

      {/* Mobile Bottom Navbar */}
      <motion.div
        initial={false}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-t-lg z-50"
      >
        <ul className="flex justify-around items-center py-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                    isActive ? "text-red-500" : "text-gray-600 hover:text-red-500"
                  }`
                }
              >
                {link.icon}
                <span className="text-[10px]">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default NavBar;
