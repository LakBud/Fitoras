export const slideVariants = {
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

export const sliderTransitionConfig = {
  x: { type: "spring" as const, stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

export const getSliderMaxHeight = (isDesktop: boolean, isMobile: boolean): string => {
  return isDesktop ? "80vh" : isMobile ? "50vh" : "60vh";
};
