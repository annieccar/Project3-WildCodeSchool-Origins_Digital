import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import Footbar from "./components/Footbar";

import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";
import { BlurredBackgroundContextProvider } from "./contexts/BlurredBackgroundContext";
import { LoginContextProvider } from "./contexts/LoginContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <CurrentUserContextProvider>
      <LoginContextProvider>
        <ThemeContextProvider>
          <div className="min-h-screen h-full bg-almostWhite dark:bg-dark text-lightBlue dark:text-white font-primary">
            <Navbar />
            <BlurredBackgroundContextProvider>
              <Router />
            </BlurredBackgroundContextProvider>
            <Footbar />
          </div>
        </ThemeContextProvider>
      </LoginContextProvider>
    </CurrentUserContextProvider>
  );
}

export default App;
