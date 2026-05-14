import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/calculator"
            element={<CalculatorPage />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;