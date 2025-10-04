import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiCogsplosion, GiMuscleFat, GiMuscleUp, GiProgression, GiWeight, GiWeightCrush } from "react-icons/gi";
import { RiBarChart2Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import ScrollTopButton from "../../components/common/ScrollTopButton";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import NavigateBackButton from "../../components/common/NavigateBackButton";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";

const ExerciseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { exercises, loading } = useExerciseStore();
  const { isDesktop, isMobile } = useBreakpoint(830);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "muscles">("info");

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

  const exercise = exercises.find((e) => e.id === id);

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

  const images = exercise.images || [];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextImage();
    else if (diff < -50) prevImage();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 relative pb-20">
      {/* Image Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full mb-8 flex justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {images.length ? (
            <motion.div key={currentImage} className="relative w-full flex justify-center" layout>
              {/* Image */}
              <motion.img
                src={`/data/exercises/${images[currentImage]}`}
                alt={exercise.name}
                className={`${isDesktop ? "mx-auto rounded-2xl object-contain" : "w-full h-full object-cover"}`}
                style={{
                  maxHeight: isDesktop ? "80vh" : isMobile ? "50vh" : "60vh",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {currentImage + 1} / {images.length}
                </div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <motion.button
                    onClick={prevImage}
                    whileHover={{ scale: 1.1, x: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-rose-600 rounded-full p-3 sm:p-4 shadow-lg hover:bg-white transition-all"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={nextImage}
                    whileHover={{ scale: 1.1, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-rose-600 rounded-full p-3 sm:p-4 shadow-lg hover:bg-white transition-all"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </>
              )}

              {/* Image Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`transition-all rounded-full ${
                        idx === currentImage ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                      } h-2`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center w-full h-60 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <p className="text-gray-400 font-medium">No Image Available</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header with Badges */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl mb-10 border border-white/50"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <GiWeightCrush className="text-rose-600 text-3xl sm:text-4xl" />
            <h2 className="text-2xl sm:text-3xl text-rose-700 font-bold">How To Perform</h2>
          </div>

          {exercise.instructions ? (
            <ol className="space-y-3 text-gray-700 leading-relaxed text-sm sm:text-base">
              {typeof exercise.instructions === "string"
                ? exercise.instructions.split("\n").map((step, i) => {
                    const formattedStep = step.trim().replace(/\.(\S)/g, ". $1");
                    return (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex gap-3"
                      >
                        <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </span>
                        <span className="pt-1">{formattedStep}</span>
                      </motion.li>
                    );
                  })
                : Object.values(exercise.instructions)
                    .map((step) =>
                      String(step)
                        .trim()
                        .replace(/\.(\S)/g, ". $1")
                    )
                    .filter(Boolean)
                    .map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          {/* Tab Buttons */}
          <div className="flex justify-center mb-8">
            <div className="relative inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg">
              {["info", "muscles"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "info" | "muscles")}
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
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {activeTab === "info" &&
                [
                  {
                    label: "Category",
                    value: exercise.category,
                    icon: <RiBarChart2Fill className="text-rose-600 text-3xl sm:text-4xl" />,
                  },
                  {
                    label: "Equipment",
                    value: exercise.equipment,
                    icon: <GiWeight className="text-rose-600 text-3xl sm:text-4xl" />,
                  },
                  {
                    label: "Level",
                    value: exercise.level,
                    icon: <GiProgression className="text-rose-600 text-3xl sm:text-4xl" />,
                  },
                  {
                    label: "Mechanic",
                    value: exercise.mechanic,
                    icon: <GiCogsplosion className="text-rose-600 text-3xl sm:text-4xl" />,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 flex flex-col items-center gap-3 text-center"
                  >
                    <div className="p-3 bg-rose-50 rounded-xl">{item.icon}</div>
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-gray-800 text-base sm:text-lg font-bold">
                        {item.value ? item.value.charAt(0).toUpperCase() + item.value.slice(1) : "Not specified"}
                      </p>
                    </div>
                  </motion.div>
                ))}

              {activeTab === "muscles" &&
                [
                  {
                    label: "Primary Muscles",
                    value: exercise.primaryMuscles || [],
                    icon: <GiMuscleUp className="text-white text-3xl sm:text-4xl" />,
                  },
                  {
                    label: "Secondary Muscles",
                    value: exercise.secondaryMuscles || [],
                    icon: <GiMuscleFat className="text-white text-3xl sm:text-4xl" />,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-gradient-to-br from-rose-500 to-rose-600 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 text-center sm:col-span-2 lg:col-span-2"
                  >
                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">{item.icon}</div>
                    <div>
                      <p className="text-white text-sm sm:text-base font-bold uppercase tracking-wide mb-3">{item.label}</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {item.value.length === 0 ? (
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                            None specified
                          </span>
                        ) : (
                          item.value.map((muscle: string, i: number) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.05 }}
                              className="px-3 py-1.5 bg-white/25 backdrop-blur-sm text-white rounded-full text-sm font-semibold"
                            >
                              {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                            </motion.span>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
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
