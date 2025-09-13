import { Link } from "react-router-dom";
import { GiPowerLightning } from "react-icons/gi"; // gym icons

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 px-6">
      {/* Logo + Icon */}
      <div className="flex items-center gap-3 mb-6 mt-10">
        <GiPowerLightning className="text-red-400 text-6xl drop-shadow-md" />
        <h1 className="text-6xl font-extrabold text-red-400 drop-shadow-md tracking-wide">Fitora</h1>
      </div>

      {/* Tagline */}
      <p className="text-lg text-gray-600 mb-10 max-w-md text-center leading-relaxed">
        Push your limits. Track workouts. Unlock your potential.
      </p>

      {/* Call to Action */}
      <Link to="/splits">
        <button className="px-10 py-3 text-lg font-semibold text-white bg-red-400 rounded-2xl shadow-lg hover:bg-red-500 hover:scale-105 transition-transform">
          Get Started
        </button>
      </Link>

      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm mb-6">© {new Date().getFullYear()} Fitora. All rights reserved.</footer>
    </div>
  );
};

export default HomePage;
