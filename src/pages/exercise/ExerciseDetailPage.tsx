import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { GiCogsplosion, GiMuscleFat, GiMuscleUp, GiProgression, GiWeight, GiWeightCrush } from "react-icons/gi";
import { RiBarChart2Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import ScrollTopButton from "../../components/common/ScrollTopButton";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import NavigateBackButton from "../../components/common/NavigateBackButton";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { type Exercises } from "@/types/exercise";
import ExerciseImageSlider from "@/components/exercise/ExerciseImageSlider";
import InfoCard from "@/components/exercise/InfoCards";
import MuscleCard from "@/components/exercise/MuscleCards";

const ExerciseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { exercises, loading } = useExerciseStore();
  const { isDesktop, isMobile } = useBreakpoint(830);
  const [activeTab, setActiveTab] = useState<"info" | "muscles">("info");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const exercise = useMemo(() => exercises.find((e: Exercises) => e.id === id), [exercises, id]) as Exercises | undefined;

  const infoItems = useMemo(
    () => [
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
    ],
    [exercise]
  );

  const muscleItems = useMemo(
    () => [
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
    ],
    [exercise]
  );

  const instructions = useMemo(() => {
    if (!exercise?.instructions) return [];

    if (typeof exercise.instructions === "string") {
      return exercise.instructions
        .split("\n")
        .map((step) => step.trim().replace(/\.(\S)/g, ". $1"))
        .filter(Boolean);
    }

    return Object.values(exercise.instructions)
      .map((step) =>
        String(step)
          .trim()
          .replace(/\.(\S)/g, ". $1")
      )
      .filter(Boolean);
  }, [exercise?.instructions]);

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
        {/* Header with Badges */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          {/* Category & Level Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="px-4 py-1.5 bg-rose-500 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md">
              {exercise.category ? exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1) : "Unknown"}
            </span>
            <span className="px-4 py-1.5 bg-rose-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md">
              {exercise.level ? exercise.level.charAt(0).toUpperCase() + exercise.level.slice(1) : "Unknown"}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-rose-700 mb-2 leading-tight"
            style={{ textShadow: "0 4px 20px rgba(225, 29, 72, 0.2)" }}
          >
            {exercise.name || "Unknown Exercise"}
          </h1>
        </motion.header>

        {/* Instructions Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl mb-10 border border-white/50"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <GiWeightCrush className="text-rose-600 text-3xl sm:text-4xl" />
            <h2 className="text-2xl sm:text-3xl text-rose-700 font-bold">How To Perform</h2>
          </div>

          {instructions.length > 0 ? (
            <ol className="space-y-3 text-gray-700 leading-relaxed text-sm sm:text-base">
              {instructions.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="flex gap-3"
                >
                  <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </motion.li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500 text-center italic">No instructions available for this exercise.</p>
          )}
        </motion.section>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          {/* Tab Buttons */}
          <div className="flex justify-center mb-8">
            <div className="relative inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg">
              {(["info", "muscles"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 sm:px-8 py-3 text-sm sm:text-base font-bold rounded-xl transition-colors z-10 ${
                    activeTab === tab ? "text-white" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab === "info" ? "Exercise Info" : "Muscle Groups"}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl shadow-lg -z-10"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {activeTab === "info" && infoItems.map((item, idx) => <InfoCard key={item.label} item={item} idx={idx} />)}

              {activeTab === "muscles" && muscleItems.map((item, idx) => <MuscleCard key={item.label} item={item} idx={idx} />)}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-6 z-50">
        <NavigateBackButton />
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <ScrollTopButton />
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
