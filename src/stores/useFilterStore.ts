import { create } from "zustand";
import type { Exercises } from "../types/exercise";

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

export const useFilterStore = create<FilterState>((set, get) => {
  // Internal function: applies current filters to a list of exercises
  const applyFilters = (exercises: Exercises[]) => {
    const { filters } = get();
    const normalize = (str: string) => str.toLowerCase().replace(/-/g, "").trim();
    const search = normalize(filters.name);

    const filtered = exercises.filter((ex) => {
      const fieldsToSearch = [
        ex.name,
        ex.force,
        ex.level,
        ex.mechanic,
        ex.equipment,
        ex.instructions,
        ex.category,
        ex.id,
        ...(ex.primaryMuscles || []),
        ...(ex.secondaryMuscles || []),
      ].filter(Boolean) as string[];

      const matchesSearch = !search || fieldsToSearch.some((f) => normalize(f).includes(search));
      const matchesForce = !filters.force || ex.force === filters.force;
      const matchesMechanic = !filters.mechanic || ex.mechanic === filters.mechanic;
      const matchesEquipment = !filters.equipment || ex.equipment === filters.equipment;
      const matchesCategory = !filters.category || ex.category === filters.category;
      const matchesPrimary = !filters.primaryMuscle || ex.primaryMuscles?.includes(filters.primaryMuscle);
      const matchesSecondary = !filters.secondaryMuscle || ex.secondaryMuscles?.includes(filters.secondaryMuscle);

      return (
        matchesSearch &&
        matchesForce &&
        matchesMechanic &&
        matchesEquipment &&
        matchesCategory &&
        matchesPrimary &&
        matchesSecondary
      );
    });

    set({ filteredExercises: filtered });
  };

  return {
    filters: { ...emptyFilters },
    filteredExercises: [],
    allExercises: [],

    // Update filters and automatically re-filter
    setFilters: (newFilters) => {
      set({ filters: { ...get().filters, ...newFilters } });
      if (get().allExercises.length) {
        applyFilters(get().allExercises);
      }
    },

    // Reset filters to empty and show all exercises
    resetFilters: () => {
      set({ filters: { ...emptyFilters }, filteredExercises: get().allExercises });
    },

    // Set all exercises (e.g., when fetched from API) and automatically filter
    setAllExercises: (exercises) => {
      set({ allExercises: exercises });
      applyFilters(exercises);
    },
  };
});
