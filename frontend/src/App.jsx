import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExaminerDashboard from "./pages/ExaminerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import CreateTest from "./pages/CreateTest";
import ExamPage from "./pages/ExamPage";
import ShowResult from "./pages/ShowResult";
import ShowResultsExaminer from "./pages/ShowResultsExaminer";
import ProfilePage from "./pages/ProfilePage";
import CandidateAnalytics from "./pages/CandidateAnalytics";
import { Button } from "@/components/ui/button";
import PracticePage from "./pages/CandidatePracticePage";
import ExaminerAnalytics from "./pages/ExaminerAnalytics";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/login/" element={<Login />} />
          <Route path="/signup/" element={<Signup />} />
          
          {/* sidebar things */}
            {/* examiner */}
            <Route path="/examiner/dashboard" element={<ExaminerDashboard />} />
            <Route path="/examiner/analytics" element={<ExaminerAnalytics/>} />
            {/* candidate */}
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/analytics" element={<CandidateAnalytics />} />
            <Route path="/candidate/practice" element={<PracticePage />} />

          {/* examiner  */}
          <Route
            path="/examiner/test/:testId/results"
            element={<ShowResultsExaminer />}
          />
          <Route path="/examiner/create-test" element={<CreateTest />} />

          {/* candidate */}
          <Route path="/exam/:attemptId" element={<ExamPage />} />
          <Route path="/result/:attemptId" element={<ShowResult />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
