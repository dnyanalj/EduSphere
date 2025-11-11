import React, { useEffect, useState } from "react";
import { getAllTests } from "../api/examinerApi";
import { useNavigate } from "react-router-dom";
import TestCard from "../components/TestCard";
// import { ScrollArea } from "@/components/ui/scroll-area";


function ExaminerDashboard() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        //
        const res = await getAllTests();
        console.log(res.data.tests);
        setTests(res.data.tests || []);
      } catch (err) {
        console.error("Error fetching tests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Examiner Dashboard</h2>

        <button
          onClick={() => navigate("/create-test")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create New Test
        </button>
      </div>
      {/* <ScrollArea className="h-[70vh] w-full rounded-md border p-4"> */}
        <div className="space-y-4">
          {tests.length === 0 ? (
            <p>No tests created yet.</p>
          ) : (
            <div>
              {tests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          )}
        </div>
      {/* </ScrollArea> */}
    </div>
  );
}

export default ExaminerDashboard;
