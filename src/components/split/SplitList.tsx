import { Link } from "react-router-dom";
import { useSplitsStore } from "../../stores/useSplitStore";

const SplitList = () => {
  const splits = useSplitsStore((state) => state.splits);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {splits.map((split) => (
        <Link
          key={split.id}
          to={`/splits/${split.id}`}
          className="block rounded-2xl shadow-md border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-bold mb-2">{split.name}</h2>
          {split.description && <p className="text-gray-600 mb-2">{split.description}</p>}
        </Link>
      ))}
    </div>
  );
};

export default SplitList;
