import { darken, lighten, readableColor, rgba } from "polished";

/**
 * Returns a theme object based on a base color.
 * If baseColor is undefined, you can optionally pass a fallbackColor.
 */
export function useThemeColor(baseColor?: string, fallbackColor?: string) {
  // Use baseColor if provided, otherwise fallbackColor, otherwise default red
  const primary = baseColor || fallbackColor || "#be123c";

  const textOnPrimary = readableColor(primary, "#000000", "#ffffff", false);
  const dark = darken(0.1, primary);
  const darker = darken(0.2, primary);
  const light = lighten(0.15, primary);
  const lighter = lighten(0.4, primary);
  const translucent = rgba(primary, 0.1);
  const translucentStrong = rgba(primary, 0.25);

  // Gradient adjustments for very bright colors
  const gradientStart = rgba(darken(0.05, primary), 0.2);
  const gradientEnd = rgba(darken(0.05, primary), 0.6);

  return {
    primary,
    textOnPrimary,
    dark,
    darker,
    light,
    lighter,
    translucent,
    translucentStrong,
    gradientStart,
    gradientEnd,
  };
}
