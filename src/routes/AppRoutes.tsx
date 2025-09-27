import { Route, Routes } from "react-router-dom";
import Exercise from "../pages/exercise/Exercise";
import ExerciseDetail from "../pages/exercise/ExerciseDetail";
import Calendar from "../pages/Calendar";
import Splits from "../pages/splits/Splits";
import SplitDetail from "../pages/splits/SplitDetail";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/splits" element={<Splits />}></Route>
          <Route path="/splits/:id" element={<SplitDetail />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/exercise" element={<Exercise />}></Route>
          <Route path="/exercise/:id" element={<ExerciseDetail />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
