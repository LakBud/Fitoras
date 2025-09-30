import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SplitsPage from "../pages/splits/SplitsPage";
import SplitDetailPage from "../pages/splits/SplitDetailPage";
import CalendarPage from "../pages/CalendarPage";
import ExercisePage from "../pages/exercise/ExercisePage";
import ExerciseDetailPage from "../pages/exercise/ExerciseDetailPage";
import SplitEditorPage from "../pages/splits/SplitEditorPage";

const AppRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/splits" element={<SplitsPage />}></Route>
          <Route path="/splits/:id" element={<SplitDetailPage />}></Route>
          <Route path="/splits/:id/edit" element={<SplitEditorPage />}></Route>
          <Route path="/calendar" element={<CalendarPage />}></Route>
          <Route path="/exercise" element={<ExercisePage />}></Route>
          <Route path="/exercise/:id" element={<ExerciseDetailPage />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
