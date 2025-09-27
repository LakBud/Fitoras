import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSplitsStore } from "../../stores/useSplitStore";
import type { Weekday, WorkoutDay } from "../../types/splits";

const allWeekdays: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const SplitForm = () => {
  const addSplit = useSplitsStore((state) => state.addSplit);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSplit = {
      id: uuidv4(),
      name,
      description: description || undefined,
      days: allWeekdays.map<WorkoutDay>((day) => ({ day, exercises: [] })), // map to WorkoutDay
    };

    addSplit(newSplit);

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray-200">
      <h2 className="text-xl font-bold">Create New Split</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g. Push/Pull/Legs"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Optional description..."
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        Create Split
      </button>
    </form>
  );
};

export default SplitForm;
