import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import LawBot from "./pages/LawBot";
import Rights from "./pages/Rights";
import StateLaws from "./pages/StateLaws";

// NEW IMPORTS
import Weather from "./pages/Weather";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lawbot" element={<LawBot />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/state-laws" element={<StateLaws />} />

        {/* NEW ROUTES */}
        <Route path="/weather" element={<Weather />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
