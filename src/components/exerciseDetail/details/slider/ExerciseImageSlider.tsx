import { memo, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useImageSlider } from "@/hooks/exercise/useImageSlider";
import { slideVariants, getSliderMaxHeight, sliderTransitionConfig } from "@/lib/exerciseDetail/sliderHelpers";
import SliderNavigationButton from "./SliderNavigationButton";

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
      <div className="relative w-full max-w-7xl bg-rose-200 rounded-b-2xl">
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
              <SliderNavigationButton onClick={prevImage} direction="left" label="Previous image" />
              <SliderNavigationButton onClick={nextImage} direction="right" label="Next image" />
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

ExerciseImageSlider.displayName = "ExerciseImageSlider";

export default ExerciseImageSlider;
