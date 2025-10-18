import { useSplitBase } from "./useSplitBase";
import { useCategoryControl } from "./useCategoryControl";
import { useExerciseControl } from "../exercise/useExerciseControl";

export function useSplitControl() {
  return {
    ...useSplitBase(),
    ...useCategoryControl(),
    ...useExerciseControl(),
  };
}
