import { useCategoryControl } from "@/hooks/splitControl/useCategoryControl";
import { useExerciseControl } from "@/hooks/exercise/useExerciseControl";
import { useSplitControl } from "@/hooks/splitControl/useSplitControl";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import useBreakpoint from "@/hooks/ui/useBreakpoint";
import { FiInfo } from "react-icons/fi";
import { ControlSelectedExerciseCard } from "../cards/ControlSelectedExerciseCard";

const ControlSelectedExerciseList = () => {
  const { selectedCategoryId } = useCategoryControl();
  const { displayedExercises, handleChangeSetsReps, handleRemoveExercise } = useExerciseControl();
  const { split } = useSplitControl();
  const { isMobile } = useBreakpoint();

  const theme = useThemeColor(split?.category?.color);

  if (!displayedExercises?.length) {
    return (
      <div
        className="w-full p-6 rounded-xl flex flex-col items-center justify-center text-center text-gray-500 space-y-2"
        style={{
          backgroundColor: theme.lighter,
          border: `1.5px dashed ${theme.translucentStrong}`,
          minHeight: "150px",
        }}
      >
        <FiInfo className="text-3xl mb-2" style={{ color: theme.primary }} />
        <p className="text-base font-semibold" style={{ color: theme.dark }}>
          No exercises selected yet
        </p>
        <p className="text-sm text-gray-500 max-w-xs">Select exercises by clicking on the prioritized exercise from the list.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {displayedExercises.map((ex, idx) => (
        <ControlSelectedExerciseCard
          key={`${ex.id}-${idx}`}
          ex={ex}
          isMobile={isMobile}
          splitCategoryColor={split?.category?.color}
          selectedCategoryId={selectedCategoryId || undefined}
          onChange={handleChangeSetsReps}
          onRemove={handleRemoveExercise}
        />
      ))}
    </div>
  );
};

export default ControlSelectedExerciseList;
