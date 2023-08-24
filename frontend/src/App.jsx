import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Footbar from "./components/Footbar";

function App() {
  return (
    <div className="App h-screen w-screen bg-dark text-white">
      <Navbar />
      <Router />
      <Footbar />
      <Footer />
    </div>
  );
}

export default App;
