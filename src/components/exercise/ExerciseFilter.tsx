import { useEffect, useState, useRef } from "react";
import type { Exercises } from "../../types/exercise";
import { FiSearch, FiZap, FiSettings, FiBox, FiLayers, FiTarget, FiShuffle } from "react-icons/fi";

interface FilterProps {
  exercises: Exercises[];
  setFilteredExercises: React.Dispatch<React.SetStateAction<Exercises[]>>;
}

const ExerciseFilter = ({ exercises, setFilteredExercises }: FilterProps) => {
  const [name, setName] = useState("");
  const [force, setForce] = useState<string>("");
  const [mechanic, setMechanic] = useState<string>("");
  const [equipment, setEquipment] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [primaryMuscle, setPrimaryMuscle] = useState<string>("");
  const [secondaryMuscle, setSecondaryMuscle] = useState<string>("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleReset = () => {
    setName("");
    setForce("");
    setMechanic("");
    setEquipment("");
    setCategory("");
    setPrimaryMuscle("");
    setSecondaryMuscle("");
  };

  // Filtering logic with debounce
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
            ...(ex.secondaryMuscles || []),
          ]
            .filter(Boolean)
            .some((field) => typeof field === "string" && normalize(field).includes(search));

        const matchesForce = !force || ex.force === force;
        const matchesMechanic = !mechanic || ex.mechanic === mechanic;
        const matchesEquipment = !equipment || ex.equipment === equipment;
        const matchesCategory = !category || ex.category === category;
        const matchesPrimaryMuscle = !primaryMuscle || ex.primaryMuscles?.includes(primaryMuscle);
        const matchesSecondaryMuscle = !secondaryMuscle || ex.secondaryMuscles?.includes(secondaryMuscle);

        return (
          matchesSearch &&
          matchesForce &&
          matchesMechanic &&
          matchesEquipment &&
          matchesCategory &&
          matchesPrimaryMuscle &&
          matchesSecondaryMuscle
        );
      });

      setFilteredExercises(filtered);
    }, 250);
  }, [name, force, mechanic, equipment, category, primaryMuscle, secondaryMuscle, exercises, setFilteredExercises]);

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

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className={`z-50 mb-6 bg-white/90 backdrop-blur-xl px-4 py-3 shadow-md border-b border-red-300 rounded-b-2xl`}
      style={{ top: !isMobile ? "62px" : undefined }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
        {/* Search Input */}
        <div className="relative flex-1 md:flex-none w-full md:w-48">
          <input
            type="text"
            placeholder="Search..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-9 pr-3 py-2 w-full border border-red-300 rounded-full bg-red-50/70 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 shadow-sm placeholder-gray-500 transition-all duration-200 text-sm"
          />
          <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-red-500" />
        </div>

        {/* Filter Selects */}
        <div className="flex overflow-x-auto gap-2 md:gap-3 py-1">
          {filters.map(([label, value, setter, options, icon]) => (
            <div key={label} className="relative flex-shrink-0 w-[130px] md:w-[150px]">
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-red-500">{icon}</div>
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="pl-7 pr-2 py-1 w-full border border-red-300 rounded-full bg-red-50/70 shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 text-sm transition-all duration-200"
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

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="ml-auto bg-red-600 text-white font-semibold px-4 py-1 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm transition-all duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ExerciseFilter;
