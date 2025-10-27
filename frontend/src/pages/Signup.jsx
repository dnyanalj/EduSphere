import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ExaminerDashboard from './pages/ExaminerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/examiner" element={<ExaminerDashboard/>}/>
        <Route path="/candidate" element={<CandidateDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}
