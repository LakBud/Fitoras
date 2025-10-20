import { useSplitBase } from "./useSplitBase";
import { useCategoryBase } from "./useCategoryBase";
import { useExerciseBase } from "../exercise/useExerciseBase";

export function useSplitController() {
  return {
    ...useSplitBase(),
    ...useCategoryBase(),
    ...useExerciseBase(),
  };
}
