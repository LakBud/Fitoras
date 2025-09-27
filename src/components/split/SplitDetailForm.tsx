import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useSplitsStore } from "../../stores/useSplitStore";
import { useExerciseStore } from "../../stores/useExerciseStore";
import { useFilterStore } from "../../stores/useFilterStore";
import { useExercise } from "../../hooks/useExercise";
import ExerciseFilter from "../exercise/ExerciseFilter";
import type { Weekday, WorkoutDay, SplitExercise, WorkoutCategory } from "../../types/splits";
import type { Exercises } from "../../types/exercise";

const SplitDetailForm = () => {
  const { id } = useParams<{ id: string }>();
  const { exercises, loading } = useExercise();
  const { setExercises } = useExerciseStore();
  const { filteredExercises } = useFilterStore();
  const { splits, updateSplit } = useSplitsStore();

  const split = splits.find((s) => s.id === id);
  const [selectedDay, setSelectedDay] = useState<Weekday>(split?.days[0]?.day || "Monday");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    setExercises(exercises);
  }, [exercises, setExercises]);

  if (!split) return <div>Split not found.</div>;
  if (loading) return <div>Loading exercises...</div>;

  const currentDay: WorkoutDay | undefined = split.days.find((d) => d.day === selectedDay);
  if (!currentDay) return null;

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory: WorkoutCategory = { id: uuidv4(), name: newCategoryName, exercises: [] };
    const updatedDays = split.days.map((d) =>
      d.day === selectedDay ? { ...d, categories: [...(d.categories ?? []), newCategory] } : d
    );
    updateSplit(split.id, { days: updatedDays });
    setNewCategoryName("");
    setSelectedCategoryId(newCategory.id);
  };

  const handleAddExercise = (exercise: Exercises) => {
    const newEx: SplitExercise = { ...exercise, sets: 3, reps: 10 };
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
    const updatedDays = split.days.map((d) => {
      if (d.day !== selectedDay) return d;
      if (categoryId) {
        const updatedCategories = (d.categories ?? []).map((cat) =>
          cat.id === categoryId ? { ...cat, exercises: cat.exercises.filter((ex) => ex.id !== exerciseId) } : cat
        );
        return { ...d, categories: updatedCategories };
      }
      return { ...d, exercises: d.exercises.filter((ex) => ex.id !== exerciseId) };
    });
    updateSplit(split.id, { days: updatedDays });
  };

  const handleChangeSetsReps = (exerciseId: string, field: "sets" | "reps", value: number, categoryId?: string) => {
    const updatedDays = split.days.map((d) => {
      if (d.day !== selectedDay) return d;
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
      return {
        ...d,
        exercises: d.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, [field]: value } : ex)),
      };
    });
    updateSplit(split.id, { days: updatedDays });
  };

  const displayedExercises: SplitExercise[] | undefined = selectedCategoryId
    ? currentDay.categories?.find((cat) => cat.id === selectedCategoryId)?.exercises
    : currentDay.exercises;

  const exercisesToShow: Exercises[] = filteredExercises.length ? filteredExercises : exercises;

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{split.name}</h2>

      {/* Day Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {split.days.map((d) => (
          <button
            key={d.day}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
              d.day === selectedDay ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => {
              setSelectedDay(d.day);
              setSelectedCategoryId(null);
            }}
          >
            {d.day}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700">Categories</h4>
        <div className="flex gap-2 flex-wrap">
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedCategoryId === null ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedCategoryId(null)}
          >
            None
          </button>
          {(currentDay.categories ?? []).map((cat) => (
            <button
              key={cat.id}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                selectedCategoryId === cat.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category..."
            className="border rounded px-3 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={addCategory}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Exercise Filter */}
      <ExerciseFilter />

      {/* Exercises in the day/category */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700">{selectedCategoryId ? "Exercises in category" : "Exercises in day"}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedExercises?.map((ex) => (
            <div
              key={ex.id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center border border-gray-200 transition-all hover:shadow-lg hover:scale-105"
            >
              {ex.images?.[0] ? (
                <img
                  src={`/data/exercises/${ex.images[0]}`}
                  alt={ex.name}
                  className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-xl mb-3"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-36 sm:h-40 md:h-44 bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}

              <h5 className="text-base sm:text-lg md:text-xl font-semibold text-red-600 text-center break-words mb-1">
                {ex.name}
              </h5>

              {/* Select inputs for sets and reps */}
              <div className="flex gap-1 items-center justify-center w-full">
                <input
                  type="number"
                  value={ex.sets ?? 3}
                  min={1}
                  onChange={(e) => handleChangeSetsReps(ex.id, "sets", Number(e.target.value), selectedCategoryId || undefined)}
                  className="w-14 border rounded px-1 text-center"
                />
                <span className="text-gray-500">x</span>
                <input
                  type="number"
                  value={ex.reps ?? 10}
                  min={1}
                  onChange={(e) => handleChangeSetsReps(ex.id, "reps", Number(e.target.value), selectedCategoryId || undefined)}
                  className="w-14 border rounded px-1 text-center"
                />
                <button
                  className="text-red-500 hover:underline text-sm"
                  onClick={() => handleRemoveExercise(ex.id, selectedCategoryId || undefined)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercises to add */}
      <div className="max-h-64 overflow-y-auto border rounded p-2 mt-2 space-y-1">
        {exercisesToShow.map((ex) => (
          <button
            key={ex.id}
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-100 transition"
            onClick={() => handleAddExercise(ex)}
          >
            {ex.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SplitDetailForm;
