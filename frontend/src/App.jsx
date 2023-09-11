import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Footbar from "./components/Footbar";
import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";
import { BlurredBackgroundContextProvider } from "./contexts/BlurredBackgroundContext";

function App() {
  return (
    <div className="h-screen bg-dark text-white">
      <Navbar />
      <CurrentUserContextProvider>
        <BlurredBackgroundContextProvider>
          <Router />
        </BlurredBackgroundContextProvider>
      </CurrentUserContextProvider>
      <Footbar />
      <Footer />
    </div>
  );
}

export default App;
