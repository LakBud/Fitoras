import { useThemeStore } from "@/stores/useThemeStore";

/**
 * Returns a theme object based on a base color.
 * Now uses Zustand store for consistent state management across components.
 *
 * @param baseColor - Primary color (e.g., from current split)
 * @param fallbackColor - Fallback if no baseColor or persisted color
 */
export function useThemeColor(baseColor?: string, fallbackColor?: string) {
  const getThemeColors = useThemeStore((state) => state.getThemeColors);
  const isInitialized = useThemeStore((state) => state.initialized);

  return {
    ...getThemeColors(baseColor, fallbackColor),
    isInitialized,
  };
}
