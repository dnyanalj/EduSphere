import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExaminerDashboard from "./pages/ExaminerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/examiner/dashboard" element={<ExaminerDashboard />} />
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
