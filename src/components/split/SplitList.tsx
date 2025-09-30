import { useState } from "react";
import { motion } from "framer-motion";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useSplitFilterStore } from "../../stores/splits/SplitFilterStore";
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

const SplitList = () => {
  const splits = useSplitsStore((state) => state.splits);
  const setSplits = useSplitsStore((state) => state.setSplits);

  // Grab filters from store
  const { name: filterName, categoryId: filterCategoryId } = useSplitFilterStore();

  // Apply filtering
  const filteredSplits = splits.filter((s) => {
    const matchesName = s.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesCategory = filterCategoryId ? s.category?.id === filterCategoryId : true;
    return matchesName && matchesCategory;
  });

  // DnD sensors
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

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

  if (!filteredSplits.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 rounded-3xl border-2 border-dashed border-rose-300 bg-gradient-to-b from-white to-rose-50 shadow-inner">
        <p className="text-lg text-gray-500">No splits match your filters.</p>
      </div>
    );
  }

  const activeSplit = filteredSplits.find((s) => s.id === activeId);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={filteredSplits.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4 max-w-2xl mx-auto w-full">
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

      <DragOverlay dropAnimation={{ duration: 0.2, easing: "ease" }}>
        {activeSplit && (
          <motion.div
            className="rounded-3xl p-4 sm:p-5 flex flex-col shadow-lg pointer-events-none border border-rose-50"
            style={{ backgroundColor: activeSplit.category?.color || "white" }}
            initial={{ scale: 1, opacity: 0.9 }}
            animate={{ scale: 1.05, opacity: 1 }}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className={`text-lg font-semibold truncate ${activeSplit.category ? "text-white" : "text-rose-600"}`}>
                {activeSplit.name}
              </h2>
              {activeSplit.category && (
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.3)", color: "#fff" }}
                >
                  {activeSplit.category.name}
                </span>
              )}
            </div>
            <p
              className={
                activeSplit.description
                  ? `text-sm leading-snug line-clamp-2 ${activeSplit.category ? "text-white/80" : "text-gray-600"}`
                  : `text-sm italic ${activeSplit.category ? "text-white/60" : "text-gray-400"}`
              }
            >
              {activeSplit.description}
            </p>
          </motion.div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default SplitList;
