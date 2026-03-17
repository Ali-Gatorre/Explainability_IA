import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import EmployeeDetail from "./pages/EmployeeDetail";
import Ethics from "./pages/Ethics";
import Frugality from "./pages/Frugality";

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fb" }}>
        <Navbar />
        <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employee/:id" element={<EmployeeDetail />} />
            <Route path="/ethics" element={<Ethics />} />
            <Route path="/frugality" element={<Frugality />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
