import type { Category } from "@/stores/split/useCurrentCategories";

export function getCategoryOptions(categories: Category[] = [], fallback: string) {
  return [{ id: null, name: "None", color: fallback }, ...categories];
}
