import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";

import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";

function App() {
  return (
    <div className="h-screen bg-dark text-white font-primary">
      <CurrentUserContextProvider>
        <Navbar />

        <Router />

        <Footbar />
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
