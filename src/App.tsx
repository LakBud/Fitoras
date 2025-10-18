import NavBar from "./components/common/navBar/NavBar";
import AppRoutes from "./routes/AppRoutes";
import { useInitializeStores } from "./hooks/useInitializeStores";
function App() {
  useInitializeStores();

  return (
    <>
      <div>
        <NavBar />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
