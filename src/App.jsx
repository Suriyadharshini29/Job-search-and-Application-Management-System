import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";
import Auth from "./auth";
import MyApplications from "./pages/MyApplications"; // create this page

function App() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  // Load user from localStorage if already logged in
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Fetch all jobs
  const fetchJobs = async () => {
    setCustomSearch(false);
    const tempJobs = [];
    const jobsRef = collection(db, "jobs");
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const req = await getDocs(q);

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };

  // Fetch jobs by search/filter
  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = [];
    const jobsRef = collection(db, "jobs");
    const q = query(
      jobsRef,
      where("type", "==", jobCriteria.type),
      where("title", "==", jobCriteria.title),
      where("experience", "==", jobCriteria.experience),
      where("location", "==", jobCriteria.location),
      orderBy("postedOn", "desc")
    );
    const req = await getDocs(q);

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };

  // Fetch jobs automatically after login
  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);

  // If not logged in, show Auth page
  if (!user) {
    return <Auth setUser={setUser} />;
  }

  return (
    <Router>
      <>
        {/* Navbar */}
        <Navbar />

        {/* Logout button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              setUser(null);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Routes */}
        <Routes>
          {/* Home / Job Listing */}
          <Route
            path="/"
            element={
              <div className="p-6">
                <Header />
                <SearchBar fetchJobsCustom={fetchJobsCustom} />

                {customSearch && (
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={fetchJobs}
                      className="bg-blue-500 px-6 py-2 rounded-md text-white"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {jobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            }
          />

          {/* My Applications */}
          <Route path="/my-applications" element={<MyApplications />} />
        </Routes>
      </>
    </Router>
  );
}


export default App;
