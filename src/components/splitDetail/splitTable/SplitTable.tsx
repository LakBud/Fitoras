import { useCurrentSplitStore } from "@/stores/split/useCurrentSplitStore";
import useBreakpoint from "@/hooks/ui/useBreakpoint";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import MobileSplitTable from "./mobile/MobileSplitTable";
import DesktopSplitTable from "./desktop/DesktopSplitTable";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";

const SplitTable = () => {
  const currentSplit = useCurrentSplitStore((state) => state.currentSplit);
  const { exercises: allExercises, loading } = useExerciseStore();
  const { isDesktop } = useBreakpoint();
  const theme = useThemeColor(currentSplit?.category?.color);
  const getExerciseById = (id: string) => allExercises.find((ex) => ex.id === id);

  if (!currentSplit) return null;
  if (loading) return <div className="flex items-center justify-center py-12 text-gray-500">Loading exercises...</div>;

  return isDesktop ? (
    <DesktopSplitTable currentSplit={currentSplit} getExerciseById={getExerciseById} theme={theme} />
  ) : (
    <MobileSplitTable currentSplit={currentSplit} getExerciseById={getExerciseById} theme={theme} />
  );
};

export default SplitTable;
