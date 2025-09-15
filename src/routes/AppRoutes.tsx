import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import SplitDetail from "../pages/splits/SplitDetail";
import ExerciseDetail from "../pages/exercise/Exercise";
import WorkoutDay from "../pages/day/WorkoutDay";

const AppRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/splits" element={<SplitDetail />}></Route>
          <Route path="/day" element={<WorkoutDay />}></Route>
          <Route path="/exercise" element={<ExerciseDetail />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
