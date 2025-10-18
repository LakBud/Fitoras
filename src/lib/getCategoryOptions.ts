import type { Category } from "@/stores/splitControl/useCurrentCategories";

export function getCategoryOptions(categories: Category[] = [], fallback: string) {
  return [{ id: null, name: "None", color: fallback }, ...categories];
}
