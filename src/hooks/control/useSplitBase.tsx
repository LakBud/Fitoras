import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useExercise } from "../useExercise";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useFilterStore } from "../../stores/exercises/useFilterStore";
import { useSplitControlStore } from "../../stores/splits/useSplitControlStore";
import type { WorkoutDay } from "../../types/splits";

export function useSplitBase() {
  const { id } = useParams<{ id: string }>();
  const { exercises, loading } = useExercise();
  const { splits, updateSplit } = useSplitsStore();
  const { filteredExercises, setAllExercises } = useFilterStore();
  const { splitId, setSplitId, selectedDay, setSelectedDay } = useSplitControlStore();

  const split = useMemo(() => splits.find((s) => s.id === id), [splits, id]);

  useEffect(() => {
    if (split) setSplitId(split.id);
  }, [split]);

  useEffect(() => {
    if (exercises.length && filteredExercises.length === 0) {
      setAllExercises(exercises);
    }
  }, [exercises]);

  const currentDay: WorkoutDay | undefined = useMemo(() => split?.days.find((d) => d.day === selectedDay), [split, selectedDay]);

  return {
    loading,
    split,
    updateSplit,
    splitId,
    selectedDay,
    setSelectedDay,
    currentDay,
  };
}
