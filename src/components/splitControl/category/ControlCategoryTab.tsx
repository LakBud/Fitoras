import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCategoryControl } from "@/hooks/splitControl/useCategoryControl";
import { useSplitControl } from "@/hooks/splitControl/useSplitControl";
import { readableColor } from "polished";
import ControlAddCategory from "./manage/ControlManageExerciseCategory";

const ControlCategoryTab = () => {
  const { selectedCategoryId, setSelectedCategoryId, split } = useSplitControl();
  const { categories } = useCategoryControl();
  const themeColor = split?.category?.color ?? "#6B7280";

  const allCategories = [{ id: null, name: "None", color: themeColor }, ...(categories ?? [])];

  return (
    <Tabs value={selectedCategoryId ?? "none"} onValueChange={(val) => setSelectedCategoryId?.(val === "none" ? null : val)}>
      <TabsList className="border-b border-gray-200 flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {allCategories.map((cat) => {
          const catId = cat.id ?? "none";
          const isActive = selectedCategoryId === cat.id;
          const catColor = cat.color ?? themeColor;
          const textColor = readableColor(catColor, "#000", "#fff");

          return (
            <TabsTrigger
              key={catId}
              value={catId}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap
                ${isActive ? "bg-white shadow-sm border-t border-l border-r" : "text-gray-600 hover:text-gray-900"}`}
              style={{
                color: isActive ? textColor : undefined,
                backgroundColor: isActive ? catColor : undefined,
              }}
            >
              {cat.name}
            </TabsTrigger>
          );
        })}

        {/* Inline Add Button */}
        <ControlAddCategory />
      </TabsList>
    </Tabs>
  );
};

export default ControlCategoryTab;
