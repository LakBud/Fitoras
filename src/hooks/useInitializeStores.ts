// hooks/useInitializeStores.ts
import { useEffect } from "react";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { useSplitsStore } from "@/stores/splits/useSplitStore";
import { useCalendarStore } from "@/stores/useCalendarStore";

export const useInitializeStores = () => {
  const fetchExercises = useExerciseStore((state) => state.fetchExercises);
  const loadSplits = useSplitsStore((state) => state.loadSplits);
  const loadCalendar = useCalendarStore((state) => state.loadCalendar);

  useEffect(() => {
    // Initialize all stores
    fetchExercises();
    loadSplits();
    loadCalendar();
  }, [fetchExercises, loadSplits, loadCalendar]);
};
