import { useParams } from "react-router-dom";

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Now you can use `id` to fetch the exercise or filter it from your state
  // Example:
  // const exercise = exercises.find(e => e.id === id);

  return (
    <div>
      <h1>Exercise Detail</h1>
      <p>Exercise ID: {id}</p>
      {/* Render more details here */}
    </div>
  );
};

export default ExerciseDetail;
