import { create } from "zustand";
import type { Exercises } from "@/types/exercise";

interface ExerciseFilters {
  name: string;
  force: string;
  mechanic: string;
  equipment: string;
  category: string;
  primaryMuscle: string;
  secondaryMuscle: string;
}

interface ControlFilterState {
  filters: ExerciseFilters; // current filter values
  filteredExercises: Exercises[]; // result list
  allExercises: Exercises[]; // source list
  setFilters: (filters: Partial<ExerciseFilters>) => void;
  resetFilters: () => void;
  setAllExercises: (exercises: Exercises[]) => void;
}

// Baseline empty filters
const emptyFilters: ExerciseFilters = {
  name: "",
  force: "",
  mechanic: "",
  equipment: "",
  category: "",
  primaryMuscle: "",
  secondaryMuscle: "",
};

// Normalize search string (case + hyphens + trimming)
const normalize = (str: string) => str.toLowerCase().replace(/-/g, "").trim();

export const useExerciseControlFilter = create<ControlFilterState>((set, get) => {
  // Core filtering function, runs against current filters
  const applyFilters = (exercises: Exercises[]) => {
    const { filters } = get();
    const search = normalize(filters.name);

    const filtered = exercises.filter((ex) => {
      // Fields to match "name search" against
      const fieldsToSearch = [
        ex.name,
        ex.force,
        ex.level,
        ex.mechanic,
        ex.equipment,
        ex.category,
        ...(ex.primaryMuscles || []),
      ].filter(Boolean) as string[];

      return (
        // fuzzy text match OR no name filter
        (!search || fieldsToSearch.some((f) => normalize(f).includes(search))) &&
        // exact value filters (selects)
        (!filters.force || ex.force === filters.force) &&
        (!filters.mechanic || ex.mechanic === filters.mechanic) &&
        (!filters.equipment || ex.equipment === filters.equipment) &&
        (!filters.category || ex.category === filters.category) &&
        (!filters.primaryMuscle || ex.primaryMuscles?.includes(filters.primaryMuscle)) &&
        (!filters.secondaryMuscle || ex.secondaryMuscles?.includes(filters.secondaryMuscle))
      );
    });

    set({ filteredExercises: filtered });
  };

  return {
    filters: { ...emptyFilters },
    filteredExercises: [],
    allExercises: [],

    // Merge new filters into existing, then re-apply if we have exercises loaded
    setFilters: (newFilters) => {
      const updatedFilters = { ...get().filters, ...newFilters };
      set({ filters: updatedFilters });
      if (get().allExercises.length) applyFilters(get().allExercises);
    },

    // Reset filters to empty and show all exercises
    resetFilters: () => {
      const allExercises = get().allExercises || [];
      set({ filters: { ...emptyFilters }, filteredExercises: allExercises });
    },

    // Set initial exercise list and immediately apply filters
    setAllExercises: (exercises) => {
      set({ allExercises: exercises });
      applyFilters(exercises);
    },
  };
});
