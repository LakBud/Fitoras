import NavBar from "./components/common/navBar/NavBar";
import AppRoutes from "./routes/router";
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
