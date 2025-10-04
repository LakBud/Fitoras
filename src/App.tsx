import NavBar from "./components/common/NavBar";
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
