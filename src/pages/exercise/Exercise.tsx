import { ExerciseList } from "../../components/exercise/ExerciseList";
import ExerciseFilter from "../../components/exercise/ExerciseFilter";
import { useState, useEffect } from "react";
import { useExercise } from "../../hooks/useExerciseStore";
import type { Exercises } from "../../types/exercise";
import ScrollTopButton from "../../components/common/ScrollTopButton";

const Exercise = () => {
  const { exercises, loading } = useExercise();
  const [filteredExercises, setFilteredExercises] = useState<Exercises[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Only initialize filteredExercises once
  useEffect(() => {
    if (loading || initialized) return;
    setFilteredExercises(exercises);
    setInitialized(true);
  }, [exercises, loading]);

  useEffect(() => {
    if (!loading) setFilteredExercises(exercises);
  }, [exercises, loading]);

  return (
    <>
      {/* Sticky Filter */}
      <ExerciseFilter exercises={exercises} setFilteredExercises={setFilteredExercises} />
      <div className="relative bg-gradient-to-b from-red-50 via-rose-50 to-rose-100 min-h-screen pt-[50px] pb-24 md:pt-[50px] px-4 sm:px-6 lg:px-12">
        {/* Page Header */}
        <header className="flex flex-col items-center mb-8 mt-15 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700 tracking-tight">Exercises</h1>
          <p className="mt-3 text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Explore a curated collection of exercises. Click any card to see primary muscles, category, instructions, and other
            details.
          </p>
        </header>

        {/* Exercise List Container */}
        <main className="grid gap-6 sm:gap-8 md:gap-10">
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 border border-rose-200">
            <ExerciseList exercises={filteredExercises} />
          </div>
        </main>

        <ScrollTopButton />
      </div>
    </>
  );
};

export default Exercise;
