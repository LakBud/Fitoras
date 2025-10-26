import { create } from "zustand";
import type { Exercises } from "../../types/exercise";

interface ExerciseFilters {
  name: string;
  force: string;
  mechanic: string;
  equipment: string;
  category: string;
  primaryMuscle: string;
  secondaryMuscle: string;
}

interface FilterState {
  filters: ExerciseFilters;
  filteredExercises: Exercises[];
  allExercises: Exercises[];
  setFilters: (filters: Partial<ExerciseFilters>) => void;
  resetFilters: () => void;
  setAllExercises: (exercises: Exercises[]) => void;
}

const emptyFilters: ExerciseFilters = {
  name: "",
  force: "",
  mechanic: "",
  equipment: "",
  category: "",
  primaryMuscle: "",
  secondaryMuscle: "",
};

// Normalize strings for case-insensitive and hyphen-insensitive comparison
const normalize = (str: string) => str.toLowerCase().replace(/-/g, "").trim();

export const useExerciseFilterStore = create<FilterState>((set, get) => {
  // Core filtering implementation — applies current filters to a list
  const applyFilters = (exercises: Exercises[]) => {
    const { filters } = get();
    const search = normalize(filters.name);

    const filtered = exercises.filter((ex) => {
      // Fields considered in free-text search
      const fieldsToSearch = [
        ex.name,
        ex.force,
        ex.level,
        ex.mechanic,
        ex.equipment,
        ex.category,
        ...(ex.primaryMuscles || []),
      ].filter(Boolean) as string[];

      // match only if text search hits AND all active filters match exactly
      return (
        (!search || fieldsToSearch.some((f) => normalize(f).includes(search))) &&
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

    // Merge new filter values and re-apply when there is data
    setFilters: (newFilters) => {
      const updatedFilters = { ...get().filters, ...newFilters };
      set({ filters: updatedFilters });
      if (get().allExercises.length) {
        applyFilters(get().allExercises);
      }
    },

    // Clear filters and show all exercises again
    resetFilters: () => {
      const allExercises = get().allExercises || [];
      set({ filters: { ...emptyFilters }, filteredExercises: allExercises });
    },

    // Set the full exercise list and immediately apply filters
    setAllExercises: (exercises) => {
      set({ allExercises: exercises });
      applyFilters(exercises);
    },
  };
});
