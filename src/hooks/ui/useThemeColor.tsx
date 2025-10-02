import { darken, lighten, readableColor, rgba } from "polished";
import { useState, useEffect } from "react";

const THEME_COLOR_STORAGE_KEY = "fitora_theme_color";

/**
 * Returns a theme object based on a base color.
 * If baseColor is undefined, you can optionally pass a fallbackColor.
 * If useLocalStorage is true, it will persist and retrieve the color from localStorage.
 */
export function useThemeColor(baseColor?: string, fallbackColor?: string, useLocalStorage = false) {
  const [persistedColor, setPersistedColor] = useState<string | null>(() => {
    if (useLocalStorage) {
      return localStorage.getItem(THEME_COLOR_STORAGE_KEY);
    }
    return null;
  });

  // Use persisted color if available and useLocalStorage is true, otherwise use baseColor, fallbackColor, or default
  const primary = (useLocalStorage && persistedColor) ? persistedColor : (baseColor || fallbackColor || "#be123c");

  // Persist color to localStorage when baseColor changes and useLocalStorage is true
  useEffect(() => {
    if (useLocalStorage && baseColor) {
      localStorage.setItem(THEME_COLOR_STORAGE_KEY, baseColor);
      setPersistedColor(baseColor);
    }
  }, [baseColor, useLocalStorage]);

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
