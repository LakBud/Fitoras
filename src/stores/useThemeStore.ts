import { create } from "zustand";
import { getFromDB, saveToDB } from "@/lib/indexedDB";
import { darken, lighten, readableColor, rgba } from "polished";

interface ThemeColors {
  primary: string;
  textOnPrimary: string;
  dark: string;
  darker: string;
  light: string;
  lighter: string;
  translucent: string;
  translucentStrong: string;
  gradientStart: string;
  gradientEnd: string;
}

interface ThemeState {
  currentColor: string | null;
  initialized: boolean;
  loadTheme: () => Promise<void>;
  setThemeColor: (color: string) => void;
  getThemeColors: (baseColor?: string, fallbackColor?: string) => ThemeColors;
}

const STORE_NAME = "theme";
const KEY = "theme_color";

const generateThemeColors = (primary: string): ThemeColors => {
  const textOnPrimary = readableColor(primary, "#000000", "#ffffff", false);
  const dark = darken(0.1, primary);
  const darker = darken(0.2, primary);
  const light = lighten(0.15, primary);
  const lighter = lighten(0.4, primary);
  const translucent = rgba(primary, 0.1);
  const translucentStrong = rgba(primary, 0.25);

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
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  currentColor: null,
  initialized: false,

  loadTheme: async () => {
    if (get().initialized) return;

    const data = await getFromDB<string>(STORE_NAME, KEY);
    set({ currentColor: data || null, initialized: true });
  },

  setThemeColor: (color: string) => {
    set({ currentColor: color });
    saveToDB(STORE_NAME, KEY, color);
  },

  getThemeColors: (baseColor?: string, fallbackColor?: string) => {
    const state = get();

    // If a baseColor is provided (e.g. split has category) → use it AND write it globally
    if (baseColor !== undefined && baseColor !== state.currentColor && state.initialized) {
      get().setThemeColor(baseColor);
    }

    // Compute primary WITHOUT ever falling back to state.currentColor
    // This prevents exercise category edits from leaking
    const primary = baseColor ?? fallbackColor ?? "#6B7280"; // <- fixed safe grey fallback instead of global state

    return generateThemeColors(primary);
  },
}));
