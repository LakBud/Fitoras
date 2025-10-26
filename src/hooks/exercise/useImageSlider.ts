import { useCallback, useEffect, useState } from "react";

interface UseImageSliderProps {
  imagesCount: number;
  images: string[];
  basePath?: string;
}

interface UseImageSliderReturn {
  currentImage: number;
  direction: number;
  nextImage: () => void;
  prevImage: () => void;
  goToImage: (idx: number) => void;
  currentImageSrc: string;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

const MIN_SWIPE_DISTANCE = 50;

export const useImageSlider = ({
  imagesCount,
  images,
  basePath = "/data/exercises",
}: UseImageSliderProps): UseImageSliderReturn => {
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // +1 = forward, -1 = backward

  // Preload NEXT and PREV images to avoid flash+delay
  useEffect(() => {
    if (imagesCount <= 1) return;

    const nextIdx = (currentImage + 1) % imagesCount;
    const prevIdx = (currentImage - 1 + imagesCount) % imagesCount;

    const preloadImage = (idx: number) => {
      const img = new Image();
      img.src = `${basePath}/${images[idx]}`;
    };

    preloadImage(nextIdx);
    preloadImage(prevIdx);
  }, [currentImage, images, imagesCount, basePath]);

  // Move forward cyclically
  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % imagesCount);
  }, [imagesCount]);

  // Move backward cyclically
  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + imagesCount) % imagesCount);
  }, [imagesCount]);

  // Jump to a specific index with direction inferred for animation
  const goToImage = useCallback(
    (idx: number) => {
      setDirection(idx > currentImage ? 1 : -1);
      setCurrentImage(idx);
    },
    [currentImage]
  );

  // Touch swipe handlers --------------------------------

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStart === null || touchEnd === null) return;

    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > MIN_SWIPE_DISTANCE) {
      diff > 0 ? nextImage() : prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, nextImage, prevImage]);

  // Computed current image path
  const currentImageSrc = `${basePath}/${images[currentImage]}`;

  return {
    currentImage,
    direction,
    nextImage,
    prevImage,
    goToImage,
    currentImageSrc,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};
