import { motion } from "framer-motion";
import { useCurrentSplitStore } from "../../stores/splits/useCurrentSplitStore";
import { useThemeColor } from "../../hooks/useThemeColor";
import useBreakpoint from "../../hooks/useBreakpoint";
import NavigateBackButton from "../../components/common/NavigateBackButton";

const SplitControlPage = () => {
  const currentSplit = useCurrentSplitStore((state) => state.currentSplit);
  const theme = useThemeColor(currentSplit?.category?.color);
  const { isDesktop } = useBreakpoint();

  return (
    <div
      className="min-h-screen p-4 sm:p-6 lg:p-12"
      style={{
        background: `linear-gradient(to bottom, ${theme.gradientStart}, ${theme.gradientEnd})`,
      }}
    >
      {/* Header */}
      <header
        className=" top-0 z-20 backdrop-blur-md rounded-2xl shadow-md py-4 px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 mb-8"
        style={{ backgroundColor: theme.translucent }}
      >
        <div className="flex flex-col">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: theme.primary }}
          >
            {currentSplit ? `${currentSplit.name} — Control Panel` : "Loading..."}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg"
          >
            Manage exercises, categories, and split details here.
          </motion.p>
        </div>

        {/* Actions */}
        <div className={`mt-4 sm:mt-0 flex flex-wrap gap-3 ${isDesktop ? "" : "justify-center"}`}>
          <button
            className="px-4 py-2 rounded-2xl font-semibold shadow-md transition-all"
            style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
          >
            Save
          </button>
          <button
            className="px-4 py-2 rounded-2xl font-semibold shadow-md transition-all border"
            style={{ borderColor: theme.primary, color: theme.primary }}
          >
            Cancel
          </button>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8 w-full min-h-screen p-4 md:p-8"
      >
        {/* ================= Top Section ================= */}
        {/* Days + Categories + Selected Exercises */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Left Panel - Days */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="min-w-[100px] lg:w-full h-14 flex items-center justify-center font-semibold cursor-pointer rounded-3xl transition-all duration-200
                     bg-gray-200 hover:bg-gray-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                Day {i + 1}
              </div>
            ))}
          </div>

          {/* Right Panel - Categories + Selected Exercises */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Categories Row */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-[90px] h-12 flex items-center justify-center font-medium cursor-pointer rounded-3xl transition-all duration-200
                       bg-gray-300 hover:bg-gray-400 shadow-sm hover:shadow-md relative"
                  title={`Category ${i + 1}`}
                >
                  Category {i + 1}
                  <span
                    className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"
                    aria-label="Category color indicator"
                  />
                </div>
              ))}
              <div
                className="min-w-[90px] h-12 flex items-center justify-center font-bold text-white shadow rounded-3xl cursor-pointer transition-all duration-200
                     bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
                title="Add new category"
              >
                + Add
              </div>
            </div>

            {/* Selected Exercises Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 flex flex-col items-center justify-center p-2 text-gray-600 font-medium cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition-transform duration-200
                       bg-gray-200 hover:bg-gray-300"
                >
                  <div className="w-full h-20 bg-gray-100 rounded-xl mb-2" />
                  <span className="text-xs sm:text-sm">Exercise {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Bottom Section ================= */}
        {/* Exercise Filter + List */}
        <div className="flex flex-col gap-6">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="🔍 Search exercises..."
              className="flex-1 h-12 px-4 rounded-3xl shadow-inner bg-gray-200 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500 transition"
            />
            <select className="w-full sm:w-40 h-12 px-4 rounded-3xl shadow-inner bg-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500 transition">
              <option>Filter by category</option>
            </select>
          </div>

          {/* Exercise List Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-auto">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="h-32 flex flex-col items-center justify-center p-2 text-gray-600 font-medium cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition-transform duration-200
                     bg-gray-200 hover:bg-gray-300"
              >
                <div className="w-full h-20 bg-gray-100 rounded-xl mb-2" />
                <span className="text-xs sm:text-sm">Exercise {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= Optional Extra Section ================= */}
        {/* Collapsible panel for analytics, notes, export, etc. */}
        <div className="mt-8 p-4 rounded-3xl shadow-inner bg-gray-50 text-gray-500 text-sm text-center">
          {/* Split Details Modal Button */}
          <button
            className="flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-3xl shadow-md transition font-semibold mx-auto md:mx-0"
            onClick={() => {
              // Open modal logic here
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M4 13.5V20h6.5l10-10-6.5-6.5-10 10z"
              />
            </svg>
            <span>Edit Split Details</span>
          </button>
        </div>
      </motion.main>

      <NavigateBackButton />
    </div>
  );
};

export default SplitControlPage;
