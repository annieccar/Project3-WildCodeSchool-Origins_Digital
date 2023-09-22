import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";

import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";
import { BlurredBackgroundContextProvider } from "./contexts/BlurredBackgroundContext";
import { LoginContextProvider } from "./contexts/LoginContext";

function App() {
  return (
    <div className="h-screen bg-dark text-white font-primary">
      <CurrentUserContextProvider>
        <LoginContextProvider>
          <Navbar />
          <BlurredBackgroundContextProvider>
            <Router />
          </BlurredBackgroundContextProvider>
          <Footbar />
        </LoginContextProvider>
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
