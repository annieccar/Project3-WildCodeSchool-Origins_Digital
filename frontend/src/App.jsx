import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Footbar from "./components/Footbar";
import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";

function App() {
  return (
    <div className="h-screen bg-dark text-white">
      <Navbar />
      <CurrentUserContextProvider>
        <Router />
      </CurrentUserContextProvider>
      <Footbar />
      <Footer />
    </div>
  );
}

export default App;
