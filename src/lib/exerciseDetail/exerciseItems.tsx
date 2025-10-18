import { RiBarChart2Fill } from "react-icons/ri";
import { GiWeight, GiProgression, GiCogsplosion, GiMuscleUp, GiMuscleFat } from "react-icons/gi";
import type { Exercises } from "@/types/exercise";

export function buildInfoItems(exercise?: Exercises) {
  return [
    {
      label: "Category",
      value: exercise?.category,
      icon: <RiBarChart2Fill className="text-rose-600 text-3xl sm:text-4xl" />,
    },
    {
      label: "Equipment",
      value: exercise?.equipment,
      icon: <GiWeight className="text-rose-600 text-3xl sm:text-4xl" />,
    },
    {
      label: "Level",
      value: exercise?.level,
      icon: <GiProgression className="text-rose-600 text-3xl sm:text-4xl" />,
    },
    {
      label: "Mechanic",
      value: exercise?.mechanic,
      icon: <GiCogsplosion className="text-rose-600 text-3xl sm:text-4xl" />,
    },
  ];
}

export function buildMuscleItems(exercise?: Exercises) {
  return [
    {
      label: "Primary Muscles",
      value: exercise?.primaryMuscles || [],
      icon: <GiMuscleUp className="text-white text-3xl sm:text-4xl" />,
    },
    {
      label: "Secondary Muscles",
      value: exercise?.secondaryMuscles || [],
      icon: <GiMuscleFat className="text-white text-3xl sm:text-4xl" />,
    },
  ];
}
