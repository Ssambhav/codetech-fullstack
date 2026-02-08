import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LawBot from "./pages/LawBot";
import Rights from "./pages/Rights";
import StateLaws from "./pages/StateLaws";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lawbot" element={<LawBot />} />
            <Route path="/rights" element={<Rights />} />
            <Route path="/state-laws" element={<StateLaws />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
