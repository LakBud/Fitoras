import { TabsTrigger } from "@/components/ui/tabs";
import { readableColor } from "polished";
import type { Category } from "@/stores/splitControl/useCurrentCategories";

interface Props {
  cat: Category | { id: null; name: string; color: string };
  isActive: boolean;
  fallbackColor: string;
}

export function CategoryTabTrigger({ cat, isActive, fallbackColor }: Props) {
  const catColor = cat.color ?? fallbackColor;
  const textColor = readableColor(catColor, "#000", "#fff");
  const value = cat.id ?? "none";

  return (
    <TabsTrigger
      value={value}
      className={`
        px-4 py-3            
        text-md
        font-semibold
        rounded-t-lg
        transition-all whitespace-nowrap
        ${isActive ? "bg-white shadow-sm border-t border-l border-r" : "text-gray-600 hover:text-gray-900"}
      `}
      style={{
        color: isActive ? textColor : undefined,
        backgroundColor: isActive ? catColor : undefined,
      }}
    >
      {cat.name}
    </TabsTrigger>
  );
}
