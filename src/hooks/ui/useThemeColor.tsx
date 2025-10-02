import { darken, lighten, readableColor, rgba } from "polished";
import { useCurrentCategories, type UseCurrentCategoriesType, type Category } from "../../stores/splits/useCurrentCategories";

// Optional enhancement: if no baseColor is provided, attempt to derive it from
// the last selected category stored in localStorage and the persisted
// categories store. You can also pass a categoryId explicitly as the second
// argument to target a specific category.
export function useThemeColor(baseColor?: string, categoryId?: string) {
  const categories = useCurrentCategories((state: UseCurrentCategoriesType) => state.categories);

  // 1) Explicit color always wins
  let primary: string | undefined = baseColor;

  // 2) If a categoryId is provided, try to find its color from the store
  if (!primary && categoryId) {
    const found = categories.find((c: Category) => c.id === categoryId);
    if (found?.color) primary = found.color;
  }

  // 3) Fallback to last selected category id from localStorage
  if (!primary && typeof window !== "undefined") {
    try {
      const LAST_CATEGORY_KEY = "fitoras_last_selected_category";
      const lastCategoryId = localStorage.getItem(LAST_CATEGORY_KEY);
      if (lastCategoryId) {
        const fromStore = categories.find((c: Category) => c.id === lastCategoryId)?.color;
        if (fromStore) primary = fromStore;

        if (!primary) {
          // As a final fallback, read persisted categories directly (shape from zustand persist)
          const RAW_CATEGORIES_KEY = "fitoras_categories";
          const raw = localStorage.getItem(RAW_CATEGORIES_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as { state?: { categories?: Category[] } } | undefined;
            const persistedCategories = parsed?.state?.categories;
            const fromPersist = persistedCategories?.find((c: Category) => c.id === lastCategoryId)?.color;
            if (fromPersist) primary = fromPersist;
          }
        }
      }
    } catch {
      // ignore parsing/localStorage errors and continue to default
    }
  }

  if (!primary) primary = "#be123c";

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
