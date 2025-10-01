import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useExercise } from "../../hooks/useExercise";
import { GiCogsplosion, GiMuscleFat, GiMuscleUp, GiProgression, GiWeight, GiWeightCrush } from "react-icons/gi";
import { RiBarChart2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import ScrollTopButton from "../../components/common/ScrollTopButton";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import NavigateBackButton from "../../components/common/NavigateBackButton";

const ExerciseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { exercises, loading } = useExercise();
  const { isDesktop, isMobile } = useBreakpoint();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "muscles">("info");

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-rose-50">
        <p className="text-xl text-red-400 animate-pulse">Loading...</p>
      </div>
    );

  const exercise = exercises.find((e) => e.id === id);

  if (!exercise)
    return (
      <div className="flex justify-center items-center h-screen bg-rose-50">
        <p className="text-xl text-red-500 font-semibold">404 ERROR: Exercise not found.</p>
      </div>
    );

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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 relative">
      {/* Image Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative w-full mb-6 overflow-hidden shadow-2xl ${isDesktop ? "h-[600px]" : isMobile ? "h-72" : "h-96"}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.length ? (
          <motion.img
            key={currentImage}
            src={`/data/exercises/${images[currentImage]}`}
            alt={exercise.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white text-gray-400 rounded-3xl">No Image</div>
        )}

        {images.length > 1 && (
          <>
            <motion.button
              onClick={prevImage}
              whileHover={{ scale: 1.15 }}
              className={`absolute left-4 top-1/2 -translate-y-1/2 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-transform ${
                isDesktop ? "w-16 h-16" : isMobile ? "w-10 h-10" : "w-14 h-14"
              }`}
            >
              &#8592;
            </motion.button>
            <motion.button
              onClick={nextImage}
              whileHover={{ scale: 1.15 }}
              className={`absolute right-4 top-1/2 -translate-y-1/2 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-transform ${
                isDesktop ? "w-16 h-16" : isMobile ? "w-10 h-10" : "w-14 h-14"
              }`}
            >
              &#8594;
            </motion.button>
          </>
        )}
      </motion.div>

      <div className="px-4 sm:px-8 md:px-12 pb-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 mt-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-rose-700 mb-3 drop-shadow-lg tracking-tight">
            {exercise.name || "Unknown"}
          </h1>
          <p className="text-gray-700 sm:text-lg md:text-xl tracking-wide">
            {exercise.category ? exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1) : "Unknown"} •{" "}
            {exercise.level ? exercise.level.charAt(0).toUpperCase() + exercise.level.slice(1) : "Unknown"}
          </p>
        </motion.header>

        {/* Instructions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-md mb-12"
        >
          <p className="flex items-center gap-2 sm:gap-3 text-xl sm:text-3xl text-rose-700 font-bold mb-4 justify-center">
            <GiWeightCrush /> Instructions
          </p>

          {exercise.instructions ? (
            <ol className="list-decimal list-inside text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {typeof exercise.instructions === "string"
                ? exercise.instructions.split("\n").map((step, i) => <li key={i}>{step.trim()}</li>)
                : Object.values(exercise.instructions)
                    .map((step) => String(step).trim())
                    .filter(Boolean)
                    .map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          ) : (
            <p className="text-gray-700 text-center sm:text-left text-sm sm:text-base">No instructions available.</p>
          )}
        </motion.section>

        {/* Tab Slider */}
        <div className="mb-12">
          {/* Tabs */}
          <div className="relative flex w-full max-w-xs mx-auto bg-gray-100 rounded-full p-1 mb-6">
            {["info", "muscles"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "info" | "muscles")}
                className={`relative z-10 flex-1 px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-colors ${
                  activeTab === tab ? "text-white" : "text-gray-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tabSlider"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 bg-rose-600 rounded-full z-[-1]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Animated Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-4 justify-items-center sm:grid-cols-2 "
          >
            {activeTab === "info" &&
              [
                {
                  label: "Category",
                  value: exercise.category,
                  icon: <RiBarChart2Fill className="text-rose-600 text-2xl sm:text-3xl" />,
                },
                {
                  label: "Equipment",
                  value: exercise.equipment,
                  icon: <GiWeight className="text-rose-600 text-2xl sm:text-3xl" />,
                },
                { label: "Level", value: exercise.level, icon: <GiProgression className="text-rose-600 text-2xl sm:text-3xl" /> },
                {
                  label: "Mechanic",
                  value: exercise.mechanic,
                  icon: <GiCogsplosion className="text-rose-600 text-2xl sm:text-3xl" />,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-3 sm:p-4 rounded-xl shadow-sm flex flex-col items-center gap-2 transition-transform w-full max-w-[180px] text-center"
                >
                  {item.icon}
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">{item.label}</p>
                    <p className="text-gray-800 text-sm sm:text-base font-semibold">
                      {item.value ? item.value.charAt(0).toUpperCase() + item.value.slice(1) : "None"}
                    </p>
                  </div>
                </motion.div>
              ))}

            {activeTab === "muscles" &&
              [
                {
                  label: "Primary Muscles",
                  value: exercise.primaryMuscles,
                  icon: <GiMuscleUp className="text-white text-2xl sm:text-3xl" />,
                },
                {
                  label: "Secondary Muscles",
                  value: exercise.secondaryMuscles || ["None"],
                  icon: <GiMuscleFat className="text-white text-2xl sm:text-3xl" />,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  className="bg-rose-500 p-3 sm:p-4 rounded-xl shadow-sm flex flex-col items-center gap-1 transition-transform w-full max-w-[250px] text-center"
                >
                  {item.icon}
                  <div>
                    <p className="text-white text-sm sm:text-base font-semibold">{item.label}</p>
                    <p className="text-white font-bold break-words">
                      {item.value.length === 0
                        ? "None"
                        : item.value.map((muscle: string, i: number) => (
                            <span key={i}>
                              {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                              {i < item.value.length - 1 ? ", " : ""}
                            </span>
                          ))}
                    </p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>

      {/* Back Button & ScrollTop */}
      <nav>
        <NavigateBackButton />
        <ScrollTopButton />
      </nav>
    </div>
  );
};

export default ExerciseDetailPage;
