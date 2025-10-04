import { useSplitBase } from "./useSplitBase";
import { useCategoryControl } from "./useCategoryControl";
import { useExerciseControl } from "./useExerciseControl";

export function useSplitControl() {
  return {
    ...useSplitBase(),
    ...useCategoryControl(),
    ...useExerciseControl(),
  };
}
