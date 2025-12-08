import React from 'react'
import Navbar from '@/components/layout/NavBar';
import Sidebar from '@/components/layout/SideBar';

const CandidatePracticePage = () => {
  return (
     <div className="w-full h-screen overflow-hidden bg-gray-50">
      <div className="flex w-full h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <Navbar  />

          <div className="flex-1 overflow-y-auto px-6 py-6">
            feature coming soon...
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default CandidatePracticePage
