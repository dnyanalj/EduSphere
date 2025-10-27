import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/examiner" element={<ExaminerDashboard/>}/>
        <Route path="/candidate" element={<CandidateDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
