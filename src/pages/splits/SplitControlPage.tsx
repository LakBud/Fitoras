import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentSplitStore } from "../../stores/splits/useCurrentSplitStore";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useThemeColor } from "../../hooks/ui/useThemeColor";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import { ChevronDown, Layers, ListChecks, Filter, Calendar } from "lucide-react";

import NavigateBackButton from "../../components/common/NavigateBackButton";
import ControlDayTabs from "../../components/split/detail/control/category/ControlDayTabs";
import ControlCategoryTab from "../../components/split/detail/control/category/ControlCategoryTab";
import ControlSelectedExercises from "../../components/split/detail/control/exercise/ControlSelectedExercises";
import ControlExerciseList from "../../components/split/detail/control/exercise/ControlExerciseList";
import ControlExerciseFilter from "../../components/split/detail/control/exercise/ControlExerciseFilter";
import { useCategoryControl } from "../../hooks/control/useCategoryControl";

interface CollapsiblePanelProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  theme: any;
  isCollapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isMobile: boolean;
}

const CollapsiblePanel = ({ title, icon, theme, isCollapsed, onToggle, children, isMobile }: CollapsiblePanelProps) => {
  return (
    <div
      className={`backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 ${
        isCollapsed ? "shadow-md" : "shadow-xl"
      }`}
      style={{
        backgroundColor: theme.translucentStrong,
        boxShadow: isCollapsed ? `0 4px 12px ${theme.primary}10` : `0 8px 32px ${theme.primary}20`,
      }}
    >
      {/* Header */}
      <motion.button
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-3 transition-colors ${isMobile ? "p-3" : "p-4 sm:p-5"}`}
        style={{
          backgroundColor: isCollapsed ? "transparent" : `${theme.primary}08`,
          borderBottom: isCollapsed ? "none" : `1px solid ${theme.primary}20`,
        }}
        whileHover={{ backgroundColor: `${theme.primary}12` }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: `${theme.primary}20` }}>
            <div style={{ color: theme.primary }}>{icon}</div>
          </div>
          <h3 className="font-bold text-sm sm:text-base truncate" style={{ color: theme.dark }}>
            {title}
          </h3>
        </div>

        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" style={{ color: theme.primary }} />
        </motion.div>
      </motion.button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={isMobile ? "p-3" : "p-4 sm:p-5"}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SplitControlPage = () => {
  const currentSplit = useCurrentSplitStore((s) => s.currentSplit);
  const setCurrentSplit = useCurrentSplitStore((s) => s.setCurrentSplit);
  const splits = useSplitsStore((s) => s.splits);
  const { id } = useParams<{ id: string }>();
  const { categories, selectedCategoryId } = useCategoryControl();

  const theme = useThemeColor(currentSplit?.category?.color);
  const { isMobile } = useBreakpoint();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSelectedCollapsed, setIsSelectedCollapsed] = useState(false);

  const selectedCategoryName = categories?.find((cat) => cat.id === selectedCategoryId)?.name || selectedCategoryId;
  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  useEffect(() => {
    const split = splits.find((s) => s.id === id);
    if (split) setCurrentSplit(split);
  }, [id, splits, setCurrentSplit]);

  // ================= FRAMER MOTION VARIANTS =================
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div
      className={`min-h-screen relative ${isMobile ? "px-3 pt-3 pb-24" : "px-4 sm:px-6 lg:px-8 pt-4 pb-8"}`}
      style={{
        background: `linear-gradient(135deg, ${theme.gradientStart} 0%, ${theme.gradientEnd} 100%)`,
      }}
    >
      {/* ================= HEADER ================= */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-white/10 mb-4 sm:mb-6 overflow-hidden ${
          isMobile ? "px-3 py-3" : "px-6 py-4"
        }`}
        style={{
          backgroundColor: theme.translucentStrong,
          boxShadow: `0 8px 32px ${theme.primary}20`,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Status Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-2"
              style={{
                backgroundColor: `${theme.primary}20`,
                color: theme.primary,
                border: `1px solid ${theme.primary}40`,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span className="hidden sm:inline">CONTROL PANEL</span>
              <span className="sm:hidden">PANEL</span>
            </motion.div>

            {/* Title */}
            <h1
              className="font-black tracking-tight truncate"
              style={{
                fontSize: isMobile ? "clamp(1.25rem, 5vw, 1.75rem)" : "clamp(1.75rem, 3vw, 2.5rem)",
                color: theme.dark,
                textShadow: `0 2px 20px ${theme.primary}30`,
              }}
            >
              {currentSplit ? (
                <span className="flex items-baseline gap-2 flex-wrap">
                  <span style={{ color: theme.primary }}>{currentSplit.name}</span>
                  {!isMobile && <span className="text-base sm:text-lg font-medium opacity-60">Configuration</span>}
                </span>
              ) : (
                <span className="animate-pulse">Loading...</span>
              )}
            </h1>
          </div>

          {/* Quick Stats */}
          {!isMobile && currentSplit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3"
            >
              <div className="px-3 py-2 rounded-lg backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}15` }}>
                <div className="text-xs opacity-70" style={{ color: theme.dark }}>
                  Days
                </div>
                <div className="text-lg font-bold" style={{ color: theme.primary }}>
                  {currentSplit.days?.length || 0}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* ================= MAIN ================= */}
      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 sm:space-y-5">
        {/* ---- Day Tabs ---- */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${theme.primary}20` }}>
              <Calendar className="w-4 h-4" style={{ color: theme.primary }} />
            </div>
            <h3 className="font-bold text-sm sm:text-base" style={{ color: theme.dark }}>
              Days
            </h3>
          </div>
          <div className="overflow-x-auto -mx-3 px-3 sm:-mx-5 sm:px-5 pb-2 scrollbar-thin">
            <ControlDayTabs />
          </div>
        </motion.div>

        {/* ---- Categories Section ---- */}

        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${theme.primary}20` }}>
            <Layers className="w-4 h-5" style={{ color: theme.primary }} />
          </div>
          <h3 className="font-bold text-sm sm:text-base" style={{ color: theme.dark }}>
            Categories
          </h3>
        </div>
        <div className="overflow-x-auto -mx-2 px-3 sm:-mx-5 sm:px-5 pb-2 scrollbar-thin">
          <ControlCategoryTab />
        </div>

        {/* ---- Selected Exercises Panel ---- */}
        <motion.div variants={itemVariants}>
          <CollapsiblePanel
            title={
              selectedCategoryId ? (
                <>
                  Selected in <span style={{ color: selectedCategory?.color || theme.primary }}>{selectedCategoryName}</span>
                </>
              ) : (
                "Selected Exercises"
              )
            }
            icon={<ListChecks className="w-4 h-4" />}
            theme={theme}
            isCollapsed={isSelectedCollapsed}
            onToggle={() => setIsSelectedCollapsed(!isSelectedCollapsed)}
            isMobile={isMobile}
          >
            <ControlSelectedExercises />
          </CollapsiblePanel>
        </motion.div>

        {/* ---- Exercise Library Panel ---- */}
        <motion.div variants={itemVariants}>
          <CollapsiblePanel
            title="Exercise Library"
            icon={<Filter className="w-4 h-4" />}
            theme={theme}
            isCollapsed={isCollapsed}
            onToggle={() => setIsCollapsed(!isCollapsed)}
            isMobile={isMobile}
          >
            <div className="space-y-4">
              <ControlExerciseFilter />
              <ControlExerciseList />
            </div>
          </CollapsiblePanel>
        </motion.div>
      </motion.main>

      {/* ========== MOBILE GRADIENT OVERLAY ========= */}
      {isMobile && (
        <div
          className="fixed bottom-0 left-0 w-full pointer-events-none h-24"
          style={{
            background: `linear-gradient(to top, ${theme.gradientEnd}, transparent)`,
          }}
        />
      )}

      <NavigateBackButton />
    </div>
  );
};

export default SplitControlPage;
