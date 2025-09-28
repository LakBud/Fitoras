import { useState } from "react";
import { motion } from "framer-motion";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
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

  // Mobile-friendly sensor with activation constraint
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

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

  if (!splits.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 rounded-3xl border-2 border-dashed border-rose-300 bg-gradient-to-b from-white to-rose-50 shadow-inner">
        <p className="text-lg text-gray-500">No splits have been created yet. Click the "+" icon to create</p>
      </div>
    );
  }

  const activeSplit = splits.find((s) => s.id === activeId);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={splits.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4 max-w-2xl mx-auto w-full">
          {splits.map((split, index) => (
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
            style={{
              backgroundColor: activeSplit.category?.color || "white",
            }}
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
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    color: "#fff",
                  }}
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
              {activeSplit.description || "No description"}
            </p>
          </motion.div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default SplitList;
