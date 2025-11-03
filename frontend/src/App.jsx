import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExaminerDashboard from "./pages/ExaminerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import CreateTest from "./pages/CreateTest";
import ExamPage from "./pages/ExamPage";
import ShowResult from "./pages/ShowResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/examiner/dashboard" element={<ExaminerDashboard />} />
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/exam/:attemptId" element={<ExamPage />} />
        <Route path="/result/:attemptId" element={<ShowResult />} />
      </Routes>
    </Router>
  );
}

export default App;
