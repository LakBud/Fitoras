import { useMemo } from "react";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { FiZap, FiSettings, FiBox, FiLayers, FiTarget, FiShuffle } from "react-icons/fi";
import type { IconType } from "react-icons";

// Define valid filter keys
type FilterKey = "force" | "mechanic" | "equipment" | "category" | "primaryMuscle" | "secondaryMuscle";

// Define the filter option type
interface FilterOption {
  key: FilterKey;
  values: string[];
  icon: IconType;
}

const isString = (val: unknown): val is string => typeof val === "string";

export function useExerciseFilterOptions(): FilterOption[] {
  const exercises = useExerciseStore((s) => s.exercises);

  return useMemo(() => {
    if (!exercises?.length) return [];

    return [
      {
        key: "force",
        values: Array.from(new Set(exercises.map((e) => e.force).filter(isString))),
        icon: FiZap,
      },
      {
        key: "mechanic",
        values: Array.from(new Set(exercises.map((e) => e.mechanic).filter(isString))),
        icon: FiSettings,
      },
      {
        key: "equipment",
        values: Array.from(new Set(exercises.map((e) => e.equipment).filter(isString))),
        icon: FiBox,
      },
      {
        key: "category",
        values: Array.from(new Set(exercises.map((e) => e.category).filter(isString))),
        icon: FiLayers,
      },
      {
        key: "primaryMuscle",
        values: Array.from(new Set(exercises.flatMap((e) => e.primaryMuscles ?? []).filter(isString))),
        icon: FiTarget,
      },
      {
        key: "secondaryMuscle",
        values: Array.from(new Set(exercises.flatMap((e) => e.secondaryMuscles ?? []).filter(isString))),
        icon: FiShuffle,
      },
    ];
  }, [exercises]);
}
