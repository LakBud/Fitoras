import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import SplitDetail from "../pages/splits/SplitDetail";
import Exercise from "../pages/exercise/Exercise";
import WorkoutDay from "../pages/day/WorkoutDay";
import ExerciseDetail from "../pages/exercise/ExerciseDetail";

const AppRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/splits" element={<SplitDetail />}></Route>
          <Route path="/current" element={<WorkoutDay />}></Route>
          <Route path="/exercise" element={<Exercise />}></Route>
          <Route path="/exercise/:id" element={<ExerciseDetail />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
