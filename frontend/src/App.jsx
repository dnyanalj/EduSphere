import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExaminerDashboard from "./pages/ExaminerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import CreateTest from "./pages/CreateTest";
import ExamPage from "./pages/ExamPage";
import ShowResult from "./pages/ShowResult";
import ShowResultsExaminer from "./pages/showResultsExaminer";
import ProfilePage from "./pages/ProfilePage";
import CandidateAnalytics from "./pages/CandidateAnalytics";
//
import { Button } from "@/components/ui/button";
function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<Signup />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/signup/" element={<Signup />} />
          <Route path="/examiner/dashboard" element={<ExaminerDashboard />} />
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/create-test" element={<CreateTest />} />
          <Route path="/exam/:attemptId" element={<ExamPage />} />
          {/* for candidate */}
          <Route path="/result/:attemptId" element={<ShowResult />} />
          {/* for examiner */}
          <Route
            path="/examiner/test/:testId/results"
            element={<ShowResultsExaminer />}
          />
          <Route path="candidate/profile" element={<ProfilePage />} />
          <Route path="candidate/analytics" element={<CandidateAnalytics />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
