import React, { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ImageSliderProps {
  images: string[];
  exerciseName: string;
  isDesktop: boolean;
  isMobile: boolean;
}

const ExerciseImageSlider = memo<ImageSliderProps>(({ images, exerciseName, isDesktop, isMobile }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  // Preload adjacent images for smoother transitions
  useEffect(() => {
    if (images.length > 1) {
      const nextIdx = (currentImage + 1) % images.length;
      const prevIdx = (currentImage - 1 + images.length) % images.length;

      [nextIdx, prevIdx].forEach((idx) => {
        const img = new Image();
        img.src = `/data/exercises/${images[idx]}`;
      });
    }
  }, [currentImage, images]);

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStart === null || touchEnd === null) return;
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) nextImage();
      else prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, nextImage, prevImage]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  if (!images.length) {
    return (
      <div className="flex items-center justify-center w-full h-60 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-4">
        <div className="text-center">
          <p className="text-gray-400 font-medium">No Image Available</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full mb-8 flex justify-center px-4"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full max-w-6xl bg-rose-200 rounded-b-2xl">
        <div
          className="relative overflow-hidden rounded-b-2xl"
          style={{
            maxHeight: isDesktop ? "80vh" : isMobile ? "50vh" : "60vh",
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={currentImage}
              src={`/data/exercises/${images[currentImage]}`}
              alt={exerciseName}
              className="w-full h-full object-contain"
              style={{
                maxHeight: isDesktop ? "80vh" : isMobile ? "50vh" : "60vh",
              }}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            />
          </AnimatePresence>

          {/* Image Counter */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20"
            >
              {currentImage + 1} / {images.length}
            </motion.div>
          )}

          {/* Navigation Arrows - Always inside image container */}
          {images.length > 1 && (
            <>
              <motion.button
                onClick={prevImage}
                whileHover={{ scale: 1.1, x: -4 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm text-rose-600 rounded-full p-3 sm:p-4 shadow-xl hover:bg-white hover:shadow-2xl transition-all z-20"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                onClick={nextImage}
                whileHover={{ scale: 1.1, x: 4 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm text-rose-600 rounded-full p-3 sm:p-4 shadow-xl hover:bg-white hover:shadow-2xl transition-all z-20"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </>
          )}

          {/* Image Dots */}
          {images.length > 1 && images.length <= 8 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentImage ? 1 : -1);
                    setCurrentImage(idx);
                  }}
                  className={`transition-all rounded-full ${
                    idx === currentImage ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  } h-2`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default ExerciseImageSlider;
