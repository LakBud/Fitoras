import { useParams } from "react-router-dom";
import { type Variants, motion } from "framer-motion";
import { useSplitsStore } from "@/stores/split/useSplitStore";
import { useThemeColor } from "../../hooks/ui/useThemeColor";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import { Layers, ListChecks, Filter, Calendar } from "lucide-react";

import NavigateBackButton from "../../components/common/NavigateBackButton";
import ControlDayTabs from "@/components/splitControl/categories/tabs/ControlDayTabs";
import ControlCategoryTab from "@/components/splitControl/categories/tabs/ControlCategoryTab";
import ControlSelectedExercises from "@/components/splitControl/exercise/lists/ControlSelectedExerciseList";
import ControlExerciseList from "@/components/splitControl/exercise/lists/ControlExerciseList";
import ControlExerciseFilter from "@/components/filters/splitControl/ControlExerciseFilter";
import { useCategoryBase } from "../../hooks/splitControl/useCategoryBase";
import CollapsiblePanel from "@/components/ui/collapsible-panel";
import ControlExerciseCategory from "@/components/splitControl/categories/form/ControlExerciseCategoryForm";
import { useCollapsedPanels } from "@/hooks/ui/useCollapsedPanels";

const SplitControlPage = () => {
  const splits = useSplitsStore((s) => s.splits);
  const { id } = useParams<{ id: string }>();
  const split = splits.find((s) => s.id === id);

  const { categories, selectedCategoryId } = useCategoryBase();

  const theme = useThemeColor(split?.category?.color);
  const { isMobile } = useBreakpoint();

  const { collapsed, toggle } = useCollapsedPanels({
    days: false,
    categories: false,
    selected: false,
    library: false,
  });

  const selectedCategoryName = categories?.find((cat) => cat.id === selectedCategoryId)?.name || selectedCategoryId;
  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div
      className={`min-h-screen relative ${isMobile ? "px-3 overflow-hidden pt-3 pb-24" : "px-4 sm:px-6 lg:px-8 pt-22 pb-8"}`}
      style={{
        background: `linear-gradient(135deg, ${theme.gradientStart} 0%, ${theme.gradientEnd} 100%)`,
      }}
    >
      {/* HEADER */}
      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 sm:space-y-5">
        {/* Days */}
        <motion.div variants={itemVariants}>
          <CollapsiblePanel
            title="Days"
            icon={<Calendar className="w-4 h-4" />}
            theme={theme}
            isCollapsed={collapsed.days}
            onToggle={() => toggle("days")}
            isMobile={isMobile}
          >
            <div className="overflow-x-auto -mx-3 px-3 sm:-mx-5 sm:px-5 pb-2 scrollbar-thin">
              <ControlDayTabs />
            </div>
          </CollapsiblePanel>
        </motion.div>

        {/* Categories */}
        <CollapsiblePanel
          title="Exercise Categories"
          icon={<Layers className="w-4 h-4" />}
          theme={theme}
          isCollapsed={collapsed.categories}
          onToggle={() => toggle("categories")}
          isMobile={isMobile}
        >
          <div className="overflow-x-auto -mx-2 px-3 sm:-mx-5 sm:px-5 pb-3 scrollbar-thin">
            <div className="flex items-start gap-3 flex-nowrap">
              <ControlCategoryTab />
              <ControlExerciseCategory />
            </div>
          </div>
        </CollapsiblePanel>

        {/* Selected Exercises */}
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
            isCollapsed={collapsed.selected}
            onToggle={() => toggle("selected")}
            isMobile={isMobile}
          >
            <ControlSelectedExercises />
          </CollapsiblePanel>
        </motion.div>

        {/* Exercise Library */}
        <motion.div variants={itemVariants}>
          <CollapsiblePanel
            title="Exercise Library"
            icon={<Filter className="w-4 h-4" />}
            theme={theme}
            isCollapsed={collapsed.library}
            onToggle={() => toggle("library")}
            isMobile={isMobile}
          >
            <div className="space-y-4">
              <ControlExerciseFilter />
              <ControlExerciseList />
            </div>
          </CollapsiblePanel>
        </motion.div>
      </motion.main>

      {isMobile && (
        <div
          className="fixed bottom-0 left-0 w-full pointer-events-none h-24"
          style={{ background: `linear-gradient(to top, ${theme.gradientEnd}, transparent)` }}
        />
      )}
      <NavigateBackButton />
    </div>
  );
};

export default SplitControlPage;
