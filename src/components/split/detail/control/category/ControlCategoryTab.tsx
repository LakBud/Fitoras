import { useCategoryControl } from "../../../../../hooks/control/useCategoryControl";
import { useSplitControl } from "../../../../../hooks/control/useSplitControl";
import { readableColor } from "polished";

const ControlCategoryTab = () => {
  const { selectedCategoryId, setSelectedCategoryId } = useSplitControl();
  const { categories } = useCategoryControl();

  return (
    <div className="flex-1 flex flex-col gap-4">
      <button
        onClick={() => setSelectedCategoryId?.(null)}
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
      >
        None
      </button>

      {(categories ?? []).map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategoryId?.(cat.id)}
          className={`px-4 py-2 rounded transition`}
          style={{
            backgroundColor: cat.color ?? "#ccc",
            color: readableColor(cat.color ?? "#ccc"),
            border: cat.id === selectedCategoryId ? "2px solid black" : "none",
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default ControlCategoryTab;
