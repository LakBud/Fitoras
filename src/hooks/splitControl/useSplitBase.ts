import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSplitsStore } from "@/stores/split/useSplitStore";
import { useExerciseFilterStore } from "../../stores/exercises/useExerciseFilterStore";
import { useSplitControlStore } from "@/stores/splitControl/useSplitControlStore";
import type { WorkoutDay } from "../../types/splits";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";

export function useSplitBase() {
  const { id } = useParams<{ id: string }>();
  const { exercises, loading } = useExerciseStore();
  const { splits, updateSplit } = useSplitsStore();
  const { filteredExercises, setAllExercises } = useExerciseFilterStore();
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
