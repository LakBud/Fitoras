import { useEffect } from "react";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { useSplitsStore } from "@/stores/split/useSplitStore";
import { useCalendarStore } from "@/stores/useCalendarStore";
import { useThemeStore } from "@/stores/useThemeStore";

export const useInitializeStores = () => {
  const fetchExercises = useExerciseStore((state) => state.fetchExercises);
  const loadSplits = useSplitsStore((state) => state.loadSplits);
  const loadCalendar = useCalendarStore((state) => state.loadCalendar);
  const loadTheme = useThemeStore((state) => state.loadTheme);

  useEffect(() => {
    // Initialize all stores
    fetchExercises();
    loadSplits();
    loadCalendar();
    loadTheme();
  }, [fetchExercises, loadSplits, loadCalendar, loadTheme]);
};
