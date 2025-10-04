import { useCurrentSplitStore } from "@/stores/splits/useCurrentSplitStore";
import { useExercise } from "@/hooks/useExercise";
import useBreakpoint from "@/hooks/ui/useBreakpoint";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import MobileSplitTable from "./mobile/MobileSplitTable";
import DesktopSplitTable from "./desktop/DesktopSplitTable";

const SplitTable = () => {
  const currentSplit = useCurrentSplitStore((state) => state.currentSplit);
  const { exercises: allExercises, loading } = useExercise();
  const { isDesktop } = useBreakpoint();
  const theme = useThemeColor(currentSplit?.category?.color);

  if (!currentSplit) return null;
  if (loading) return <div className="flex items-center justify-center py-12 text-gray-500">Loading exercises...</div>;

  return isDesktop ? (
    <DesktopSplitTable currentSplit={currentSplit} allExercises={allExercises} theme={theme} />
  ) : (
    <MobileSplitTable currentSplit={currentSplit} allExercises={allExercises} theme={theme} />
  );
};

export default SplitTable;
