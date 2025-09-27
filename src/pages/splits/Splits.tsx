import SplitList from "../../components/split/SplitList";
import SplitForm from "../../components/split/SplitForm";

const SplitsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <SplitForm />
      <SplitList />
    </div>
  );
};

export default SplitsPage;
