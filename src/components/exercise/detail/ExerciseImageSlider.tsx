import { memo, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useImageSlider } from "@/hooks/exercise/useImageSlider";
import { slideVariants, getSliderMaxHeight, sliderTransitionConfig } from "@/lib/sliderHelpers";
interface ImageSliderProps {
  images: string[];
  exerciseName: string;
  isDesktop: boolean;
  isMobile: boolean;
}

const ExerciseImageSlider = memo<ImageSliderProps>(({ images, exerciseName, isDesktop, isMobile }) => {
  const { currentImage, direction, nextImage, prevImage, goToImage, currentImageSrc, touchHandlers } = useImageSlider({
    imagesCount: images.length,
    images,
  });

  const hasMultipleImages = images.length > 1;
  const showDots = hasMultipleImages && images.length <= 8;
  const maxHeight = useMemo(() => getSliderMaxHeight(isDesktop, isMobile), [isDesktop, isMobile]);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center w-full h-60 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-4">
        <p className="text-gray-400 font-medium">No Image Available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full mb-8 flex justify-center px-4"
      {...touchHandlers}
    >
      <div className="relative w-full max-w-6xl bg-rose-200 rounded-b-2xl">
        <div className="relative overflow-hidden rounded-b-2xl" style={{ maxHeight }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={currentImage}
              src={currentImageSrc}
              alt={`${exerciseName} - Image ${currentImage + 1}`}
              className="w-full h-full object-contain"
              style={{ maxHeight }}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={sliderTransitionConfig}
              loading="eager"
            />
          </AnimatePresence>

          {/* Image Counter */}
          {hasMultipleImages && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20"
            >
              {currentImage + 1} / {images.length}
            </motion.div>
          )}

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <NavigationButton onClick={prevImage} direction="left" label="Previous image" />
              <NavigationButton onClick={nextImage} direction="right" label="Next image" />
            </>
          )}

          {/* Image Dots */}
          {showDots && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToImage(idx)}
                  className={`transition-all rounded-full ${
                    idx === currentImage ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  } h-2`}
                  aria-label={`Go to image ${idx + 1}`}
                  aria-current={idx === currentImage}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

const NavigationButton = memo<{
  onClick: () => void;
  direction: "left" | "right";
  label: string;
}>(({ onClick, direction, label }) => {
  const isLeft = direction === "left";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, x: isLeft ? -4 : 4 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute ${
        isLeft ? "left-2 sm:left-4" : "right-2 sm:right-4"
      } top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm text-rose-600 rounded-full p-3 sm:p-4 shadow-xl hover:bg-white hover:shadow-2xl transition-all z-20`}
      aria-label={label}
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
      </svg>
    </motion.button>
  );
});

NavigationButton.displayName = "NavigationButton";
ExerciseImageSlider.displayName = "ExerciseImageSlider";

export default ExerciseImageSlider;
