import SplitList from "../../components/split/SplitList";

const SplitDetail = () => {
  return (
    <div>
      <div>
        <h1 className="text-5xl font-extrabold text-red-500 tracking-wide text-center m-4 p-2">Split</h1>
      </div>

      <div>
        <SplitList />
      </div>
    </div>
  );
};

export default SplitDetail;
