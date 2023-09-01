import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";
import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";

function App() {
  return (
    <div className="h-screen w-screen bg-dark text-white font-primary">
      <Navbar />
      <CurrentUserContextProvider>
        <Router />
      </CurrentUserContextProvider>
      <Footbar />
    </div>
  );
}

export default App;
