import useBreakpoint from "@/hooks/ui/useBreakpoint";
import MobileExerciseFilter from "./MobileExerciseFilter";
import DesktopExerciseFilter from "./DesktopExerciseFilter";
import { useEffect } from "react";
import { useExerciseFilterStore } from "@/stores/exercises/useExerciseFilterStore";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";

const ExerciseFilter = () => {
  const { exercises } = useExerciseStore();
  const { isDesktop } = useBreakpoint();
  const { setAllExercises } = useExerciseFilterStore();

  useEffect(() => {
    if (exercises.length) setAllExercises(exercises);
  }, [exercises, setAllExercises]);

  return <>{isDesktop ? <DesktopExerciseFilter /> : <MobileExerciseFilter />}</>;
};

export default ExerciseFilter;
