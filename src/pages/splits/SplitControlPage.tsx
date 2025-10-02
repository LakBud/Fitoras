import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentSplitStore } from "../../stores/splits/useCurrentSplitStore";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useThemeColor } from "../../hooks/ui/useThemeColor";
import useBreakpoint from "../../hooks/ui/useBreakpoint";

import NavigateBackButton from "../../components/common/NavigateBackButton";
import ControlDayTabs from "../../components/split/detail/control/category/ControlDayTabs";
import ControlCategoryTab from "../../components/split/detail/control/category/ControlCategoryTab";
import ControlSelectedExercises from "../../components/split/detail/control/exercise/ControlSelectedExercises";
import ControlExerciseList from "../../components/split/detail/control/exercise/ControlExerciseList";
import ControlExerciseFilter from "../../components/split/detail/control/exercise/ControlExerciseFilter";
import { useCategoryControl } from "../../hooks/control/useCategoryControl";

const SplitControlPage = () => {
  const currentSplit = useCurrentSplitStore((s) => s.currentSplit);
  const setCurrentSplit = useCurrentSplitStore((s) => s.setCurrentSplit);
  const splits = useSplitsStore((s) => s.splits);
  const { id } = useParams<{ id: string }>();
  const { categories, selectedCategoryId } = useCategoryControl();

  const theme = useThemeColor(currentSplit?.category?.color);
  const { isDesktop, isMobile } = useBreakpoint();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSelectedCollapsed, setIsSelectedCollapsed] = useState(false);
  const selectedCategoryName = categories?.find((cat) => cat.id === selectedCategoryId)?.name || selectedCategoryId;
  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  useEffect(() => {
    const split = splits.find((s) => s.id === id);
    if (split) setCurrentSplit(split);
  }, [id, splits, setCurrentSplit]);

  const fadeSlide = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4 },
    }),
  };

  return (
    <div
      className={`min-h-screen relative ${isMobile ? "p-4 pb-[calc(9rem+env(safe-area-inset-bottom))]" : "p-6 lg:p-12"}`}
      style={{
        background: `linear-gradient(180deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
      }}
    >
      {/* ================= HEADER ================= */}
      <header
        className={`
    top-4 z-30 backdrop-blur-xl rounded-2xl shadow-2xl
    ${isMobile ? "px-4 py-4 mb-6 flex flex-col gap-2" : "px-8 py-6 mb-10 grid grid-cols-[1fr_auto] items-center"}
  `}
        style={{ backgroundColor: theme.translucent }}
      >
        <div className="flex flex-col min-w-0 gap-1">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-extrabold tracking-tight flex flex-wrap items-baseline"
            style={{
              color: theme.primary,
              fontSize: isMobile ? "clamp(1.5rem, 6vw, 2rem)" : "clamp(2.5rem, 4vw, 3.5rem)",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            {currentSplit ? (
              <>
                <span
                  className=" inline-block font-extrabold"
                  title={currentSplit.name}
                  style={{
                    background: `linear-gradient(90deg, ${theme.primary}, $theme.gradientEnd})`,
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {currentSplit.name}
                </span>
                <span
                  className="ml-2 opacity-80"
                  style={{
                    fontSize: isMobile ? "1.5rem" : "2.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  — Control Panel
                </span>
              </>
            ) : (
              "Loading..."
            )}
          </motion.h1>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`flex flex-col gap-10 w-full ${isMobile ? "py-2" : "p-4 md:p-8"}`}
      >
        {/* ---- Day Tabs ---- */}
        <ControlDayTabs />

        {/* =========== Top Section =========== */}
        <section className={`flex w-full gap-8 ${isDesktop ? "flex-row items-start" : "flex-col"}`}>
          <div className="flex-1 flex flex-col gap-6">
            {/* Categories */}
            <motion.div
              className="flex items-center gap-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeSlide} custom={0}>
                <ControlCategoryTab />
              </motion.div>
            </motion.div>

            {/* Selected Exercises */}
            <motion.div
              variants={fadeSlide}
              custom={2}
              initial="hidden"
              animate="visible"
              className="rounded-2xl shadow-xl border border-transparent hover:border-white/20 transition-colors duration-300 overflow-hidden"
              style={{
                backgroundColor: theme.translucentStrong,
                backdropFilter: "blur(10px)",
              }}
            >
              {/* --- Collapse Toggle Header --- */}
              <div className="flex justify-between items-center p-4 border-b border-white/20">
                <h4 className={`font-semibold ${isDesktop ? "text-lg" : "text-base"}`} style={{ color: theme.dark }}>
                  {selectedCategoryId ? (
                    <>
                      Selected Exercises in
                      <span className="ml-1" style={{ color: selectedCategory?.color || theme.primary }}>
                        {selectedCategoryName}
                      </span>
                    </>
                  ) : (
                    "Selected Exercises"
                  )}
                </h4>

                <button
                  onClick={() => setIsSelectedCollapsed((prev) => !prev)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition hover:opacity-90"
                  style={{
                    color: theme.textOnPrimary,
                    backgroundColor: theme.primary,
                  }}
                >
                  {isSelectedCollapsed ? "Show" : "Hide"}
                  <motion.span
                    animate={{ rotate: isSelectedCollapsed ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-xs"
                  >
                    ▼
                  </motion.span>
                </button>
              </div>

              {/* --- Collapsible Content --- */}
              <motion.div
                initial={false}
                animate={{
                  maxHeight: isSelectedCollapsed ? 0 : 2000,
                  opacity: isSelectedCollapsed ? 0 : 1,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="overflow-hidden px-4 sm:px-6 py-4"
              >
                <ControlSelectedExercises />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =========== Bottom Section (Collapsible Panel) =========== */}
        <section className="flex flex-col gap-6">
          <motion.div
            variants={fadeSlide}
            custom={4}
            initial="hidden"
            animate="visible"
            className="rounded-2xl shadow-xl border border-transparent hover:border-white/20 transition-colors duration-300 overflow-hidden"
            style={{
              backgroundColor: theme.translucentStrong,
              backdropFilter: "blur(10px)",
            }}
          >
            {/* --- Collapse Toggle Header --- */}
            <div className="flex justify-between items-center p-4 border-b border-white/20">
              <h3 className="font-semibold text-base sm:text-lg" style={{ color: theme.primary }}>
                Exercises
              </h3>
              <button
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition hover:opacity-90"
                style={{
                  color: theme.textOnPrimary,
                  backgroundColor: theme.primary,
                }}
              >
                {isCollapsed ? "Show" : "Hide"}
                <motion.span
                  animate={{ rotate: isCollapsed ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block text-xs"
                >
                  ▼
                </motion.span>
              </button>
            </div>

            {/* --- Collapsible Content --- */}
            <motion.div
              initial={false}
              animate={{
                maxHeight: isCollapsed ? 0 : 2000,
                opacity: isCollapsed ? 0 : 1,
              }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="overflow-hidden px-4 sm:px-6 py-4 space-y-4"
            >
              <ControlExerciseFilter />
              <ControlExerciseList />
            </motion.div>
          </motion.div>
        </section>
      </motion.main>

      {/* ========== MOBILE NAV SAFE AREA ========= */}
      {isMobile && (
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            height: "calc(4rem + env(safe-area-inset-bottom))",
            background: `linear-gradient(transparent, ${theme.gradientEnd})`,
          }}
        />
      )}

      <NavigateBackButton />
    </div>
  );
};

export default SplitControlPage;
