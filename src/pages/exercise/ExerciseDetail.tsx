import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExercise } from "../../hooks/useExerciseStore";
import { GiCogsplosion, GiMuscleUp, GiProgression, GiWeight, GiWeightCrush } from "react-icons/gi";
import { RiBarChart2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import ScrollTopButton from "../../components/common/ScrollTopButton";

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { exercises, loading } = useExercise();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // ----------------------
  // Hooks must always be at top
  // ----------------------
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-rose-50">
        <p className="text-xl text-red-400 animate-pulse">Loading...</p>
      </div>
    );
  }

  const exercise = exercises.find((e) => e.id === id);

  if (!exercise) {
    return (
      <div className="flex justify-center items-center h-screen bg-rose-50">
        <p className="text-xl text-red-500 font-semibold">404 ERROR: Exercise not found.</p>
      </div>
    );
  }

  const images = exercise.images || [];

  // ----------------------
  // Slider Handlers
  // ----------------------
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100">
      {/* Image Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-screen h-80 sm:h-96 md:h-[500px] mb-6 overflow-hidden shadow-2xl"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-rose-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-2xl transition-transform"
            >
              &#8592;
            </motion.button>
            <motion.button
              onClick={nextImage}
              whileHover={{ scale: 1.15 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-rose-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-2xl transition-transform"
            >
              &#8594;
            </motion.button>
          </>
        )}
      </motion.div>

      <div className="px-4 sm:px-8 md:px-12 pb-5">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="mb-6 px-5 py-3 bg-rose-200 text-rose-700 font-semibold rounded-full hover:bg-rose-300 transition-shadow shadow-md hover:shadow-xl"
          >
            ← Back
          </button>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-rose-700 mb-3 drop-shadow-lg tracking-tight">
            {exercise.name}
          </h1>
          <p className="text-gray-700 sm:text-lg md:text-xl tracking-wide">
            {exercise.category} • {exercise.level}
          </p>
        </motion.header>

        {/* Instructions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm p-4 sm:p-8 rounded-3xl shadow-xl text-gray-800 font-semibold mb-12 w-full max-w-3xl mx-auto hover:shadow-2xl transition-shadow"
        >
          <p className="flex items-center gap-2 sm:gap-3 text-xl sm:text-3xl text-rose-700 font-bold mb-3 sm:mb-5 justify-center">
            <GiWeightCrush /> Instructions
          </p>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-center sm:text-left text-sm sm:text-base">
            {exercise.instructions}
          </p>
        </motion.section>

        {/* Info + Muscles Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 w-full max-w-5xl mx-auto"
        >
          {[
            {
              label: "Category",
              value: exercise.category,
              icon: <RiBarChart2Fill className="text-rose-600 text-3xl sm:text-4xl mx-auto" />,
              bg: "bg-rose-50",
            },
            {
              label: "Equipment",
              value: exercise.equipment,
              icon: <GiWeight className="text-rose-600 text-3xl sm:text-4xl mx-auto" />,
              bg: "bg-rose-200",
            },
            {
              label: "Level",
              value: exercise.level,
              icon: <GiProgression className="text-rose-600 text-3xl sm:text-4xl mx-auto" />,
              bg: "bg-rose-50",
            },
            {
              label: "Mechanic",
              value: exercise.mechanic,
              icon: <GiCogsplosion className="text-rose-600 text-3xl sm:text-4xl mx-auto" />,
              bg: "bg-rose-200",
            },
            {
              label: "Primary Muscles",
              value: exercise.primaryMuscles,
              icon: <GiMuscleUp className="text-rose-600 text-3xl sm:text-4xl mx-auto" />,
              bg: "bg-rose-50",
            },
            {
              label: "Secondary Muscles",
              value: exercise.secondaryMuscles || "None",
              icon: <GiMuscleUp className="text-rose-600 text-3xl sm:text-4xl mx-auto" />,
              bg: "bg-rose-200",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.03 }}
              className={`${item.bg} p-3 sm:p-5 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl flex flex-col items-center gap-2 sm:gap-3 text-center transition-transform`}
            >
              {item.icon}
              <span className="text-xs sm:text-sm font-semibold text-gray-500">{item.label}</span>
              <span className="text-sm sm:text-base font-bold text-gray-800">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ScrollTopButton />
    </div>
  );
};

export default ExerciseDetail;
