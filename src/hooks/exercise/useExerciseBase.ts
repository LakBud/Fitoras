import type { Exercises } from "../../types/exercise";
import type { SplitExercise } from "../../types/splits";
import { useSplitBase } from "../splitControl/useSplitBase";
import { useCategoryBase } from "../splitControl/useCategoryBase";

export function useExerciseBase() {
  const { split, updateSplit, selectedDay, currentDay } = useSplitBase();
  const { selectedCategoryId } = useCategoryBase();

  const handleAddExercise = (exercise: Exercises) => {
    if (!split || !selectedDay) return;

    const currentDayData = split.days.find((d) => d.day === selectedDay);
    if (!currentDayData) return;

    // Prevent duplicate adds (either inside a category or directly in a day)
    const existsInCategory = selectedCategoryId
      ? currentDayData.categories?.find((cat) => cat.id === selectedCategoryId)?.exercises.some((ex) => ex.id === exercise.id)
      : false;

    const existsInDay = !selectedCategoryId ? currentDayData.exercises.some((ex) => ex.id === exercise.id) : false;

    if (existsInCategory || existsInDay) {
      alert("This exercise is already added."); // optional UX toast here instead
      return;
    }

    // Default template for a new added exercise
    const newEx: SplitExercise = { ...exercise, sets: 3, reps: 10 };

    // Inject into category if selected, else into day-level list
    const updatedDays = split.days.map((d) => {
      if (d.day !== selectedDay) return d;
      if (selectedCategoryId) {
        const updatedCategories = (d.categories ?? []).map((cat) =>
          cat.id === selectedCategoryId ? { ...cat, exercises: [...cat.exercises, newEx] } : cat
        );
        return { ...d, categories: updatedCategories };
      }
      return { ...d, exercises: [...d.exercises, newEx] };
    });

    updateSplit(split.id, { days: updatedDays });
  };

  const handleRemoveExercise = (exerciseId: string, categoryId?: string) => {
    if (!split || !selectedDay) return;

    const updatedDays = split.days.map((day) => {
      if (day.day !== selectedDay) return day;

      // Remove inside a category
      if (categoryId) {
        const updatedCategories = (day.categories ?? []).map((cat) =>
          cat.id === categoryId ? { ...cat, exercises: cat.exercises.filter((ex) => ex.id !== exerciseId) } : cat
        );
        return { ...day, categories: updatedCategories };
      }

      // Remove from day-level exercises
      return {
        ...day,
        exercises: day.exercises.filter((ex) => ex.id !== exerciseId),
      };
    });

    updateSplit(split.id, { days: updatedDays });
  };

  const handleChangeSetsReps = (exerciseId: string, field: "sets" | "reps", value: number, categoryId?: string) => {
    if (!split || !selectedDay) return;

    const updatedDays = split.days.map((d) => {
      if (d.day !== selectedDay) return d;

      // Update inside category
      if (categoryId) {
        const updatedCategories = (d.categories ?? []).map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                exercises: cat.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, [field]: value } : ex)),
              }
            : cat
        );
        return { ...d, categories: updatedCategories };
      }

      // Update on day root level
      return {
        ...d,
        exercises: d.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, [field]: value } : ex)),
      };
    });

    updateSplit(split.id, { days: updatedDays });
  };

  // Resolves which list is currently active for UI consumption
  const displayedExercises = selectedCategoryId
    ? currentDay?.categories?.find((cat) => cat.id === selectedCategoryId)?.exercises
    : currentDay?.exercises;

  return {
    displayedExercises,
    handleAddExercise,
    handleRemoveExercise,
    handleChangeSetsReps,
  };
}
