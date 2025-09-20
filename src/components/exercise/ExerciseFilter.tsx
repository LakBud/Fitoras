import { useEffect, useState, useRef } from "react";
import type { Exercises } from "../../types/exercise";
import { FiSearch, FiZap, FiSettings, FiBox, FiLayers, FiTarget, FiShuffle, FiRefreshCw } from "react-icons/fi";

interface FilterProps {
  exercises: Exercises[];
  setFilteredExercises: React.Dispatch<React.SetStateAction<Exercises[]>>;
}

const STORAGE_KEY = "exerciseFilters";

const ExerciseFilter = ({ exercises, setFilteredExercises }: FilterProps) => {
  // ----------------------
  // Load filters from localStorage
  // ----------------------
  const getStoredFilters = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const stored = getStoredFilters();

  const [name, setName] = useState(stored.name || "");
  const [force, setForce] = useState(stored.force || "");
  const [mechanic, setMechanic] = useState(stored.mechanic || "");
  const [equipment, setEquipment] = useState(stored.equipment || "");
  const [category, setCategory] = useState(stored.category || "");
  const [primaryMuscle, setPrimaryMuscle] = useState(stored.primaryMuscle || "");
  const [secondaryMuscle, setSecondaryMuscle] = useState(stored.secondaryMuscle || "");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ----------------------
  // Persist filters in localStorage
  // ----------------------
  useEffect(() => {
    const filters = { name, force, mechanic, equipment, category, primaryMuscle, secondaryMuscle };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [name, force, mechanic, equipment, category, primaryMuscle, secondaryMuscle]);

  // ----------------------
  // Filtering logic (debounced)
  // ----------------------
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const normalize = (str: string) => str.toLowerCase().replace(/-/g, "").trim();
      const search = normalize(name);

      const filtered = exercises.filter((ex) => {
        const matchesSearch =
          !search ||
          [
            ex.name,
            ex.force,
            ex.level,
            ex.mechanic,
            ex.equipment,
            ex.instructions,
            ex.category,
            ex.id,
            ...(ex.primaryMuscles || []),
          ]
            .filter(Boolean)
            .some((field) => typeof field === "string" && normalize(field).includes(search));

        const matchesForce = !force || ex.force === force;
        const matchesMechanic = !mechanic || ex.mechanic === mechanic;
        const matchesEquipment = !equipment || ex.equipment === equipment;
        const matchesCategory = !category || ex.category === category;
        const matchesPrimary = !primaryMuscle || ex.primaryMuscles?.includes(primaryMuscle);
        const matchesSecondary = !secondaryMuscle || ex.secondaryMuscles?.includes(secondaryMuscle);

        return (
          matchesSearch &&
          matchesForce &&
          matchesMechanic &&
          matchesEquipment &&
          matchesCategory &&
          matchesPrimary &&
          matchesSecondary
        );
      });

      setFilteredExercises(filtered);
    }, 250);
  }, [name, force, mechanic, equipment, category, primaryMuscle, secondaryMuscle, exercises, setFilteredExercises]);

  // ----------------------
  // Reset all filters
  // ----------------------
  const handleReset = () => {
    setName("");
    setForce("");
    setMechanic("");
    setEquipment("");
    setCategory("");
    setPrimaryMuscle("");
    setSecondaryMuscle("");
    localStorage.removeItem(STORAGE_KEY);
  };

  const isString = (val: unknown): val is string => typeof val === "string";

  const filters: [string, string, React.Dispatch<React.SetStateAction<string>>, string[], React.ReactElement][] = [
    ["Force", force, setForce, exercises.map((e) => e.force).filter(isString), <FiZap />],
    ["Mechanic", mechanic, setMechanic, exercises.map((e) => e.mechanic).filter(isString), <FiSettings />],
    ["Equipment", equipment, setEquipment, exercises.map((e) => e.equipment).filter(isString), <FiBox />],
    ["Category", category, setCategory, exercises.map((e) => e.category).filter(isString), <FiLayers />],
    ["Primary", primaryMuscle, setPrimaryMuscle, exercises.flatMap((e) => e.primaryMuscles || []).filter(isString), <FiTarget />],
    [
      "Secondary",
      secondaryMuscle,
      setSecondaryMuscle,
      exercises.flatMap((e) => e.secondaryMuscles || []).filter(isString),
      <FiShuffle />,
    ],
  ];

  return (
    <div className="z-50 fixed w-full top-0 md:top-auto bg-white/90 backdrop-blur-sm px-4 py-4 shadow-md border-t border-red-300 md:border-b md:border-t-0 rounded-b-2xl">
      {/* Desktop layout (md and above) */}
      <div className="hidden md:flex flex-row items-center gap-4">
        {/* Search */}
        <div className="relative w-full md:w-64 flex-1">
          <input
            type="text"
            placeholder="Search exercises..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-red-300 rounded-full bg-red-50/70 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 shadow-sm placeholder-gray-500 text-sm transition-all duration-200"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-lg" />
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto gap-3 py-1 flex-1">
          {filters.map(([label, value, setter, options, icon]) => (
            <div key={label} className="relative flex-shrink-0 w-36 md:w-40">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-lg">{icon}</div>
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border border-red-300 rounded-full bg-red-50/70 shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 text-sm transition-all duration-200"
              >
                <option value="">{label}</option>
                {[...new Set(options)].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="ml-auto bg-red-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm transition-all duration-200"
        >
          Reset
        </button>
      </div>

      {/* Mobile layout (below md) */}
      <div className="flex md:hidden overflow-x-auto gap-3 py-1 items-center">
        {/* Reset */}
        <button
          onClick={handleReset}
          title="Reset filters"
          className="p-3 rounded-full bg-red-600 shadow-sm flex items-center justify-center text-white transition-all duration-200 hover:bg-red-700"
        >
          <FiRefreshCw />
        </button>
        {filters.map(([label, value, setter, options, icon]) => (
          <div key={label} className="relative flex-shrink-0">
            {/* Icon */}
            <div className="absolute text-red-500 text-lg pointer-events-none">{icon}</div>

            {/* Select */}
            <select
              title={label}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="pl-8 pr-8 py-3.5 rounded-full bg-red-50 shadow-sm flex items-center justify-center text-red-600 transition-all duration-200 hover:bg-red-100 focus:bg-red-200:"
            >
              <option value="">{label}</option>
              {[...new Set(options)].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseFilter;
