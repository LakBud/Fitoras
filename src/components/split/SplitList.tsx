import React, { useState, useEffect } from "react";
import { type Split, createEmptySplit } from "../../types/splits";
import { v4 as uuidv4 } from "uuid"; // npm install uuid
import { Link } from "react-router-dom";

const SplitList: React.FC = () => {
  const [splits, setSplits] = useState<Split[]>([]);

  useEffect(() => {
    const storedSplits = localStorage.getItem("splits");
    if (storedSplits) setSplits(JSON.parse(storedSplits));
  }, []);

  useEffect(() => {
    localStorage.setItem("splits", JSON.stringify(splits));
  }, [splits]);

  const handleAddSplit = () => {
    const name = prompt("Enter a name for your new split:");
    if (!name) return;

    const newSplit = createEmptySplit(uuidv4(), name);
    setSplits([newSplit, ...splits]);
  };

  const handleDelete = (id: string) => {
    const updatedSplits = splits.filter((split) => split.id !== id);
    setSplits(updatedSplits);
  };

  return (
    <div>
      {/* Add Button */}
      <div className="flex justify-end m-4">
        <button onClick={handleAddSplit} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          + Add Split
        </button>
      </div>

      {/* Split List */}
      <div className="border-2 m-4 p-2 h-[800px] overflow-y-auto">
        {splits.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No splits found. Create one!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {splits.map((split) => (
              <Link key={split.id} to={`/splits/${split.id}`}>
                <div className="border rounded p-3 cursor-pointer hover:shadow-md flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg">{split.name}</h2>
                    <p>{split.days.length} day(s) in this split</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent Link click
                      handleDelete(split.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitList;
