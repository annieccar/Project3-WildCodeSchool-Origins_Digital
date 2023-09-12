import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";

import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";
import { BlurredBackgroundContextProvider } from "./contexts/BlurredBackgroundContext";

function App() {
  return (
    <div className="h-screen bg-dark text-white font-primary">
      <CurrentUserContextProvider>
        <Navbar />
        <BlurredBackgroundContextProvider>
          <Router />
        </BlurredBackgroundContextProvider>
        <Footbar />
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
