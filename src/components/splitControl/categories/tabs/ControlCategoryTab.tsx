import { Tabs, TabsList } from "@/components/ui/tabs";
import { useCategoryControl } from "@/hooks/splitControl/useCategoryControl";
import { useSplitControl } from "@/hooks/splitControl/useSplitControl";
import { getCategoryOptions } from "@/lib/getCategoryOptions";
import { CategoryTabTrigger } from "./CategoryTabTrigger";

const ControlCategoryTab = () => {
  const { selectedCategoryId, setSelectedCategoryId, split } = useSplitControl();
  const { categories } = useCategoryControl();
  const themeColor = split?.category?.color ?? "#6B7280";

  const allCategories = getCategoryOptions(categories, themeColor);

  return (
    <Tabs value={selectedCategoryId ?? "none"} onValueChange={(val) => setSelectedCategoryId?.(val === "none" ? null : val)}>
      <TabsList className="border-b border-gray-200 flex gap-1 overflow-x-auto pb-1 py-2 scrollbar-hide">
        {allCategories.map((cat) => (
          <CategoryTabTrigger
            key={cat.id ?? "none"}
            cat={cat}
            isActive={selectedCategoryId === cat.id}
            fallbackColor={themeColor}
          />
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ControlCategoryTab;
