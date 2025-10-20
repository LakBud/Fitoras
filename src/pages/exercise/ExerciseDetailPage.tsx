import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollTopButton from "../../components/common/ScrollTopButton";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import NavigateBackButton from "../../components/common/NavigateBackButton";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { type Exercises } from "@/types/exercise";
import ExerciseImageSlider from "@/components/exerciseDetail/details/slider/ExerciseImageSlider";
import { ExerciseTabs } from "@/components/exerciseDetail/cards/ExerciseTabs";
import { buildInfoItems, buildMuscleItems } from "@/lib/exerciseDetail/exerciseItems";
import { ExerciseInstructions } from "@/components/exerciseDetail/details/ExerciseInstructions";
import { ExerciseHeader } from "@/components/exerciseDetail/details/ExerciseHeader";
import { parseInstructions } from "@/lib/exerciseDetail/parseInstructions";

const ExerciseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { exercises, loading } = useExerciseStore();
  const { isDesktop, isMobile } = useBreakpoint(830);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const exercise = useMemo(() => exercises.find((e: Exercises) => e.id === id), [exercises, id]) as Exercises | undefined;
  const infoItems = useMemo(() => buildInfoItems(exercise), [exercise]);
  const muscleItems = useMemo(() => buildMuscleItems(exercise), [exercise]);

  const instructions = useMemo(() => parseInstructions(exercise), [exercise]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-rose-300 border-t-rose-600 rounded-full mb-4"
        />
        <p className="text-lg text-rose-600 font-semibold">Loading exercise...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-200 flex items-center justify-center">
            <span className="text-4xl">🏋️</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-rose-700">Exercise Not Found</h2>
          <p className="text-rose-600/80 text-base sm:text-lg">
            The exercise you're looking for doesn't exist or may have been removed.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 relative pb-20">
      {/* Image Slider */}
      <ExerciseImageSlider
        images={exercise.images || []}
        exerciseName={exercise.name}
        isDesktop={isDesktop}
        isMobile={isMobile}
      />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <ExerciseHeader exercise={exercise} />

        <ExerciseInstructions instructions={instructions} />

        <ExerciseTabs infoItems={infoItems} muscleItems={muscleItems} />
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-8 left-6 z-50">
        <NavigateBackButton />
      </div>
      <div className="fixed bottom-8 right-6 z-50">
        <ScrollTopButton />
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
