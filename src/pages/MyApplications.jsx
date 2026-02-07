import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const currentUserRaw = localStorage.getItem("user"); // ✅ match Auth storage
        if (!currentUserRaw) {
          setApplications([]);
          setLoading(false);
          return;
        }

        const currentUser = JSON.parse(currentUserRaw);
        if (!currentUser?.email) {
          setApplications([]);
          setLoading(false);
          return;
        }

        const email = currentUser.email.trim().toLowerCase(); // ✅ normalize

        const appsRef = collection(db, "applications");
        const q = query(
          appsRef,
          where("userId", "==", email),
          orderBy("appliedOn", "desc") // ⚠️ Firestore composite index required
        );

        const snapshot = await getDocs(q);
        const tempApps = [];
        snapshot.forEach(doc => {
          tempApps.push({ id: doc.id, ...doc.data() });
        });

        setApplications(tempApps);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="p-4 text-white">Loading applications...</p>;

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4 text-white">My Applications</h2>

      {applications.length === 0 ? (
        <p>You haven’t applied to any jobs yet.</p>
      ) : (
        applications.map(app => (
          <div key={app.id} className="p-4 border rounded mb-2 border-white">
            <p><strong>Job ID:</strong> {app.jobId}</p>
            <p><strong>Status:</strong> {app.status}</p>
            <p>
              <strong>Applied On:</strong>{" "}
              {app.appliedOn?.toDate ? app.appliedOn.toDate().toDateString() : "N/A"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;
