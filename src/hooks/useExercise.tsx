import { useEffect } from "react";
import { useExerciseStore } from "../stores/exercises/useExerciseStore";
export function useExercise(jsonPath?: string) {
  const { exercises, loading, fetchExercises } = useExerciseStore();

  useEffect(() => {
    fetchExercises(jsonPath);
  }, [jsonPath, fetchExercises]);

  return { exercises, loading };
}
