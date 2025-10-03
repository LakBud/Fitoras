import { useState } from "react";
import { motion } from "framer-motion";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useSplitFilterStore } from "../../stores/splits/useSplitFilterStore";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type UniqueIdentifier,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SplitItem from "./SplitItem";
import { FiInfo } from "react-icons/fi";

const SplitList = () => {
  const splits = useSplitsStore((state) => state.splits);
  const setSplits = useSplitsStore((state) => state.setSplits);

  const { name: filterName, categoryId: filterCategoryId } = useSplitFilterStore();

  const filteredSplits = splits.filter((s) => {
    const matchesName = s.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesCategory = filterCategoryId ? s.category?.id === filterCategoryId : true;
    return matchesName && matchesCategory;
  });

  // --- DnD setup
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSplits(
        arrayMove(
          splits,
          splits.findIndex((s) => s.id === active.id),
          splits.findIndex((s) => s.id === over.id)
        )
      );
    }
    setActiveId(null);
  };

  const activeSplit = filteredSplits.find((s) => s.id === activeId);

  // --- No splits created
  if (splits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4 rounded-2xl border border-dashed border-rose-200 bg-rose-50/50 shadow-inner">
        <FiInfo className="w-8 h-8 text-rose-400 mb-3" />
        <p className="text-base sm:text-lg text-gray-500 font-medium">No split has been created.</p>
        <p className="text-sm text-gray-400 mt-1">Click the "+" icon to get started.</p>
      </div>
    );
  }

  // --- Empty state after filtering
  if (filteredSplits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4 rounded-2xl border border-dashed border-rose-200 bg-rose-50/50 shadow-inner">
        <FiInfo className="w-8 h-8 text-rose-400 mb-3" />
        <p className="text-base sm:text-lg text-gray-500 font-medium">No splits match your filters.</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your search or category.</p>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={filteredSplits.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div
          className="
            mx-auto w-full max-w-2xl
            flex flex-col gap-2 sm:gap-4
            px-2 sm:px-0
          "
        >
          {filteredSplits.map((split, index) => (
            <SplitItem
              key={split.id}
              id={split.id}
              name={split.name}
              description={split.description}
              index={index}
              category={split.category}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 0.25, easing: "ease-in-out" }}>
        {activeSplit && (
          <motion.div
            className="
        rounded-2xl p-3 sm:p-5 shadow-xl pointer-events-none border border-rose-100
        max-w-[90vw] sm:max-w-[500px] overflow-hidden
      "
            style={{ backgroundColor: activeSplit.category?.color || "white" }}
            initial={{ scale: 0.98, opacity: 0.85 }}
            animate={{ scale: 1.03, opacity: 1 }}
          >
            <div className="flex items-center justify-between gap-2 w-full min-w-0">
              <h2
                className={`
            text-sm sm:text-lg font-semibold
            truncate whitespace-nowrap overflow-hidden
            max-w-[65vw] sm:max-w-[300px]
          `}
                title={activeSplit.name}
              >
                {activeSplit.name}
              </h2>

              {activeSplit.category && (
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm whitespace-nowrap flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }}
                >
                  {activeSplit.category.name}
                </span>
              )}
            </div>

            <p
              className="mt-1 text-xs sm:text-sm leading-snug"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {activeSplit.description || "No description"}
            </p>
          </motion.div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default SplitList;
