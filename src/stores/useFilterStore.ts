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
  setFilters: (filters: Partial<ExerciseFilters>) => void;
  resetFilters: () => void;
  applyFilters: (allExercises?: Exercises[]) => void; // optional param
}

export const useFilterStore = create<FilterState>((set, get) => ({
  filters: {
    name: "",
    force: "",
    mechanic: "",
    equipment: "",
    category: "",
    primaryMuscle: "",
    secondaryMuscle: "",
  },
  filteredExercises: [],

  setFilters: (newFilters) => {
    const updatedFilters = { ...get().filters, ...newFilters };
    set({ filters: updatedFilters });
    get().applyFilters(); // re-apply filters automatically
  },

  resetFilters: () => {
    const emptyFilters: ExerciseFilters = {
      name: "",
      force: "",
      mechanic: "",
      equipment: "",
      category: "",
      primaryMuscle: "",
      secondaryMuscle: "",
    };
    set({ filters: emptyFilters, filteredExercises: [] });
  },

  applyFilters: (allExercises) => {
    const exercisesToFilter = allExercises || get().filteredExercises;
    if (!exercisesToFilter || exercisesToFilter.length === 0) return;

    const { filters } = get();
    const normalize = (str: string) => str.toLowerCase().replace(/-/g, "").trim();
    const search = normalize(filters.name);

    const filtered = exercisesToFilter.filter((ex) => {
      const matchesSearch =
        !search ||
        [
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
        ]
          .filter(Boolean)
          .some((field) => typeof field === "string" && normalize(field).includes(search));

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
  },
}));
