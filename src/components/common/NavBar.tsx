import { BsSignpostSplit } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { GiPowerLightning, GiWeightLiftingUp } from "react-icons/gi";
import { RiWeightLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const links = [
    { to: "/", label: "Home", icon: <FiHome size={18} /> },
    { to: "/splits", label: "Splits", icon: <BsSignpostSplit size={18} /> },
    { to: "/day", label: "Current", icon: <RiWeightLine size={18} /> },
    { to: "/exercise", label: "Exercises", icon: <GiWeightLiftingUp size={18} /> },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-xl shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <GiPowerLightning className="text-red-500 text-3xl drop-shadow-md" />
          <h1 className="text-2xl font-extrabold text-red-500 tracking-wide">Fitora</h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all 
                  ${isActive ? "bg-red-500 text-white shadow-md" : "text-gray-700 hover:text-red-500 hover:bg-red-50"}`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
