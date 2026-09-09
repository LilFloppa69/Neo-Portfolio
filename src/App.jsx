import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Identity from "./Identity";
import Portfolio from "./Portfolio";
import Certificate from "./Certificate";
import Contact from "./Contact";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/identity" element={<Identity />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
