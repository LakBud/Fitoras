import useBreakpoint from "@/hooks/ui/useBreakpoint";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import MobileSplitTable from "./mobile/MobileSplitTable";
import DesktopSplitTable from "./desktop/DesktopSplitTable";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import type { Split } from "@/types/splits";

const SplitTable = ({ split }: { split: Split }) => {
  const { exercises: allExercises, loading } = useExerciseStore();
  const { isDesktop } = useBreakpoint();
  const theme = useThemeColor(split?.category?.color);
  const getExerciseById = (id: string) => allExercises.find((ex) => ex.id === id);

  if (!split) return null;
  if (loading) return <div className="flex ...">Loading...</div>;

  return isDesktop ? (
    <DesktopSplitTable currentSplit={split} getExerciseById={getExerciseById} theme={theme} />
  ) : (
    <MobileSplitTable currentSplit={split} getExerciseById={getExerciseById} theme={theme} />
  );
};

export default SplitTable;
