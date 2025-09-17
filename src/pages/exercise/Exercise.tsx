import { ExerciseList } from "../../components/exercise/ExerciseList";
import ExerciseFilter from "../../components/exercise/ExerciseFilter";
import { useState, useEffect } from "react";
import { useExercise } from "../../hooks/useExercise";
import type { Exercises } from "../../types/exercise";

const Exercise = () => {
  const { exercises, loading } = useExercise();
  const [filteredExercises, setFilteredExercises] = useState<Exercises[]>(exercises);

  useEffect(() => {
    if (!loading) setFilteredExercises(exercises);
  }, [exercises, loading]);

  return (
    <>
      {/* Page Content */}
      <div className="relative bg-gradient-to-b from-red-50 via-rose-50 to-rose-100 min-h-screen pt-[200px] pb-24 md:pt-[200px] px-4 sm:px-6 lg:px-12">
        {/* Page Header */}
        <header className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700 tracking-tight">Exercises</h1>
          <p className="mt-3 text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Explore a curated collection of exercises. Click any card to see primary muscles, category, instructions, and other
            details.
          </p>
        </header>

        {/* Sticky Filter */}
        <ExerciseFilter exercises={exercises} setFilteredExercises={setFilteredExercises} />

        {/* Exercise List Container */}
        <main className="grid gap-6 sm:gap-8 md:gap-10">
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 border border-rose-200">
            <ExerciseList exercises={filteredExercises} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Exercise;
