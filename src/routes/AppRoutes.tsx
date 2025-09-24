import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import Exercise from "../pages/exercise/Exercise";
import ExerciseDetail from "../pages/exercise/ExerciseDetail";
import Calendar from "../pages/Calendar";
import Splits from "../pages/splits/Splits";
import SplitDetailPage from "../pages/splits/SplitDetailPage";

const AppRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/splits" element={<Splits />}></Route>
          <Route path="/splits/:id" element={<SplitDetailPage />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/exercise" element={<Exercise />}></Route>
          <Route path="/exercise/:id" element={<ExerciseDetail />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
