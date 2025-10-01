import { motion } from "framer-motion";
import { useCurrentSplitStore } from "../../stores/splits/useCurrentSplitStore";
import { useThemeColor } from "../../hooks/ui/useThemeColor";
import NavigateBackButton from "../../components/common/NavigateBackButton";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import ControlDayTabs from "../../components/split/detail/control/category/ControlDayTabs";
import ControlCategoryTab from "../../components/split/detail/control/category/ControlCategoryTab";
import ControlAddCategory from "../../components/split/detail/control/category/ControlAddCategory";
import { useEffect } from "react";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useParams } from "react-router-dom";
import ControlSelectedExercises from "../../components/split/detail/control/exercise/ControlSelectedExercises";
import ControlExerciseList from "../../components/split/detail/control/exercise/ControlExerciseList";

const SplitControlPage = () => {
  const currentSplit = useCurrentSplitStore((state) => state.currentSplit);
  const theme = useThemeColor(currentSplit?.category?.color);
  const { isDesktop, isMobile } = useBreakpoint();
  const setCurrentSplit = useCurrentSplitStore((state) => state.setCurrentSplit);
  const splits = useSplitsStore((state) => state.splits);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const split = splits.find((s) => s.id === id);
    if (split) setCurrentSplit(split);
  }, [id, splits, setCurrentSplit]);

  return (
    <div
      className={`min-h-screen pb-20 ${isMobile ? "p-4" : "p-6 lg:p-12"}`}
      style={{
        background: `linear-gradient(to bottom, ${theme.gradientStart}, ${theme.gradientEnd})`,
      }}
    >
      {/* ================= HEADER ================= */}
      <header
        className={` top-0 z-20 backdrop-blur-md rounded-2xl shadow-lg
          ${isMobile ? "px-4 py-4 mb-6 flex flex-col gap-3" : "px-6 py-5 mb-10 grid grid-cols-[1fr_auto] items-center"}
        `}
        style={{ backgroundColor: theme.translucent }}
      >
        {/* Title + Subtitle */}
        <div className="flex flex-col min-w-0">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`font-extrabold tracking-tight flex flex-wrap items-baseline
              ${isMobile ? "text-2xl" : "text-3xl sm:text-4xl md:text-5xl"}`}
            style={{ color: theme.primary }}
          >
            {currentSplit ? (
              <>
                <span
                  className="truncate max-w-[200px] sm:max-w-[350px] md:max-w-[500px] inline-block align-baseline"
                  title={currentSplit.name}
                >
                  {currentSplit.name}
                </span>
                <span className="whitespace-nowrap ml-1 opacity-80">— Control Panel</span>
              </>
            ) : (
              "Loading..."
            )}
          </motion.h1>

          {!isMobile && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg max-w-[600px]"
            >
              Manage exercises, categories, and split details here.
            </motion.p>
          )}
        </div>
      </header>

      {/* Actions - Sticky Footer */}
      <div
        className={`sticky bottom-0 left-0 w-full z-30 backdrop-blur-md shadow-md
    ${isMobile ? "px-3 py-3" : "px-6 py-4"}
    flex ${isMobile ? "justify-center gap-2" : "justify-end gap-4"}
    rounded-t-2xl sm:rounded-2xl`}
        style={{ backgroundColor: theme.translucent }}
      >
        <button
          className={`font-semibold rounded-2xl shadow-md transition-all 
      min-w-[90px] hover:brightness-110 active:scale-95
      ${isMobile ? "px-3 py-2 text-sm" : "px-5 py-2"}`}
          style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
        >
          Save
        </button>
        <button
          className={`font-semibold rounded-2xl shadow-md transition-all border
      min-w-[90px] hover:bg-[rgba(0,0,0,0.05)] active:scale-95
      ${isMobile ? "px-3 py-2 text-sm" : "px-5 py-2"}`}
          style={{ borderColor: theme.primary, color: theme.primary }}
        >
          Cancel
        </button>
      </div>

      {/* ================= MAIN ================= */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col gap-8 w-full min-h-screen ${isMobile ? "p-2" : "p-4 md:p-8"}`}
      >
        <ControlDayTabs />

        {/* =========== Top Section =========== */}
        <div className={`flex w-full gap-8 ${isDesktop ? "flex-row" : "flex-col"}`}>
          {/* Right Panel - Categories + Selected Exercises */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Categories Row */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <ControlCategoryTab />
              <ControlAddCategory />
            </div>

            {/* Selected Exercises Grid */}
            <ControlSelectedExercises />
          </div>
        </div>

        {/* =========== Bottom Section =========== */}
        <div className="flex flex-col gap-6">
          {/* Search & Filter */}
          <div className={`flex gap-4 ${isMobile ? "flex-col" : "flex-row items-center"}`}>
            <input
              type="text"
              placeholder="🔍 Search exercises..."
              className="flex-1 h-12 px-4 rounded-3xl shadow-inner bg-gray-200 text-gray-500 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500 transition"
            />
            <select className="w-full sm:w-40 h-12 px-4 rounded-3xl shadow-inner bg-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500 transition">
              <option>Filter by category</option>
            </select>
          </div>

          {/* Exercise List Grid */}
          <ControlExerciseList />
        </div>
      </motion.main>

      <NavigateBackButton />
    </div>
  );
};

export default SplitControlPage;
